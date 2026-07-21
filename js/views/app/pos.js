// app/pos.js — POS tab: item grid + current-sale panel (SST, pay, VIP tabs).

export const posTab = `
<sc-if value="{{ tabPos }}">
  <div style="display:grid;grid-template-columns:1fr 340px;gap:22px;">
    <div>
      <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;margin-bottom:16px;">POS</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;">
        <sc-for list="{{ posItems }}" as="it">
          <button onClick="{{ it.add }}" style="text-align:left;background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:0 0 14px;cursor:pointer;" style-hover="border-color:#C1744E;">
            <div style="height:74px;background:{{ it.color }};display:grid;place-items:center;color:#FBF8F1;font-family:'Marcellus',serif;font-size:24px;">{{ it.initials }}</div>
            <div style="padding:10px 14px 0;font-size:14px;font-weight:500;">{{ it.name }}</div>
            <div style="padding:2px 14px 0;color:#C1744E;font-weight:600;font-size:14px;">{{ it.priceStr }}</div>
          </button>
        </sc-for>
      </div>
    </div>
    <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:20px;height:fit-content;">
      <div style="font-weight:600;letter-spacing:1px;font-size:13px;color:#7A8378;">CURRENT SALE · {{ staffId }}</div>
      <div style="min-height:120px;margin:12px 0;display:flex;flex-direction:column;gap:6px;">
        <sc-if value="{{ posEmpty }}"><div style="color:#B8B0A0;font-size:14px;padding:30px 0;text-align:center;">Tap items to add</div></sc-if>
        <sc-for list="{{ posCartList }}" as="l">
          <div style="display:flex;align-items:center;gap:8px;font-size:14px;">
            <button onClick="{{ l.dec }}" style="width:22px;height:22px;border:1px solid #E3DCCB;background:#FBF8F1;cursor:pointer;border-radius:4px;font-size:12px;">−</button>
            <span style="width:16px;text-align:center;font-weight:600;">{{ l.qty }}</span>
            <button onClick="{{ l.inc }}" style="width:22px;height:22px;border:1px solid #E3DCCB;background:#FBF8F1;cursor:pointer;border-radius:4px;font-size:12px;">+</button>
            <span style="flex:1;">{{ l.name }}</span><span style="color:#7A8378;">{{ l.subStr }}</span>
          </div>
        </sc-for>
      </div>
      <div style="border-top:1px solid #E3DCCB;padding-top:12px;font-size:14px;">
        <div style="display:flex;justify-content:space-between;padding:3px 0;color:#7A8378;"><span>Subtotal</span><span>{{ posSubStr }}</span></div>
        <div style="display:flex;justify-content:space-between;padding:3px 0;color:#7A8378;"><span>SST {{ sstLabel }}</span><span>{{ posSstStr }}</span></div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;font-weight:600;font-size:17px;color:#2E4A3C;"><span>Total</span><span>{{ posTotalStr }}</span></div>
      </div>
      <div style="display:flex;gap:6px;margin:10px 0;">
        <sc-for list="{{ posPayBtns }}" as="p">
          <button onClick="{{ p.pick }}" style="flex:1;padding:8px 2px;font-size:12px;border:1px solid {{ p.bd }};background:{{ p.bg }};color:{{ p.fg }};cursor:pointer;border-radius:3px;">{{ p.name }}</button>
        </sc-for>
      </div>
      <label style="display:flex;align-items:center;gap:8px;font-size:13.5px;margin:10px 0;cursor:pointer;color:#56705F;">
        <input type="checkbox" checked="{{ posVip }}" onChange="{{ toggleVip }}"> VIP tab — accumulate bill (pay later)
      </label>
      <sc-if value="{{ posVip }}">
        <input value="{{ vipPhone }}" onChange="{{ setVipPhone }}" placeholder="VIP phone e.g. 012-3456789" style="width:100%;padding:9px 10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:13.5px;margin-bottom:10px;outline:none;">
      </sc-if>
      <button onClick="{{ charge }}" style="width:100%;background:#C1744E;color:#FBF8F1;border:none;padding:13px;font-size:15px;letter-spacing:1px;cursor:pointer;" style-hover="background:#A85F3D;">{{ chargeLabel }}</button>
      <div style="margin-top:22px;">
        <div style="font-weight:600;letter-spacing:1px;font-size:13px;color:#7A8378;margin-bottom:8px;">VIP TABS</div>
        <sc-for list="{{ vipRows }}" as="v">
          <div style="display:flex;align-items:center;gap:8px;font-size:13.5px;padding:6px 0;border-bottom:1px solid #F0EADB;">
            <div style="flex:1;"><div style="font-weight:500;">{{ v.name }}</div><div style="color:#7A8378;font-size:12px;">{{ v.phone }}</div></div>
            <div style="color:#C1744E;font-weight:600;">{{ v.balStr }}</div>
            <button onClick="{{ v.settle }}" style="border:1px solid #E3DCCB;background:#FBF8F1;padding:5px 10px;font-size:11.5px;cursor:pointer;border-radius:3px;" style-hover="border-color:#2E4A3C;">Settle</button>
          </div>
        </sc-for>
      </div>
    </div>
  </div>
</sc-if>
`;
