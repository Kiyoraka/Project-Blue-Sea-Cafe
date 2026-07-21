// engine.js — a tiny node-preserving reactive template engine.
//
// It reads the SAME directives the Claude Design source used, so the view
// templates can stay near-verbatim copies of the original markup:
//   {{ expr }}                    interpolation in text nodes and attributes
//   <sc-if value="{{ flag }}">    conditional block (transparent wrapper)
//   <sc-for list="{{ arr }}" as="x"> repeat block (transparent wrapper)
//   onClick / onChange="{{ fn }}" event bindings (click / change)
//   style-hover="css"             hover styles applied on mouseenter/leave
//   value / checked="{{ expr }}"  form-control bindings (focus-safe)
//
// Design choice: updates patch existing DOM in place (never innerHTML swap),
// so CSS keyframe animations don't replay and scroll/focus are preserved.
// onChange binds the native `change` event (commit on blur), which keeps text
// inputs glitch-free without a virtual DOM.

const MUSTACHE = /\{\{\s*([^}]+?)\s*\}\}/g;
// Stateless presence check — never use the /g regex's .test() (its lastIndex is
// stateful across calls and would misfire when the object is shared).
const hasMustache = (str) => str.indexOf('{{') !== -1;
const SVG_NS = 'http://www.w3.org/2000/svg';

// Resolve a dotted path ("g.title", "trackPhone", "goOrder") against the
// current scope chain first, then the top-level vals object.
function resolve(expr, scope, vals) {
  expr = expr.trim();
  const parts = expr.split('.');
  let cur;
  if (Object.prototype.hasOwnProperty.call(scope, parts[0])) cur = scope[parts[0]];
  else cur = vals[parts[0]];
  for (let i = 1; i < parts.length && cur != null; i++) cur = cur[parts[i]];
  return cur;
}

// Replace every {{ }} in a string with its resolved value.
function interp(str, scope, vals) {
  return str.replace(MUSTACHE, (_, e) => {
    const v = resolve(e, scope, vals);
    return v == null ? '' : String(v);
  });
}

const EVENT_ATTRS = { onclick: 'click', onchange: 'change', oninput: 'input' };

