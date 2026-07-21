// app/staff.js — staff Staff tab: read-only staff list with a # row-number column.

export const staffTab = `
<sc-if value="{{ tabStaff }}">
  <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;margin-bottom:6px;">Staff</div>
  <div style="color:#7A8378;font-size:14px;margin-bottom:20px;">POS login by staff ID</div>
  <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;max-width:720px;">
    <div style="display:grid;grid-template-columns:56px 1.4fr 120px 140px;padding:12px 18px;font-size:12px;letter-spacing:1px;color:#7A8378;border-bottom:1px solid #E3DCCB;">
      <div>#</div><div>NAME</div><div>ID</div><div>ROLE</div>
    </div>
    <sc-for list="{{ staffRows }}" as="s">
      <div style="display:grid;grid-template-columns:56px 1.4fr 120px 140px;padding:12px 18px;align-items:center;border-bottom:1px solid #F0EADB;font-size:14px;">
        <div style="color:#9A9078;">{{ s.no }}</div>
        <div style="font-weight:500;">{{ s.name }}</div>
        <div style="color:#7A8378;">{{ s.id }}</div>
        <div style="color:#7A8378;">{{ s.role }}</div>
      </div>
    </sc-for>
  </div>
</sc-if>
`;
