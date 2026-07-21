// app/customer.js — staff Customer tab: read-only list of customers (unique by phone).

export const customerTab = `
<sc-if value="{{ tabCustomer }}">
  <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;margin-bottom:6px;">Customers</div>
  <div style="color:#7A8378;font-size:14px;margin-bottom:20px;">Everyone with an account — unique by phone number</div>
  <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;">
    <div style="display:grid;grid-template-columns:56px 1.4fr 1.2fr 110px 90px 120px;padding:12px 18px;font-size:12px;letter-spacing:1px;color:#7A8378;border-bottom:1px solid #E3DCCB;">
      <div>#</div><div>NAME</div><div>PHONE</div><div>DEBT</div><div>ORDERS</div><div>LAST ORDER</div>
    </div>
    <sc-for list="{{ customerRows }}" as="c">
      <div style="display:grid;grid-template-columns:56px 1.4fr 1.2fr 110px 90px 120px;padding:12px 18px;align-items:center;border-bottom:1px solid #F0EADB;font-size:14px;">
        <div style="color:#9A9078;">{{ c.no }}</div>
        <div style="font-weight:500;">{{ c.name }}</div>
        <div style="color:#7A8378;">{{ c.phone }}</div>
        <div style="color:#C1744E;font-weight:600;">{{ c.debtStr }}</div>
        <div style="color:#7A8378;">{{ c.count }}</div>
        <div style="color:#7A8378;">{{ c.last }}</div>
      </div>
    </sc-for>
  </div>
</sc-if>
`;
