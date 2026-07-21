// app/dashboard.js — staff Dashboard hub: open the Kitchen / Bar station displays.

export const dashboardTab = `
<sc-if value="{{ tabDashboard }}">
  <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;margin-bottom:6px;">Dashboard</div>
  <div style="color:#7A8378;font-size:14px;margin-bottom:24px;">Open a station display on its own screen — orders auto-route here.</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:720px;">
    <button onClick="{{ openKitchen }}" style="text-align:left;background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:16px;padding:26px;cursor:pointer;transition:transform .2s,border-color .2s;" style-hover="border-color:#C1744E;transform:translateY(-2px);">
      <div style="font-family:'Marcellus',serif;font-size:22px;color:#2E4A3C;">Kitchen Display</div>
      <div style="font-size:13.5px;color:#7A8378;margin-top:6px;">Food orders routed to the kitchen station.</div>
      <div style="margin-top:16px;color:#C1744E;font-weight:600;font-size:14px;">Open Kitchen →</div>
    </button>
    <button onClick="{{ openBar }}" style="text-align:left;background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:16px;padding:26px;cursor:pointer;transition:transform .2s,border-color .2s;" style-hover="border-color:#C1744E;transform:translateY(-2px);">
      <div style="font-family:'Marcellus',serif;font-size:22px;color:#2E4A3C;">Bar Display</div>
      <div style="font-size:13.5px;color:#7A8378;margin-top:6px;">Drinks routed to the barista station.</div>
      <div style="margin-top:16px;color:#C1744E;font-weight:600;font-size:14px;">Open Bar →</div>
    </button>
  </div>
</sc-if>
`;
