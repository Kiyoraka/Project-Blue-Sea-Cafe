// display/shell.js — full-screen station displays (KDS). Kitchen + Bar each show live
// orders routed to that station as big cards with an advance button.

const card = `
  <div class="kds-card">
    <div style="display:flex;justify-content:space-between;align-items:baseline;">
      <div style="font-family:'Marcellus',serif;font-size:22px;color:#2E4A3C;">{{ o.id }}</div>
      <div style="font-size:12.5px;letter-spacing:1px;color:{{ o.stColor }};font-weight:600;">{{ o.status }}</div>
    </div>
    <div style="font-size:12.5px;color:#7A8378;margin:4px 0 12px;">{{ o.src }} · {{ o.stationStr }}</div>
    <div style="font-size:15px;color:#2A332C;line-height:1.5;margin-bottom:16px;">{{ o.itemsStr }}</div>
    <button onClick="{{ o.advance }}" style="width:100%;background:#2E4A3C;color:#F4EEE3;border:none;padding:11px;font-size:13.5px;letter-spacing:1px;cursor:pointer;border-radius:6px;" style-hover="background:#C1744E;">{{ o.nextLabel }}</button>
  </div>`;

const page = (flag, title, subtitle, emptyFlag, emptyMsg, list) => `
<sc-if value="{{ ${flag} }}">
  <div class="kds-wrap">
    <div class="kds-head">
      <div>
        <div style="font-family:'Marcellus',serif;font-size:22px;letter-spacing:2px;">${title}</div>
        <div style="font-size:12px;color:#9DB3A6;">${subtitle}</div>
      </div>
      <button onClick="{{ backToApp }}" style="background:transparent;border:1px solid #56705F;color:#F4EEE3;padding:8px 16px;font-size:13px;cursor:pointer;border-radius:4px;" style-hover="border-color:#C1744E;">← Back</button>
    </div>
    <div class="kds-body">
      <sc-if value="{{ ${emptyFlag} }}"><div class="kds-empty">${emptyMsg}</div></sc-if>
      <div class="kds-grid">
        <sc-for list="{{ ${list} }}" as="o">${card}</sc-for>
      </div>
    </div>
  </div>
</sc-if>`;

export const displays = `
${page('isKitchen', 'KITCHEN DISPLAY', 'live food orders · Blue Sea Cafe', 'kitchenEmpty', 'No kitchen orders right now.', 'kitchenOrders')}
${page('isBar', 'BAR DISPLAY', 'live drink orders · Blue Sea Cafe', 'barEmpty', 'No bar orders right now.', 'barOrders')}
`;
