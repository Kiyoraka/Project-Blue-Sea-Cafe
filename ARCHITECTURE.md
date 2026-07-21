# Blue Sea Cafe — Architecture Map

A single-page cafe webapp, reproduced 1:1 from the Claude Design prototype
`Blue Sea Cafe.dc.html` as vanilla HTML + CSS + JS. One state object drives four
views and two overlays, switched by `state.view` / `state.tab`.

## App map

```
BLUE SEA CAFE - single-page webapp  (state.view / state.tab)
================================================================
[ landing ] -- ORDER ONLINE --> [ order ]        STAFF --> [ login ] --> [ app ]
  nav (HOME MENU ABOUT TRACK . ORDER . STAFF)     ID+PIN        sidebar + 6 tabs
  hero  |- left  green  headline + stats -|        doLogin      |- main     stats+live orders
        |- right terra  photo + badge    -|                     |- analysis bars+summary+top
  ticker  (drift marquee)                [ order ]              |- product  CRUD table + modal
  menu    (menuGroups -> items rows)       chips All/Coffee/Cakes|- order    full queue
  about   (since 2022 . hours . find us)    item rows [+]        |- pos      grid + sale panel
  track   (phone --> 4-step stepper)        cart -/+ . pay       |            SST + VIP tabs
  footer  (wordmark)                        PLACE --> success    |- setting  gateway/radius/
                                                                              stations/staff
overlays:  edit-product modal (editing)   .   toast (hasToast, 2.2s)
state:     items[8] orders[3] vips[2] cart{} posCart{} . salesToday/txToday
props:     deliveryRadiusKm=5 . sstPercent=6
```

## File layout

```
Website Blue Sea Cafe/
|- index.html                 shell: fonts, css links, #app mount, module entry
|- css/
|  |- base.css                tokens, resets, keyframes, shared/base rules
|  |- mobile.css              @media responsive overrides (separate mobile CSS)
|- js/
|  |- engine.js               reactive compile + patch engine + state container
|  |- data.js                 initial state + static seed arrays
|  |- logic.js                helpers + renderVals() (derived view-model + handlers)
|  |- main.js                 props, root template, mount
|  |- views/
|     |- landing.js           landing template
|     |- order.js             customer QR order flow template
|     |- login.js             staff login template
|     |- modals.js            edit-product modal + toast template
|     |- app/
|        |- shell.js          sidebar + tab container (composes the 6 tabs)
|        |- main.js           dashboard tab
|        |- analysis.js       analysis tab
|        |- product.js        product CRUD tab
|        |- order.js          order queue tab
|        |- pos.js            POS tab
|        |- setting.js        settings tab
|- images/
|  |- hero.png                hero photo (gpt-image-2, portrait)
|  |- about.png               interior photo (gpt-image-2, portrait)
```

## How it works

The design used a proprietary reactive framework (`<x-dc>` + a `DCLogic` class with
`state` and `renderVals()`, plus template directives `{{ }}`, `<sc-if>`, `<sc-for>`,
`onClick`/`onChange`, `style-hover`). `js/engine.js` re-implements exactly those
directives in ~240 lines of dependency-free JavaScript:

- Templates are authored as HTML strings using the same directives, so each view
  file stays a near-verbatim copy of the original markup.
- On every `setState`, the engine recomputes `renderVals(state, props)` and patches
  only the changed text nodes, attributes, inline styles and event handlers -- it
  never swaps `innerHTML`, so CSS keyframe animations do not replay and input focus
  is preserved. `sc-if`/`sc-for` blocks mount/unmount recursively so nested dynamic
  content is never orphaned.
- `onChange` binds the native `change` event (commit on blur), matching the design's
  form behaviour without a virtual DOM.

`js/logic.js` is a faithful port of the design's `renderVals()` and helpers
(`rm`, `deco`, `orderRow`, `cartOps`, `cartTotal`, `pushOrder`) -- every binding
field and handler reproduced exactly. `js/data.js` holds the seed state verbatim.

## Design tokens

- Cream `#F4EEE3` / off-white `#FBF8F1`
- Deep green `#2E4A3C` / `#24382E`, sage `#56705F` / `#9DB3A6`
- Terracotta `#C1744E` / `#A85F3D` / `#8A4E31`, ink `#2A332C`
- Fonts: Marcellus (headings), Jost (body), Cormorant Garamond italic (accents)
