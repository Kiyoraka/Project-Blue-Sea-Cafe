// data.js — initial mutable state, copied verbatim from the design's DCLogic.state.
// (Static definitions like menu group titles, hourly bars and staff rows live in
//  logic.js inside renderVals, exactly as the source did.)

export const initialState = {
  view: 'landing', tab: 'main',
  items: [
    { id: 1, name: 'Long Black', price: 8, cat: 'Coffee', station: 'Barista', color: '#2E4A3C' },
    { id: 2, name: 'Cafe Latte', price: 10, cat: 'Coffee', station: 'Barista', color: '#C1744E' },
    { id: 3, name: 'Spanish Latte', price: 12, cat: 'Coffee', station: 'Barista', color: '#7A6A52' },
    { id: 4, name: 'Matcha Latte', price: 12, cat: 'Coffee', station: 'Barista', color: '#56705F' },
    { id: 5, name: 'Burnt Cheesecake', price: 14, cat: 'Cakes', station: 'Kitchen', color: '#C1744E' },
    { id: 6, name: 'Carrot Cake', price: 12, cat: 'Cakes', station: 'Kitchen', color: '#A85F3D' },
    { id: 7, name: 'Banana Bread', price: 8, cat: 'Cakes', station: 'Kitchen', color: '#7A6A52' },
    { id: 8, name: 'Butter Croissant', price: 7, cat: 'Cakes', station: 'Kitchen', color: '#2E4A3C' },
  ],
  nextItemId: 9, nextOrderNo: 1043,
  cart: {}, cartOpen: false, payMethod: 'DuitNow QR',
  loginId: '', loginPin: '', staffId: 'BS-001',
  orders: [
    { id: '#1040', src: 'Table 4', items: [[2, 2], [5, 1]], status: 'Preparing' },
    { id: '#1041', src: 'Delivery', items: [[1, 1], [7, 2]], status: 'New' },
    { id: '#1042', src: 'Counter', items: [[3, 1]], status: 'Ready' },
  ],
  posCart: {}, posPay: 'Cash', posVip: false, vipPhone: '',
  vips: [
    { name: 'Dato Rahman', phone: '012-3456789', bal: 86.5 },
    { name: 'Ms. Lily Tan', phone: '019-8877665', bal: 42 },
  ],
  salesToday: 1284.5, txToday: 96,
  editingId: null, editName: '', editPrice: '', editStation: 'Barista',
  gateway: 'Billplz', radius: 5, fpx: true, duitnow: true, cash: true,
  stations: ['Kitchen Display', 'Barista Display'], newStation: '',
  trackPhone: '', trackResult: null, trackNone: false,
  toast: '',
};
