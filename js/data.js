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
  cart: {}, cartOpen: false, cartDismissed: false, payMethod: 'DuitNow QR',
  loginId: '', loginPin: '', pwVisible: false, staffId: 'BS-001',
  // Staff account & security (Setting tab). Email = login identity (staffId); password
  // is hardcode-first (no gate yet), mirroring the customer change-password flow.
  staffEmailDraft: 'BS-001', staffPassword: '', staffPwNew: '', staffPwConfirm: '',
  // Customer accounts (phone-only). Initial password = name + phone; must change on
  // first login. Debt is derived from the matching VIP tab balance at render time.
  customers: [
    { phone: '012-3456789', name: 'Dato Rahman', password: 'Dato Rahman012-3456789', mustChange: true },
    { phone: '019-8877665', name: 'Ms. Lily Tan', password: 'Ms. Lily Tan019-8877665', mustChange: true },
  ],
  custPhone: '', custTab: 'main',
  pwNew: '', pwConfirm: '',
  guestName: '', guestPhone: '',
  opsOpen: true, peopleOpen: true, // staff sidebar dropdown groups (start expanded)
  staff: [
    { key: 1, name: 'Aiman (you)', id: 'BS-001', role: 'Manager' },
    { key: 2, name: 'Siti', id: 'BS-002', role: 'Cashier' },
    { key: 3, name: 'Hafiz', id: 'BS-003', role: 'Barista' },
  ],
  nextStaffKey: 4,
  editingStaffKey: null, editStaffName: '', editStaffId: '', editStaffRole: 'Cashier',
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
