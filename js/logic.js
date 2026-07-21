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

function pushOrder(state, app, src, cartKey, extra, phone) {
  const items = Object.entries(state[cartKey]).filter(([, q]) => q > 0).map(([id, q]) => [+id, q]);
  const no = '#' + state.nextOrderNo;
  app.setState((s) => ({
    orders: [{ id: no, src, items, status: 'New', phone: phone || '' }, ...s.orders],
    nextOrderNo: s.nextOrderNo + 1, [cartKey]: {}, ...extra,
  }));
  return no;
}

// Customer helpers: match by digits-only phone; debt mirrors the VIP tab balance.
const normPhone = (p) => (p || '').replace(/\D/g, '');
function customerByPhone(state, phone) {
  const n = normPhone(phone);
  return state.customers.find((c) => normPhone(c.phone) === n) || null;
}
function customerDebt(state, phone) {
  const v = state.vips.find((x) => normPhone(x.phone) === normPhone(phone));
  return v ? v.bal : 0;
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
  const navItems = [['main', 'Main'], ['analysis', 'Analysis'], ['product', 'Product'], ['order', 'Order'], ['pos', 'POS'], ['customer', 'Customer'], ['setting', 'Setting']]
    .map(([key, label]) => ({
      label, badge: key === 'order' ? navBadges.order : '',
      bg: tab === key ? '#C1744E' : 'transparent',
      fg: tab === key ? '#FBF8F1' : '#C9D6CC',
      go: () => app.setState({ tab: key }),
    }));
  const orderRows = s.orders.map((o, i) => orderRow(s, app, o, i));
  // Sidebar nav model + Kitchen/Bar station displays.
  const navItem = (key) => ({
    bg: tab === key ? '#C1744E' : 'transparent',
    fg: tab === key ? '#FBF8F1' : '#C9D6CC',
    go: () => app.setState({ tab: key }),
  });
  const imap = itemsById(s);
  const hasStation = (o, st) => o.items.some(([id]) => (imap[id] ? imap[id].station : '') === st);
  const stationOrders = (st) => s.orders
    .map((o, i) => [o, i])
    .filter(([o]) => o.status !== 'Done' && hasStation(o, st))
    .map(([o, i]) => orderRow(s, app, o, i));
  const kitchenOrders = stationOrders('Kitchen');
  const barOrders = stationOrders('Barista');
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
  // Customer account context (logged-in customer + their orders).
  const showCart = view === 'landing'; // the floating cart drawer belongs to the site only
  const cust = customerByPhone(s, s.custPhone);
  const custOrders = s.orders.filter((o) => s.custPhone && normPhone(o.phone) === normPhone(s.custPhone));
  const custDebt = customerDebt(s, s.custPhone);
  const custMenu = s.items.map((i) => ({
    ...deco(i),
    add: () => app.setState((st) => ({ cart: { ...st.cart, [i.id]: (st.cart[i.id] || 0) + 1 }, cartDismissed: false })),
  }));
  const customerRows = s.customers.map((c, i) => {
    const co = s.orders.filter((o) => normPhone(o.phone) === normPhone(c.phone));
    return { no: String(i + 1), name: c.name, phone: c.phone, debtStr: rm(customerDebt(s, c.phone)), count: String(co.length), last: co[0] ? co[0].id : '—' };
  });
  return {
    isLanding: view === 'landing', isOrder: view === 'order', isLogin: view === 'login', isApp: view === 'app',
    isCustomer: view === 'customer', isPwchange: view === 'pwchange',
    isKitchen: view === 'kitchen', isBar: view === 'bar',
    tabMain: tab === 'main', tabAnalysis: tab === 'analysis', tabProduct: tab === 'product',
    tabOrder: tab === 'order', tabPos: tab === 'pos', tabCustomer: tab === 'customer', tabSetting: tab === 'setting',
    tabDashboard: tab === 'dashboard', tabStaff: tab === 'staff',
    goLanding: () => app.setState({ view: 'landing', custPhone: '', custTab: 'main' }),
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
    goLandingA: (e) => { e.preventDefault(); app.setState({ view: 'landing', custPhone: '', custTab: 'main' }); },
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
    cartPanelClass: (showCart && ((cartListArr.length && !s.cartDismissed) || s.cartOpen) ? 'd-open' : '')
      + (showCart && s.cartOpen ? ' open' : ''),
    cartBadgeClass: cartListArr.length ? 'show' : '',
    placeOrder: () => {
      if (cartListArr.length === 0) return;
      const loggedIn = !!s.custPhone;
      const name = loggedIn ? (cust ? cust.name : '') : s.guestName.trim();
      const phone = loggedIn ? s.custPhone : s.guestPhone.trim();
      if (!loggedIn && (!name || !phone)) { showToast(app, 'Enter your name and phone to order'); return; }
      // Create the customer on first order (password = name + phone, must change on login).
      if (!loggedIn && !customerByPhone(s, phone)) {
        app.setState((st) => ({ customers: [...st.customers, { phone, name, password: name + phone, mustChange: true }] }));
      }
      const no = pushOrder(s, app, 'Online', 'cart', { cartOpen: false, guestName: '', guestPhone: '' }, phone);
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
      const id = s.loginId.trim();
      if (!id) { showToast(app, 'Enter your phone or email'); return; }
      // Staff sign in with an email; customers use only a phone number.
      if (id.includes('@')) {
        app.setState({ view: 'app', staffId: id, tab: 'main', loginPin: '' });
        showToast(app, 'Welcome back');
        return;
      }
      const c = customerByPhone(s, id);
      if (!c) { showToast(app, 'No account yet — place an order to create one'); return; }
      if (s.loginPin !== c.password) { showToast(app, 'Wrong password'); return; }
      if (c.mustChange) { app.setState({ view: 'pwchange', custPhone: c.phone, pwNew: '', pwConfirm: '', loginPin: '' }); return; }
      app.setState({ view: 'customer', custPhone: c.phone, custTab: 'main', loginPin: '' });
    },
    logout: () => app.setState({ view: 'landing', loginId: '', loginPin: '', custPhone: '', custTab: 'main' }),
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
    ].map((r, i) => ({ ...r, no: String(i + 1) })),

    // ---- Sidebar dropdown groups + Kitchen/Bar displays ----------------------
    navMain: navItem('main'), navAnalysis: navItem('analysis'), navSetting: navItem('setting'),
    navProduct: navItem('product'), navOrder: navItem('order'), navPos: navItem('pos'), navDashboard: navItem('dashboard'),
    navCustomer: navItem('customer'), navStaff: navItem('staff'),
    orderBadge: navBadges.order,
    opsOpen: s.opsOpen, peopleOpen: s.peopleOpen,
    toggleOps: () => app.setState((st) => ({ opsOpen: !st.opsOpen })),
    togglePeople: () => app.setState((st) => ({ peopleOpen: !st.peopleOpen })),
    opsChevron: s.opsOpen ? '▾' : '▸', peopleChevron: s.peopleOpen ? '▾' : '▸',
    openKitchen: () => app.setState({ view: 'kitchen' }),
    openBar: () => app.setState({ view: 'bar' }),
    backToApp: () => app.setState({ view: 'app', tab: 'dashboard' }),
    kitchenOrders, barOrders,
    kitchenEmpty: kitchenOrders.length === 0, barEmpty: barOrders.length === 0,

    // ---- Customer account + dashboard ----------------------------------------
    custName: cust ? cust.name : '', custPhoneStr: s.custPhone,
    cMain: s.custTab === 'main', cOrder: s.custTab === 'order',
    cHistory: s.custTab === 'history', cSetting: s.custTab === 'setting',
    custDebtStr: rm(custDebt),
    custCards: [
      { label: 'DEBT', value: rm(custDebt), sub: custDebt > 0 ? 'outstanding — settle at counter' : 'all settled' },
      { label: 'ORDERS', value: String(custOrders.length), sub: 'placed with this account' },
    ],
    custRecent: custOrders.slice(0, 4).map((o) => orderRow(s, app, o, s.orders.indexOf(o))),
    custHistory: custOrders.map((o) => orderRow(s, app, o, s.orders.indexOf(o))),
    custHasOrders: custOrders.length > 0, custNoOrders: custOrders.length === 0,
    goCMain: () => app.setState({ custTab: 'main' }),
    goCOrder: () => app.setState({ custTab: 'order' }),
    goCHistory: () => app.setState({ custTab: 'history' }),
    goCSetting: () => app.setState({ custTab: 'setting' }),
    cMainCls: s.custTab === 'main' ? 'active' : '',
    cOrderCls: s.custTab === 'order' ? 'active' : '',
    cHistoryCls: s.custTab === 'history' ? 'active' : '',
    cSettingCls: s.custTab === 'setting' ? 'active' : '',
    custMenu,
    custLogout: () => app.setState({ view: 'landing', custPhone: '', custTab: 'main', loginId: '', loginPin: '' }),

    // password change — used by the first-login gate AND the Setting tab
    pwNew: s.pwNew, pwConfirm: s.pwConfirm,
    setPwNew: (e) => app.setState({ pwNew: e.target.value }),
    setPwConfirm: (e) => app.setState({ pwConfirm: e.target.value }),
    savePw: () => {
      if (!s.pwNew.trim()) { showToast(app, 'Enter a new password'); return; }
      if (s.pwNew !== s.pwConfirm) { showToast(app, 'Passwords do not match'); return; }
      const fromGate = s.view === 'pwchange';
      app.setState((st) => ({
        customers: st.customers.map((c) => (c.phone === st.custPhone ? { ...c, password: st.pwNew, mustChange: false } : c)),
        pwNew: '', pwConfirm: '',
        ...(fromGate ? { view: 'customer', custTab: 'main' } : {}),
      }));
      showToast(app, 'Password updated');
    },

    // guest checkout identity (name + phone captured at PLACE ORDER)
    isGuest: !s.custPhone, guestName: s.guestName, guestPhone: s.guestPhone,
    setGuestName: (e) => app.setState({ guestName: e.target.value }),
    setGuestPhone: (e) => app.setState({ guestPhone: e.target.value }),

    // staff Customer tab (read-only list)
    customerRows,

    hasToast: !!s.toast, toastMsg: s.toast,
  };
}
