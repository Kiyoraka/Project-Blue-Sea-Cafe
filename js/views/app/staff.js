// app/staff.js — staff Staff tab: editable staff list (# + name/id/role + actions),
// with an Add button (mirrors the Product CRUD).

export const staffTab = `
<sc-if value="{{ tabStaff }}">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;">Staff</div>
    <button onClick="{{ addStaff }}" style="background:#C1744E;color:#FBF8F1;border:none;padding:11px 20px;font-size:14px;cursor:pointer;letter-spacing:.5px;" style-hover="background:#A85F3D;">+ Add staff</button>
  </div>
  <div style="color:#7A8378;font-size:14px;margin-bottom:20px;">POS login by staff ID</div>
  <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;max-width:820px;">
    <div style="display:grid;grid-template-columns:56px 1.4fr 120px 120px 140px;padding:12px 18px;font-size:12px;letter-spacing:1px;color:#7A8378;border-bottom:1px solid #E3DCCB;">
      <div>#</div><div>NAME</div><div>ID</div><div>ROLE</div><div></div>
    </div>
    <sc-for list="{{ staffRows }}" as="s">
      <div style="display:grid;grid-template-columns:56px 1.4fr 120px 120px 140px;padding:10px 18px;align-items:center;border-bottom:1px solid #F0EADB;font-size:14px;">
        <div style="color:#9A9078;">{{ s.no }}</div>
        <div style="font-weight:500;">{{ s.name }}</div>
        <div style="color:#7A8378;">{{ s.id }}</div>
        <div style="color:#7A8378;">{{ s.role }}</div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button onClick="{{ s.edit }}" style="border:1px solid #E3DCCB;background:#FBF8F1;padding:6px 14px;font-size:12.5px;cursor:pointer;border-radius:3px;" style-hover="border-color:#C1744E;color:#C1744E;">Edit</button>
          <button onClick="{{ s.del }}" style="border:none;background:transparent;color:#B05A4A;padding:6px 6px;font-size:12.5px;cursor:pointer;">Remove</button>
        </div>
      </div>
    </sc-for>
  </div>
</sc-if>
`;
