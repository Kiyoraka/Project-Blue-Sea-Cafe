// customer/main.js — customer dashboard Main tab: greeting + two cards + recent.

export const custMainTab = `
<sc-if value="{{ cMain }}">
  <div style="padding:22px 20px;">
    <div style="font-family:'Marcellus',serif;font-size:24px;color:#2E4A3C;">Hi, {{ custName }}</div>
    <div style="font-size:13px;color:#7A8378;margin:2px 0 20px;">Welcome back to Blue Sea Cafe</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <sc-for list="{{ custCards }}" as="c">
        <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;padding:16px 18px;">
          <div style="font-size:12px;color:#7A8378;letter-spacing:1px;">{{ c.label }}</div>
          <div style="font-family:'Marcellus',serif;font-size:26px;color:#2E4A3C;margin-top:4px;">{{ c.value }}</div>
          <div style="font-size:11.5px;color:#C1744E;margin-top:2px;">{{ c.sub }}</div>
        </div>
      </sc-for>
    </div>
    <div style="font-family:'Marcellus',serif;font-size:18px;color:#2E4A3C;margin:26px 0 12px;">Recent orders</div>
    <sc-if value="{{ custNoOrders }}">
      <div style="color:#B8B0A0;font-size:14px;padding:24px 0;text-align:center;">No orders yet — tap Order to get started.</div>
    </sc-if>
    <sc-for list="{{ custRecent }}" as="o">
      <div style="display:flex;align-items:center;gap:10px;background:rgba(251,248,241,.72);border:1px solid rgba(255,255,255,.85);border-radius:12px;padding:12px 14px;margin-bottom:8px;">
        <div style="font-weight:600;width:56px;">{{ o.id }}</div>
        <div style="flex:1;font-size:13.5px;color:#7A8378;">{{ o.itemsStr }}</div>
        <div style="font-size:12.5px;color:{{ o.stColor }};font-weight:600;">{{ o.status }}</div>
        <div style="width:66px;text-align:right;color:#C1744E;font-weight:600;">{{ o.totalStr }}</div>
      </div>
    </sc-for>
  </div>
</sc-if>
`;
