// app/product.js — product CRUD tab (table + add/edit/remove).

export const productTab = `
<sc-if value="{{ tabProduct }}">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;">Products</div>
    <button onClick="{{ addProduct }}" style="background:#C1744E;color:#FBF8F1;border:none;padding:11px 20px;font-size:14px;cursor:pointer;letter-spacing:.5px;" style-hover="background:#A85F3D;">+ Add product</button>
  </div>
  <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;">
    <div style="display:grid;grid-template-columns:70px 1fr 120px 120px 130px 140px;padding:12px 18px;font-size:12px;letter-spacing:1px;color:#7A8378;border-bottom:1px solid #E3DCCB;">
      <div>PIC</div><div>NAME</div><div>CATEGORY</div><div>STATION</div><div>PRICE</div><div></div>
    </div>
    <sc-for list="{{ prodRows }}" as="p">
      <div style="display:grid;grid-template-columns:70px 1fr 120px 120px 130px 140px;padding:10px 18px;align-items:center;border-bottom:1px solid #F0EADB;font-size:14px;">
        <div style="width:44px;height:44px;border-radius:4px;background:{{ p.color }};display:grid;place-items:center;color:#FBF8F1;font-family:'Marcellus',serif;">{{ p.initials }}</div>
        <div style="font-weight:500;">{{ p.name }}</div>
        <div style="color:#7A8378;">{{ p.cat }}</div>
        <div><span style="font-size:12px;background:#F4EEE3;padding:3px 10px;border-radius:10px;color:#56705F;">{{ p.station }}</span></div>
        <div style="color:#C1744E;font-weight:600;">{{ p.priceStr }}</div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button onClick="{{ p.edit }}" style="border:1px solid #E3DCCB;background:#FBF8F1;padding:6px 14px;font-size:12.5px;cursor:pointer;border-radius:3px;" style-hover="border-color:#C1744E;color:#C1744E;">Edit</button>
          <button onClick="{{ p.del }}" style="border:none;background:transparent;color:#B05A4A;padding:6px 6px;font-size:12.5px;cursor:pointer;">Remove</button>
        </div>
      </div>
    </sc-for>
  </div>
</sc-if>
`;
