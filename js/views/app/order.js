// app/order.js — unified order queue tab (QR / delivery / POS in one list).

export const orderTab = `
<sc-if value="{{ tabOrder }}">
  <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;margin-bottom:6px;">Orders</div>
  <div style="color:#7A8378;font-size:14px;margin-bottom:20px;">QR table orders, deliveries (≤ {{ radiusStr }} KM) and POS sales in one queue</div>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <sc-for list="{{ allOrders }}" as="o">
      <div style="display:flex;align-items:center;gap:16px;background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:14px 18px;">
        <div style="font-weight:600;width:70px;">{{ o.id }}</div>
        <div style="width:110px;"><span style="font-size:12px;background:{{ o.srcBg }};color:{{ o.srcFg }};padding:3px 10px;border-radius:10px;">{{ o.src }}</span></div>
        <div style="flex:1;font-size:14px;">{{ o.itemsStr }}</div>
        <div style="width:80px;color:#7A8378;font-size:13.5px;">{{ o.totalStr }}</div>
        <div style="font-size:12px;background:#F4EEE3;padding:4px 10px;border-radius:10px;color:#56705F;">{{ o.stationStr }}</div>
        <div style="width:90px;text-align:center;font-size:12.5px;letter-spacing:1px;color:{{ o.stColor }};font-weight:600;">{{ o.status }}</div>
        <button onClick="{{ o.advance }}" style="background:#2E4A3C;color:#F4EEE3;border:none;padding:8px 14px;font-size:12.5px;cursor:pointer;border-radius:3px;" style-hover="background:#C1744E;">{{ o.nextLabel }}</button>
      </div>
    </sc-for>
  </div>
</sc-if>
`;
