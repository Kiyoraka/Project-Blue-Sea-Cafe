// app/main.js — staff dashboard tab: stat cards + live orders. Verbatim.

export const mainTab = `
<sc-if value="{{ tabMain }}">
  <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;">Good morning ☕</div>
  <div style="color:#7A8378;font-size:14px;margin:4px 0 24px;">Monday, 21 July 2026 · store open</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
    <sc-for list="{{ stats }}" as="s">
      <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:18px 20px;">
        <div style="font-size:13px;color:#7A8378;letter-spacing:1px;">{{ s.label }}</div>
        <div style="font-family:'Marcellus',serif;font-size:30px;color:#2E4A3C;margin-top:6px;">{{ s.value }}</div>
        <div style="font-size:12.5px;color:#C1744E;margin-top:2px;">{{ s.sub }}</div>
      </div>
    </sc-for>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:baseline;margin:30px 0 14px;">
    <div style="font-family:'Marcellus',serif;font-size:20px;color:#2E4A3C;">Live orders</div>
    <div style="font-size:13px;color:#7A8378;">auto-routed to kitchen &amp; barista displays</div>
  </div>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <sc-for list="{{ liveOrders }}" as="o">
      <div style="display:flex;align-items:center;gap:16px;background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:14px 18px;">
        <div style="font-weight:600;width:70px;">{{ o.id }}</div>
        <div style="width:110px;font-size:13.5px;color:#7A8378;">{{ o.src }}</div>
        <div style="flex:1;font-size:14px;">{{ o.itemsStr }}</div>
        <div style="font-size:12px;background:#F4EEE3;padding:4px 10px;border-radius:10px;color:#56705F;">{{ o.stationStr }}</div>
        <div style="width:90px;text-align:center;font-size:12.5px;letter-spacing:1px;color:{{ o.stColor }};font-weight:600;">{{ o.status }}</div>
        <button onClick="{{ o.advance }}" style="background:#2E4A3C;color:#F4EEE3;border:none;padding:8px 14px;font-size:12.5px;cursor:pointer;border-radius:3px;" style-hover="background:#C1744E;">{{ o.nextLabel }}</button>
      </div>
    </sc-for>
  </div>
</sc-if>
`;
