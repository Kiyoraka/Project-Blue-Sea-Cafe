// order.js — customer QR ordering flow (mobile column): categories, items, cart,
// pay options, place order -> success. Verbatim from the design.

export const order = `
<sc-if value="{{ isOrder }}">
  <div style="max-width:520px;margin:0 auto;min-height:100vh;background:#FBF8F1;box-shadow:0 0 60px rgba(42,51,44,.15);display:flex;flex-direction:column;">
    <div style="background:#2E4A3C;color:#F4EEE3;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-family:'Marcellus',serif;font-size:18px;letter-spacing:2px;">BLUE SEA CAFE</div>
        <div style="font-size:12px;color:#9DB3A6;">Table {{ tableNo }} · dine-in</div>
      </div>
      <button onClick="{{ goLanding }}" style="background:transparent;border:1px solid #56705F;color:#F4EEE3;padding:6px 14px;font-size:12px;cursor:pointer;border-radius:2px;">EXIT</button>
    </div>
    <sc-if value="{{ orderPlaced }}">
      <div style="padding:60px 32px;text-align:center;">
        <div style="width:64px;height:64px;border-radius:50%;background:#2E4A3C;color:#F4EEE3;display:grid;place-items:center;font-size:30px;margin:0 auto 20px;">✓</div>
        <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;">Order sent!</div>
        <div style="color:#7A8378;margin-top:10px;line-height:1.6;">Your order was routed to the kitchen &amp; barista. Track it below or at the counter.</div>
        <div style="background:#F4EEE3;padding:16px;margin-top:24px;font-size:14px;">Order <b>{{ lastOrderId }}</b> · {{ payMethod }} · {{ lastOrderTotal }}</div>
        <button onClick="{{ orderAgain }}" style="margin-top:24px;background:#C1744E;color:#FBF8F1;border:none;padding:12px 26px;cursor:pointer;letter-spacing:1px;" style-hover="background:#A85F3D;">ORDER MORE</button>
      </div>
    </sc-if>
    <sc-if value="{{ notPlaced }}">
      <div style="display:flex;gap:8px;padding:14px 18px;border-bottom:1px solid #E3DCCB;">
        <sc-for list="{{ cats }}" as="c">
          <button onClick="{{ c.pick }}" style="border:1px solid {{ c.bd }};background:{{ c.bg }};color:{{ c.fg }};padding:7px 16px;border-radius:20px;font-size:13px;cursor:pointer;">{{ c.name }}</button>
        </sc-for>
      </div>
      <div style="flex:1;overflow:auto;padding:10px 18px;display:flex;flex-direction:column;gap:10px;">
        <sc-for list="{{ orderItems }}" as="it">
          <div style="display:flex;gap:14px;align-items:center;background:#F4EEE3;padding:12px;border-radius:4px;">
            <div style="width:56px;height:56px;border-radius:4px;background:{{ it.color }};display:grid;place-items:center;color:#FBF8F1;font-family:'Marcellus',serif;font-size:20px;flex-shrink:0;">{{ it.initials }}</div>
            <div style="flex:1;">
              <div style="font-weight:500;">{{ it.name }}</div>
              <div style="font-size:13px;color:#7A8378;">{{ it.cat }} · {{ it.station }}</div>
            </div>
            <div style="color:#C1744E;font-weight:600;font-size:14px;">{{ it.priceStr }}</div>
            <button onClick="{{ it.add }}" style="width:32px;height:32px;border-radius:50%;border:none;background:#2E4A3C;color:#F4EEE3;font-size:18px;cursor:pointer;" style-hover="background:#C1744E;">+</button>
          </div>
        </sc-for>
      </div>
      <sc-if value="{{ hasCart }}">
        <div style="border-top:2px solid #2E4A3C;background:#FBF8F1;padding:16px 18px;">
          <sc-for list="{{ cartList }}" as="l">
            <div style="display:flex;align-items:center;gap:10px;padding:6px 0;font-size:14px;">
              <button onClick="{{ l.dec }}" style="width:24px;height:24px;border:1px solid #E3DCCB;background:#FBF8F1;cursor:pointer;border-radius:4px;">−</button>
              <span style="width:18px;text-align:center;font-weight:600;">{{ l.qty }}</span>
              <button onClick="{{ l.inc }}" style="width:24px;height:24px;border:1px solid #E3DCCB;background:#FBF8F1;cursor:pointer;border-radius:4px;">+</button>
              <span style="flex:1;">{{ l.name }}</span>
              <span style="color:#7A8378;">{{ l.subStr }}</span>
            </div>
          </sc-for>
          <div style="display:flex;gap:8px;margin:12px 0;">
            <sc-for list="{{ payOptions }}" as="p">
              <button onClick="{{ p.pick }}" style="flex:1;padding:9px 4px;font-size:12.5px;border:1px solid {{ p.bd }};background:{{ p.bg }};color:{{ p.fg }};cursor:pointer;border-radius:3px;">{{ p.name }}</button>
            </sc-for>
          </div>
          <button onClick="{{ placeOrder }}" style="width:100%;background:#C1744E;color:#FBF8F1;border:none;padding:14px;font-size:15px;letter-spacing:1px;cursor:pointer;" style-hover="background:#A85F3D;">PLACE ORDER · {{ cartTotalStr }}</button>
        </div>
      </sc-if>
    </sc-if>
  </div>
</sc-if>
`;
