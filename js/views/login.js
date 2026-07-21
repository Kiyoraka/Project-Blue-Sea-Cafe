// login.js — staff sign-in card. Verbatim from the design.

export const login = `
<sc-if value="{{ isLogin }}">
  <div style="min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 80% 15%, rgba(86,112,95,.6), transparent 45%),radial-gradient(circle at 12% 88%, rgba(36,56,46,.9), transparent 55%),#2E4A3C;">
    <div style="background:rgba(251,248,241,.9);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.65);border-radius:20px;padding:44px 40px;width:360px;box-shadow:0 24px 60px rgba(0,0,0,.3);">
      <div style="text-align:center;font-family:'Marcellus',serif;font-size:22px;letter-spacing:3px;color:#2E4A3C;">BLUE SEA CAFE</div>
      <div style="text-align:center;font-size:13px;color:#7A8378;margin:6px 0 26px;">Sign in</div>
      <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">PHONE OR EMAIL</div>
      <input value="{{ loginId }}" onChange="{{ setLoginId }}" placeholder="012-3456789 or you@email.com" style="width:100%;padding:11px 12px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:15px;margin-bottom:16px;outline:none;">
      <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">PASSWORD</div>
      <div style="position:relative;margin-bottom:20px;">
        <input value="{{ loginPin }}" onChange="{{ setLoginPin }}" type="{{ pwType }}" placeholder="Your password" style="width:100%;padding:11px 42px 11px 12px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:15px;outline:none;">
        <button onClick="{{ togglePw }}" type="button" title="Show or hide password" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:transparent;border:none;cursor:pointer;padding:4px;color:#7A8378;display:grid;place-items:center;" style-hover="color:#2E4A3C;">
          <sc-if value="{{ pwHidden }}">
            <svg width="20" height="20" viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;"><path d="M2 12 C4.5 6.5 8 4.5 12 4.5 C16 4.5 19.5 6.5 22 12 C19.5 17.5 16 19.5 12 19.5 C8 19.5 4.5 17.5 2 12 Z"></path><circle cx="12" cy="12" r="3.2"></circle></svg>
          </sc-if>
          <sc-if value="{{ pwVisible }}">
            <svg width="20" height="20" viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;"><path d="M2 12 C4.5 6.5 8 4.5 12 4.5 C16 4.5 19.5 6.5 22 12 C19.5 17.5 16 19.5 12 19.5 C8 19.5 4.5 17.5 2 12 Z"></path><circle cx="12" cy="12" r="3.2"></circle><path d="M4 4 L20 20"></path></svg>
          </sc-if>
        </button>
      </div>
      <button onClick="{{ doLogin }}" style="width:100%;background:#C1744E;color:#FBF8F1;border:none;padding:13px;font-size:15px;letter-spacing:1px;cursor:pointer;" style-hover="background:#A85F3D;">SIGN IN</button>
      <div style="text-align:center;margin-top:16px;font-size:13px;"><a href="#" onClick="{{ goLandingA }}">← Back to site</a></div>
    </div>
  </div>
</sc-if>
`;
