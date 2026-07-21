// logic.js — helpers + renderVals(), ported verbatim from the design's DCLogic.
// `state` is app.state, `props` is the two design props, `app` gives setState.

const rm = (n) => 'RM ' + n.toFixed(2);

function showToast(app, msg) {
  app.setState({ toast: msg });
  clearTimeout(app._tt);
  app._tt = setTimeout(() => app.setState({ toast: '' }), 2200);
}

function deco(it) {
  const initials = it.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return { ...it, initials, priceStr: rm(it.price) };
}

function itemsById(state) {
  const m = {};
  state.items.forEach((i) => (m[i.id] = i));
  return m;
}

function orderRow(state, app, o, idx) {
  const map = itemsById(state);
  const itemsStr = o.items.map(([id, q]) => q + '× ' + (map[id] ? map[id].name : 'Item')).join(', ');
  const stations = [...new Set(o.items.map(([id]) => (map[id] ? map[id].station : 'Kitchen')))];
  const total = o.items.reduce((s, [id, q]) => s + (map[id] ? map[id].price : 0) * q, 0);
  const flow = { New: 'Preparing', Preparing: 'Ready', Ready: 'Done' };
  const stColor = { New: '#C1744E', Preparing: '#7A6A52', Ready: '#2E4A3C', Done: '#9A9078' }[o.status];
  const srcBg = o.src.startsWith('Table') ? '#EAF0EA' : o.src === 'Delivery' ? '#F4E4D8' : '#F0EADB';
  const srcFg = o.src.startsWith('Table') ? '#2E4A3C' : o.src === 'Delivery' ? '#A85F3D' : '#7A6A52';
  return {
    ...o, itemsStr, totalStr: rm(total), stationStr: stations.join(' + '), stColor, srcBg, srcFg,
    nextLabel: o.status === 'Done' ? 'Archive' : '→ ' + flow[o.status],
    advance: () => app.setState((s) => ({
      orders: o.status === 'Done'
        ? s.orders.filter((_, i) => i !== idx)
        : s.orders.map((x, i) => (i === idx ? { ...x, status: flow[x.status] } : x)),
    })),
  };
}

function cartOps(state, app, key) {
  const map = itemsById(state);
  const cart = state[key];
  return Object.entries(cart).filter(([, q]) => q > 0).map(([id, qty]) => {
    const it = map[id];
    if (!it) return null;
    return {
      name: it.name, qty, subStr: rm(it.price * qty),
      inc: () => app.setState((s) => ({ [key]: { ...s[key], [id]: qty + 1 } })),
      dec: () => app.setState((s) => ({ [key]: { ...s[key], [id]: qty - 1 } })),
    };
  }).filter(Boolean);
}

function cartTotal(state, key) {
  const map = itemsById(state);
  return Object.entries(state[key]).reduce((s, [id, q]) => s + (map[id] ? map[id].price : 0) * q, 0);
}

function pushOrder(state, app, src, cartKey, extra) {
  const items = Object.entries(state[cartKey]).filter(([, q]) => q > 0).map(([id, q]) => [+id, q]);
  const no = '#' + state.nextOrderNo;
  app.setState((s) => ({
    orders: [{ id: no, src, items, status: 'New' }, ...s.orders],
    nextOrderNo: s.nextOrderNo + 1, [cartKey]: {}, ...extra,
  }));
  return no;
}

