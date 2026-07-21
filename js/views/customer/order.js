// customer/order.js — customer Order tab: menu list + inline cart, placed as this
// logged-in customer (phone auto-filled, no guest fields).

export const custOrderTab = `
<sc-if value="{{ cOrder }}">
  <div style="padding:20px;">
    <div style="font-family:'Marcellus',serif;font-size:22px;color:#2E4A3C;margin-bottom:14px;">Order</div>
    <sc-for list="{{ custMenu }}" as="it">
      <div style="display:flex;align-items:center;gap:12px;background:#F4EEE3;padding:10px 12px;border-radius:10px;margin-bottom:8px;">
        <div style="width:44px;height:44px;border-radius:8px;background:{{ it.color }};display:grid;place-items:center;color:#FBF8F1;font-family:'Marcellus',serif;font-size:16px;flex-shrink:0;">{{ it.initials }}</div>
        <div style="flex:1;"><div style="font-weight:500;">{{ it.name }}</div><div style="font-size:12px;color:#7A8378;">{{ it.cat }}</div></div>
        <div style="color:#C1744E;font-weight:600;font-size:13.5px;">{{ it.priceStr }}</div>
        <button onClick="{{ it.add }}" style="width:30px;height:30px;border-radius:50%;border:none;background:#2E4A3C;color:#F4EEE3;font-size:17px;cursor:pointer;flex-shrink:0;" style-hover="background:#C1744E;">+</button>
      </div>
    </sc-for>
    <sc-if value="{{ hasCart }}">
      <div style="border-top:2px solid #2E4A3C;margin-top:14px;padding-top:14px;">
        <sc-for list="{{ cartList }}" as="l">
          <div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:14px;">
            <button onClick="{{ l.dec }}" style="width:24px;height:24px;border:1px solid #E3DCCB;background:#FBF8F1;cursor:pointer;border-radius:4px;">−</button>
            <span style="width:16px;text-align:center;font-weight:600;">{{ l.qty }}</span>
            <button onClick="{{ l.inc }}" style="width:24px;height:24px;border:1px solid #E3DCCB;background:#FBF8F1;cursor:pointer;border-radius:4px;">+</button>
            <span style="flex:1;">{{ l.name }}</span><span style="color:#7A8378;">{{ l.subStr }}</span>
          </div>
        </sc-for>
        <button onClick="{{ placeOrder }}" style="width:100%;margin-top:12px;background:#C1744E;color:#FBF8F1;border:none;padding:13px;font-size:15px;letter-spacing:1px;cursor:pointer;border-radius:8px;" style-hover="background:#A85F3D;">PLACE ORDER · {{ cartTotalStr }}</button>
      </div>
    </sc-if>
  </div>
</sc-if>
`;
