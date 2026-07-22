// app/setting.js — settings tab: sectioned layout (label+description left, controls right).

export const settingTab = `
<sc-if value="{{ tabSetting }}">
  <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;margin-bottom:6px;">Settings</div>
  <div style="color:#7A8378;font-size:14px;margin-bottom:24px;">Manage payments, delivery, stations, and your account</div>
  <div class="set-list" style="display:flex;flex-direction:column;gap:20px;max-width:960px;">

    <div class="set-card" style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:26px 28px;">
      <div class="set-row" style="display:grid;grid-template-columns:260px 1fr;gap:32px;align-items:start;">
        <div>
          <div style="font-weight:500;font-size:16px;color:#2E4A3C;margin-bottom:4px;">Payment gateway</div>
          <div style="font-size:13px;color:#7A8378;line-height:1.5;">Used for QR table &amp; delivery orders</div>
        </div>
        <div style="max-width:520px;">
          <select value="{{ gateway }}" onChange="{{ setGateway }}" style="width:100%;padding:10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;margin-bottom:8px;">
            <option>Billplz</option><option>ToyyibPay</option><option>Stripe</option><option>iPay88</option>
          </select>
          <sc-for list="{{ payToggles }}" as="t">
            <label style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid #F0EADB;cursor:pointer;font-size:14px;">
              <span>{{ t.label }}</span>
              <input type="checkbox" checked="{{ t.on }}" onChange="{{ t.toggle }}">
            </label>
          </sc-for>
        </div>
      </div>
    </div>

    <div class="set-card" style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:26px 28px;">
      <div class="set-row" style="display:grid;grid-template-columns:260px 1fr;gap:32px;align-items:start;">
        <div>
          <div style="font-weight:500;font-size:16px;color:#2E4A3C;margin-bottom:4px;">Delivery</div>
          <div style="font-size:13px;color:#7A8378;line-height:1.5;">In-house riders only</div>
        </div>
        <div style="max-width:520px;">
          <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">RADIUS (KM)</div>
          <input type="number" value="{{ radius }}" onChange="{{ setRadius }}" style="width:100%;padding:10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;margin-bottom:8px;outline:none;">
          <div style="font-size:13px;color:#56705F;">Orders beyond {{ radiusStr }} KM are auto-declined at checkout.</div>
        </div>
      </div>
    </div>

    <div class="set-card" style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:26px 28px;">
      <div class="set-row" style="display:grid;grid-template-columns:260px 1fr;gap:32px;align-items:start;">
        <div>
          <div style="font-weight:500;font-size:16px;color:#2E4A3C;margin-bottom:4px;">Station displays</div>
          <div style="font-size:13px;color:#7A8378;line-height:1.5;">Create dashboards; orders auto-route by product station</div>
        </div>
        <div style="max-width:520px;">
          <sc-for list="{{ stationRows }}" as="s">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #F0EADB;font-size:14px;">
              <span>{{ s.name }}</span>
              <button onClick="{{ s.remove }}" style="border:none;background:transparent;color:#B05A4A;cursor:pointer;font-size:12.5px;">Remove</button>
            </div>
          </sc-for>
          <div style="display:flex;gap:8px;margin-top:12px;">
            <input value="{{ newStation }}" onChange="{{ setNewStation }}" placeholder="e.g. Dessert Station" style="flex:1;min-width:0;padding:9px 10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:13.5px;outline:none;">
            <button onClick="{{ addStation }}" style="background:#2E4A3C;color:#F4EEE3;border:none;padding:9px 16px;cursor:pointer;font-size:13px;" style-hover="background:#C1744E;">Add</button>
          </div>
        </div>
      </div>
    </div>

    <div class="set-card" style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:26px 28px;">
      <div class="set-row" style="display:grid;grid-template-columns:260px 1fr;gap:32px;align-items:start;">
        <div>
          <div style="font-weight:500;font-size:16px;color:#2E4A3C;margin-bottom:4px;">Account &amp; Security</div>
          <div style="font-size:13px;color:#7A8378;line-height:1.5;">Your signed-in email and password</div>
        </div>
        <div style="max-width:520px;">
          <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">LOGIN EMAIL</div>
          <div style="display:flex;gap:8px;margin-bottom:18px;">
            <input value="{{ staffEmailDraft }}" onChange="{{ setStaffEmail }}" placeholder="you@cafe.com" style="flex:1;min-width:0;padding:10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;outline:none;">
            <button onClick="{{ saveStaffEmail }}" style="background:#2E4A3C;color:#F4EEE3;border:none;padding:9px 16px;cursor:pointer;font-size:13px;white-space:nowrap;" style-hover="background:#C1744E;">Update email</button>
          </div>
          <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">CHANGE PASSWORD</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <input value="{{ staffPwNew }}" onChange="{{ setStaffPwNew }}" type="{{ pwType }}" placeholder="New password" style="flex:1;min-width:140px;padding:10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;outline:none;">
            <input value="{{ staffPwConfirm }}" onChange="{{ setStaffPwConfirm }}" type="{{ pwType }}" placeholder="Confirm" style="flex:1;min-width:140px;padding:10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;outline:none;">
            <button onClick="{{ saveStaffPw }}" style="background:#2E4A3C;color:#F4EEE3;border:none;padding:9px 16px;cursor:pointer;font-size:13px;white-space:nowrap;" style-hover="background:#C1744E;">Update password</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</sc-if>
`;
