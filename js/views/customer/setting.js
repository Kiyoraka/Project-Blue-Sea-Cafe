// customer/setting.js — customer Setting tab: account info, change password, log out.

export const custSettingTab = `
<sc-if value="{{ cSetting }}">
  <div style="padding:20px;">
    <div style="font-family:'Marcellus',serif;font-size:22px;color:#2E4A3C;margin-bottom:14px;">Settings</div>
    <div style="background:rgba(251,248,241,.72);border:1px solid rgba(255,255,255,.85);border-radius:12px;padding:16px;margin-bottom:16px;">
      <div style="font-size:12px;color:#7A8378;letter-spacing:1px;">ACCOUNT</div>
      <div style="font-weight:500;margin-top:6px;">{{ custName }}</div>
      <div style="font-size:13px;color:#7A8378;">{{ custPhoneStr }}</div>
    </div>
    <div style="background:rgba(251,248,241,.72);border:1px solid rgba(255,255,255,.85);border-radius:12px;padding:16px;margin-bottom:16px;">
      <div style="font-weight:500;margin-bottom:12px;">Change password</div>
      <input value="{{ pwNew }}" onChange="{{ setPwNew }}" type="{{ pwType }}" placeholder="New password" style="width:100%;padding:10px 11px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;margin-bottom:10px;outline:none;">
      <input value="{{ pwConfirm }}" onChange="{{ setPwConfirm }}" type="{{ pwType }}" placeholder="Confirm password" style="width:100%;padding:10px 11px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;margin-bottom:12px;outline:none;">
      <button onClick="{{ savePw }}" style="width:100%;background:#2E4A3C;color:#F4EEE3;border:none;padding:11px;cursor:pointer;border-radius:6px;font-size:14px;" style-hover="background:#C1744E;">Update password</button>
    </div>
    <button onClick="{{ custLogout }}" style="width:100%;background:transparent;border:1px solid #CBBFA6;color:#2E4A3C;padding:12px;cursor:pointer;border-radius:6px;font-size:14px;" style-hover="border-color:#B05A4A;color:#B05A4A;">Log out</button>
  </div>
</sc-if>
`;