export function renderVals(state, props, app) {
  const s = state;
  const view = s.view, tab = s.tab;
  const radius = props.deliveryRadiusKm ?? s.radius;
  const sstRate = (props.sstPercent ?? 6) / 100;
  const payNames = [s.duitnow && 'DuitNow QR', s.fpx && 'FPX Banking', s.cash && 'Pay at counter'].filter(Boolean);
  const payOptions = payNames.map((name) => ({
    name,
    bd: s.payMethod === name ? '#C1744E' : '#E3DCCB',
    bg: s.payMethod === name ? '#F4E4D8' : '#FBF8F1',
    fg: s.payMethod === name ? '#A85F3D' : '#2A332C',
    pick: () => app.setState({ payMethod: name }),
  }));
  const cartListArr = cartOps(s, app, 'cart');
  const cartTotalVal = cartTotal(s, 'cart');
  const navBadges = { order: String(s.orders.filter((o) => o.status === 'New').length || '') };
  const navItems = [['main', 'Main'], ['analysis', 'Analysis'], ['product', 'Product'], ['order', 'Order'], ['pos', 'POS'], ['setting', 'Setting']]
    .map(([key, label]) => ({
      label, badge: key === 'order' ? navBadges.order : '',
      bg: tab === key ? '#C1744E' : 'transparent',
      fg: tab === key ? '#FBF8F1' : '#C9D6CC',
      go: () => app.setState({ tab: key }),
    }));
  const orderRows = s.orders.map((o, i) => orderRow(s, app, o, i));
  const hours = [['9a', 40], ['10a', 65], ['11a', 80], ['12p', 100], ['1p', 92], ['2p', 60], ['3p', 55], ['4p', 70], ['5p', 48], ['6p', 38], ['7p', 30], ['8p', 22]];
  const maxH = 100;
  const hourBars = hours.map(([label, v]) => ({
    label, pct: Math.round(v / maxH * 100) + '%', amtStr: rm(v * 3.2),
    color: v === maxH ? '#C1744E' : '#56705F',
  }));
  const sells = [['Spanish Latte', 31], ['Burnt Cheesecake', 24], ['Cafe Latte', 22], ['Butter Croissant', 15]];
  const bestSellers = sells.map(([name, count]) => ({ name, count, pct: Math.round(count / 31 * 100) + '%' }));
  const posSub = cartTotal(s, 'posCart');
  const posSst = posSub * sstRate;
  const posCartListArr = cartOps(s, app, 'posCart');
  return {
    isLanding: view === 'landing', isOrder: view === 'order', isLogin: view === 'login', isApp: view === 'app',
    tabMain: tab === 'main', tabAnalysis: tab === 'analysis', tabProduct: tab === 'product',
    tabOrder: tab === 'order', tabPos: tab === 'pos', tabSetting: tab === 'setting',
    goLanding: () => app.setState({ view: 'landing' }),
    goLoginA: (e) => { e.preventDefault(); app.setState({ view: 'login' }); },
    menuGroups: [
      { title: 'COFFEE', tagline: 'pulled to order, beans roasted weekly' },
      { title: 'CAKES & BAKES', tagline: 'baked before sunrise, gone by dusk' },
    ].map((g, gi) => ({
      ...g,
      rows: s.items.filter((i) => (gi === 0 ? i.cat === 'Coffee' : i.cat !== 'Coffee')).map((i) => ({
        ...deco(i),
        add: () => app.setState((st) => ({ cart: { ...st.cart, [i.id]: (st.cart[i.id] || 0) + 1 }, cartDismissed: false })),
      })),
    })),
    trackPhone: s.trackPhone,
    setTrackPhone: (e) => app.setState({ trackPhone: e.target.value }),
    doTrack: () => {
      if (!s.trackPhone.trim()) { showToast(app, 'Enter your phone number'); return; }
      const found = s.orders.find((o) => o.src !== 'Counter' && o.status !== 'Done');
      app.setState({ trackResult: found || null, trackNone: !found });
    },
    trackFound: !!s.trackResult, trackNone: s.trackNone,
    trackId: s.trackResult ? s.trackResult.id : '',
    trackSrc: s.trackResult ? s.trackResult.src : '',
    trackItems: s.trackResult ? orderRow(s, app, s.trackResult, s.orders.indexOf(s.trackResult)).itemsStr : '',
    trackSteps: (() => {
      const stages = ['Received', 'Preparing', 'Ready', 'Completed'];
      const map = { New: 0, Preparing: 1, Ready: 2, Done: 3 };
      const cur = s.trackResult ? map[s.trackResult.status] : -1;
      return stages.map((label, i) => ({
        label,
        dotBg: i <= cur ? '#C1744E' : '#E3DCCB',
        lineBg: i === 0 ? 'transparent' : (i <= cur ? '#C1744E' : '#E3DCCB'),
        fg: i <= cur ? '#2E4A3C' : '#9A9078',
        weight: i === cur ? 600 : 400,
      }));
    })(),
    goLandingA: (e) => { e.preventDefault(); app.setState({ view: 'landing' }); },
    goLogin: () => app.setState({ view: 'login' }),
    goMenu: () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }),
    // Inline cart (public site): right drawer on desktop, bottom sheet on mobile.
    payMethod: s.payMethod, payOptions, cartList: cartListArr,
    hasCart: cartListArr.length > 0, cartEmpty: cartListArr.length === 0,
    cartTotalStr: rm(cartTotalVal),
    cartCount: Object.values(s.cart).reduce((a, q) => a + q, 0),
    cartOpen: s.cartOpen,
    openCart: () => app.setState({ cartOpen: true, cartDismissed: false }),
    closeCart: () => app.setState({ cartOpen: false, cartDismissed: true }),
    // d-open drives the desktop drawer (auto-shows when the cart has items unless the
    // user dismissed it with x; the Cart tab forces it open). open drives the mobile
    // full-page view (Cart tab only). Different @media handle each; x closes both.
    cartPanelClass: (((cartListArr.length && !s.cartDismissed) || s.cartOpen) ? 'd-open' : '')
      + (s.cartOpen ? ' open' : ''),
    cartBadgeClass: cartListArr.length ? 'show' : '',
    placeOrder: () => {
      if (cartListArr.length === 0) return;
      const no = pushOrder(s, app, 'Online', 'cart', { cartOpen: false });
      app.setState((st) => ({ salesToday: st.salesToday + cartTotalVal, txToday: st.txToday + 1 }));
      showToast(app, 'Order sent · ' + no + ' · ' + rm(cartTotalVal));
    },
    loginId: s.loginId, loginPin: s.loginPin,
    setLoginId: (e) => app.setState({ loginId: e.target.value }),
    setLoginPin: (e) => app.setState({ loginPin: e.target.value }),
    pwType: s.pwVisible ? 'text' : 'password',
    pwVisible: s.pwVisible, pwHidden: !s.pwVisible,
    togglePw: () => app.setState((st) => ({ pwVisible: !st.pwVisible })),
    doLogin: () => {
      const id = s.loginId.trim() || 'BS-001';
      app.setState({ view: 'app', staffId: id, tab: 'main' });
      showToast(app, 'Welcome back, ' + id);
    },
    logout: () => app.setState({ view: 'landing', loginId: '', loginPin: '' }),
    staffId: s.staffId, navItems,
    stats: [
      { label: 'SALES TODAY', value: rm(s.salesToday), sub: '+12% vs last Mon' },
      { label: 'TRANSACTIONS', value: String(s.txToday), sub: 'avg ' + rm(s.salesToday / Math.max(s.txToday, 1)) },
      { label: 'OPEN ORDERS', value: String(s.orders.filter((o) => o.status !== 'Done').length), sub: 'kitchen + barista' },
      { label: 'VIP OUTSTANDING', value: rm(s.vips.reduce((a, v) => a + v.bal, 0)), sub: s.vips.length + ' open tabs' },
    ],
    liveOrders: orderRows.slice(0, 4), allOrders: orderRows,
    dailyTotalStr: rm(s.salesToday), hourBars, bestSellers,
    summaryRows: [
      { label: 'Gross sales', value: rm(s.salesToday) },
      { label: 'Transactions', value: String(s.txToday) },
      { label: 'Dine-in / QR', value: '61%' },
      { label: 'Delivery (≤' + radius + ' KM)', value: '17%' },
      { label: 'Counter / POS', value: '22%' },
    ],
    prodRows: s.items.map((i) => ({
      ...deco(i),
      edit: () => app.setState({ editingId: i.id, editName: i.name, editPrice: String(i.price), editStation: i.station }),
      del: () => app.setState((st) => ({ items: st.items.filter((x) => x.id !== i.id) })),
    })),
    addProduct: () => {
      const id = s.nextItemId;
      app.setState((st) => ({
        items: [...st.items, { id, name: 'New Item', price: 10, cat: 'Cakes', station: 'Kitchen', color: '#56705F' }],
        nextItemId: id + 1, editingId: id, editName: 'New Item', editPrice: '10', editStation: 'Kitchen',
      }));
    },
    editing: s.editingId !== null,
    editName: s.editName, editPrice: s.editPrice, editStation: s.editStation,
    setEditName: (e) => app.setState({ editName: e.target.value }),
    setEditPrice: (e) => app.setState({ editPrice: e.target.value }),
    setEditStation: (e) => app.setState({ editStation: e.target.value }),
    closeEdit: () => app.setState({ editingId: null }),
    saveEdit: () => {
      app.setState((st) => ({
        items: st.items.map((x) => (x.id === st.editingId ? { ...x, name: st.editName, price: parseFloat(st.editPrice) || x.price, station: st.editStation } : x)),
        editingId: null,
      }));
      showToast(app, 'Product saved');
    },
    radiusStr: String(radius),
    posItems: s.items.map((i) => ({ ...deco(i), add: () => app.setState((st) => ({ posCart: { ...st.posCart, [i.id]: (st.posCart[i.id] || 0) + 1 } })) })),
    posCartList: posCartListArr, posEmpty: posCartListArr.length === 0,
    posSubStr: rm(posSub), posSstStr: rm(posSst), posTotalStr: rm(posSub + posSst),
    sstLabel: Math.round(sstRate * 100) + '%',
    posPayBtns: ['Cash', 'DuitNow', 'FPX'].map((name) => ({
      name,
      bd: s.posPay === name ? '#C1744E' : '#E3DCCB',
      bg: s.posPay === name ? '#F4E4D8' : '#FBF8F1',
      fg: s.posPay === name ? '#A85F3D' : '#2A332C',
      pick: () => app.setState({ posPay: name }),
    })),
    posVip: s.posVip, toggleVip: () => app.setState((st) => ({ posVip: !st.posVip })),
    vipPhone: s.vipPhone, setVipPhone: (e) => app.setState({ vipPhone: e.target.value }),
    chargeLabel: s.posVip ? 'ADD TO VIP TAB' : 'CHARGE ' + s.posPay.toUpperCase(),
    charge: () => {
      if (posCartListArr.length === 0) { showToast(app, 'Cart is empty'); return; }
      const total = posSub + posSst;
      if (s.posVip) {
        const phone = s.vipPhone.trim() || '01X-XXXXXXX';
        app.setState((st) => {
          const ex = st.vips.find((v) => v.phone === phone);
          const vips = ex ? st.vips.map((v) => (v.phone === phone ? { ...v, bal: v.bal + total } : v))
            : [...st.vips, { name: 'VIP ' + phone, phone, bal: total }];
          return { vips, posCart: {}, posVip: false, vipPhone: '' };
        });
        showToast(app, 'Added ' + rm(total) + ' to VIP tab');
      } else {
        pushOrder(s, app, 'Counter', 'posCart', {});
        app.setState((st) => ({ salesToday: st.salesToday + total, txToday: st.txToday + 1 }));
        showToast(app, 'Charged ' + rm(total) + ' · ' + s.posPay);
      }
    },
    vipRows: s.vips.map((v) => ({
      ...v, balStr: rm(v.bal),
      settle: () => { app.setState((st) => ({ vips: st.vips.filter((x) => x.phone !== v.phone), salesToday: st.salesToday + v.bal, txToday: st.txToday + 1 })); showToast(app, v.name + ' settled ' + rm(v.bal)); },
    })),
    gateway: s.gateway, setGateway: (e) => app.setState({ gateway: e.target.value }),
    radius: s.radius, setRadius: (e) => app.setState({ radius: parseFloat(e.target.value) || 0 }),
    payToggles: [['duitnow', 'DuitNow QR'], ['fpx', 'FPX online banking'], ['cash', 'Cash / pay at counter']].map(([key, label]) => ({
      label, on: s[key], toggle: () => app.setState((st) => ({ [key]: !st[key] })),
    })),
    stationRows: s.stations.map((name, i) => ({ name, remove: () => app.setState((st) => ({ stations: st.stations.filter((_, j) => j !== i) })) })),
    newStation: s.newStation, setNewStation: (e) => app.setState({ newStation: e.target.value }),
    addStation: () => { if (!s.newStation.trim()) return; app.setState((st) => ({ stations: [...st.stations, st.newStation.trim()], newStation: '' })); },
    staffRows: [
      { name: 'Aiman (you)', id: 'BS-001', role: 'Manager' },
      { name: 'Siti', id: 'BS-002', role: 'Cashier' },
      { name: 'Hafiz', id: 'BS-003', role: 'Barista' },
    ],
    hasToast: !!s.toast, toastMsg: s.toast,
  };
}
