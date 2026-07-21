// login.js — staff sign-in card. Verbatim from the design.

export const login = `
<sc-if value="{{ isLogin }}">
  <div style="min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 80% 15%, rgba(86,112,95,.6), transparent 45%),radial-gradient(circle at 12% 88%, rgba(36,56,46,.9), transparent 55%),#2E4A3C;">
    <div style="background:rgba(251,248,241,.9);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.65);border-radius:20px;padding:44px 40px;width:360px;box-shadow:0 24px 60px rgba(0,0,0,.3);">
      <div style="text-align:center;font-family:'Marcellus',serif;font-size:22px;letter-spacing:3px;color:#2E4A3C;">BLUE SEA CAFE</div>
      <div style="text-align:center;font-size:13px;color:#7A8378;margin:6px 0 26px;">Staff sign in</div>
      <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">STAFF ID</div>
      <input value="{{ loginId }}" onChange="{{ setLoginId }}" placeholder="e.g. BS-001" style="width:100%;padding:11px 12px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:15px;margin-bottom:16px;outline:none;">
      <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">PIN</div>
      <input value="{{ loginPin }}" onChange="{{ setLoginPin }}" type="password" placeholder="••••" style="width:100%;padding:11px 12px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:15px;margin-bottom:20px;outline:none;">
      <button onClick="{{ doLogin }}" style="width:100%;background:#C1744E;color:#FBF8F1;border:none;padding:13px;font-size:15px;letter-spacing:1px;cursor:pointer;" style-hover="background:#A85F3D;">SIGN IN</button>
      <div style="text-align:center;margin-top:16px;font-size:13px;"><a href="#" onClick="{{ goLandingA }}">← Back to site</a></div>
    </div>
  </div>
</sc-if>
`;