// Compile one DOM node into an instance: { nodes:[...], update(scope) }.
// `nodes` is the list of live DOM nodes to insert; update() refreshes bindings.
function compileNode(node, vals) {
  // Text node — bind interpolations if any.
  if (node.nodeType === Node.TEXT_NODE) {
    const raw = node.nodeValue;
    const t = document.createTextNode('');
    if (hasMustache(raw)) {
      return { nodes: [t], update: (s) => { t.nodeValue = interp(raw, s, vals); }, remove: () => t.remove() };
    }
    t.nodeValue = raw;
    return { nodes: [t], update: () => {}, remove: () => t.remove() };
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    const clone = node.cloneNode(true);
    return { nodes: [clone], update: () => {}, remove: () => clone.remove() };
  }

  const tag = node.tagName.toLowerCase();

  // <sc-if> — transparent conditional. Uses a comment anchor.
  if (tag === 'sc-if') {
    const anchor = document.createComment('sc-if');
    const cond = (node.getAttribute('value') || '').replace(MUSTACHE, '$1').trim();
    const childNodes = Array.from(node.childNodes);
    let mounted = false;
    let children = [];
    const unmount = () => {
      // Recursive: child.remove() tears down nested dynamic blocks too, so no
      // node inserted by an inner sc-if/sc-for is ever orphaned.
      children.forEach((c) => c.remove());
      children = [];
      mounted = false;
    };
    return {
      nodes: [anchor],
      update: (s) => {
        const on = !!resolve(cond, s, vals);
        if (on && !mounted) {
          children = childNodes.map((c) => compileNode(c, vals));
          const frag = document.createDocumentFragment();
          children.forEach((c) => c.nodes.forEach((n) => frag.appendChild(n)));
          anchor.parentNode.insertBefore(frag, anchor.nextSibling);
          mounted = true;
        } else if (!on && mounted) {
          unmount();
        }
        if (mounted) children.forEach((c) => c.update(s));
      },
      remove: () => { unmount(); anchor.remove(); },
    };
  }

  // <sc-for> — transparent repeat, reconciled by index (preserves nodes).
  if (tag === 'sc-for') {
    const anchor = document.createComment('sc-for');
    const listExpr = (node.getAttribute('list') || '').replace(MUSTACHE, '$1').trim();
    const asName = node.getAttribute('as') || 'item';
    const childNodes = Array.from(node.childNodes);
    const instances = []; // one per list index
    return {
      nodes: [anchor],
      update: (s) => {
        const list = resolve(listExpr, s, vals) || [];
        // Grow
        for (let i = instances.length; i < list.length; i++) {
          const built = childNodes.map((c) => compileNode(c, vals));
          const frag = document.createDocumentFragment();
          built.forEach((b) => b.nodes.forEach((n) => frag.appendChild(n)));
          // Insert after previous instance's last node, or after anchor.
          const prev = instances[i - 1];
          const ref = prev ? prev.lastNode().nextSibling : anchor.nextSibling;
          anchor.parentNode.insertBefore(frag, ref);
          instances.push({
            built,
            lastNode() {
              const flat = built.flatMap((b) => b.nodes);
              return flat[flat.length - 1];
            },
            remove() { built.forEach((b) => b.remove()); },
          });
        }
        // Shrink
        while (instances.length > list.length) instances.pop().remove();
        // Update
        for (let i = 0; i < list.length; i++) {
          const childScope = Object.assign(Object.create(s), { [asName]: list[i] });
          instances[i].built.forEach((b) => b.update(childScope));
        }
      },
      remove: () => { instances.forEach((i) => i.remove()); instances.length = 0; anchor.remove(); },
    };
  }

  // Regular element — clone shallow, wire attribute + event + form bindings.
  // Use the source node's namespace + localName so inline SVG (svg/path/textPath…)
  // is created in the SVG namespace and renders as vectors, not broken HTML.
  const el = node.namespaceURI === SVG_NS
    ? document.createElementNS(SVG_NS, node.localName)
    : document.createElement(node.localName);
  const updaters = [];

  for (const attr of Array.from(node.attributes)) {
    const name = attr.name;
    const value = attr.value;
    const lower = name.toLowerCase();

    if (lower in EVENT_ATTRS) {
      const fnExpr = value.replace(MUSTACHE, '$1').trim();
      let handler = null;
      updaters.push((s) => { handler = resolve(fnExpr, s, vals); });
      el.addEventListener(EVENT_ATTRS[lower], (e) => { if (typeof handler === 'function') handler(e); });
      continue;
    }
    if (name === 'style-hover') {
      const hoverCss = value;
      let baseStyle = '';
      el.addEventListener('mouseenter', () => { el.setAttribute('style', baseStyle + ';' + hoverCss); });
      el.addEventListener('mouseleave', () => { el.setAttribute('style', baseStyle); });
      // Capture base style each update so it stays in sync with bound styles.
      updaters.push(() => { baseStyle = el.getAttribute('style') || ''; });
      continue;
    }
    if (name === 'value' && hasMustache(value)) {
      const expr = value.replace(MUSTACHE, '$1').trim();
      updaters.push((s) => {
        const v = resolve(expr, s, vals);
        const str = v == null ? '' : String(v);
        if (document.activeElement !== el && el.value !== str) el.value = str;
      });
      continue;
    }
    if (name === 'checked' && hasMustache(value)) {
      const expr = value.replace(MUSTACHE, '$1').trim();
      updaters.push((s) => { el.checked = !!resolve(expr, s, vals); });
      continue;
    }
    if (hasMustache(value)) {
      const raw = value;
      updaters.push((s) => { el.setAttribute(name, interp(raw, s, vals)); });
      continue;
    }
    el.setAttribute(name, value);
  }

  // style-hover needs the bound style applied first, so run style updater order
  // as-registered (attributes processed above already push style updater before
  // the hover base-capture updater below it — capture happens last per element).

  const kids = Array.from(node.childNodes).map((c) => compileNode(c, vals));
  kids.forEach((k) => k.nodes.forEach((n) => el.appendChild(n)));

  return {
    nodes: [el],
    update: (s) => { updaters.forEach((u) => u(s)); kids.forEach((k) => k.update(s)); },
    // Removing the element removes its whole subtree, including any nodes that
    // nested sc-if/sc-for inserted as descendants of this element.
    remove: () => el.remove(),
  };
}

// Parse an HTML string into child nodes (custom tags survive parsing).
function parseTemplate(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  return Array.from(tpl.content.childNodes);
}

// Public: create an app bound to a root element.
// getVals(state, props) must return the flat view-model object (renderVals).
export function createApp({ root, template, state, props, getVals }) {
  const app = {
    state: Object.assign({}, state),
    props,
    _instances: [],
    _vals: null,
    setState(patch) {
      const next = typeof patch === 'function' ? patch(this.state) : patch;
      Object.assign(this.state, next);
      this.render();
    },
    render() {
      this._vals = getVals(this.state, this.props, this);
      const scope = Object.create(null);
      this._instances.forEach((inst) => inst.update(scope));
    },
  };

  // Bind vals lazily: compileNode closes over a live reference object.
  const valsRef = {};
  const nodes = parseTemplate(template);
  app._instances = nodes.map((n) => compileNode(n, valsRef));

  // Wire render() to refresh valsRef then update instances.
  const realRender = () => {
    const v = getVals(app.state, app.props, app);
    for (const k in valsRef) delete valsRef[k];
    Object.assign(valsRef, v);
    const scope = Object.create(null);
    app._instances.forEach((inst) => inst.update(scope));
  };
  app.render = realRender;

  // Mount.
  const frag = document.createDocumentFragment();
  app._instances.forEach((inst) => inst.nodes.forEach((n) => frag.appendChild(n)));
  root.appendChild(frag);
  app.render();
  return app;
}
