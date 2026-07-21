// customer/history.js — customer History tab: all past orders for this account.

export const custHistoryTab = `
<sc-if value="{{ cHistory }}">
  <div style="padding:20px;">
    <div style="font-family:'Marcellus',serif;font-size:22px;color:#2E4A3C;margin-bottom:14px;">History</div>
    <sc-if value="{{ custNoOrders }}">
      <div style="color:#B8B0A0;font-size:14px;padding:24px 0;text-align:center;">No orders yet.</div>
    </sc-if>
    <sc-for list="{{ custHistory }}" as="o">
      <div style="background:rgba(251,248,241,.72);border:1px solid rgba(255,255,255,.85);border-radius:12px;padding:12px 14px;margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <div style="font-weight:600;">{{ o.id }}</div>
          <div style="font-size:12.5px;color:{{ o.stColor }};font-weight:600;">{{ o.status }}</div>
        </div>
        <div style="font-size:13px;color:#7A8378;margin:4px 0;">{{ o.itemsStr }}</div>
        <div style="color:#C1744E;font-weight:600;font-size:13.5px;">{{ o.totalStr }}</div>
      </div>
    </sc-for>
  </div>
</sc-if>
`;
