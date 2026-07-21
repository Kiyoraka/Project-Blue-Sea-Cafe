// modals.js — edit-product modal + global toast. Verbatim from the design.

export const editModal = `
<sc-if value="{{ editing }}">
  <div style="position:fixed;inset:0;background:rgba(42,51,44,.5);backdrop-filter:blur(6px);display:grid;place-items:center;z-index:50;">
    <div style="background:rgba(251,248,241,.92);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.7);border-radius:18px;padding:30px;width:400px;box-shadow:0 24px 60px rgba(0,0,0,.3);">
      <div style="font-family:'Marcellus',serif;font-size:22px;color:#2E4A3C;margin-bottom:18px;">Edit product</div>
      <div style="height:110px;border-radius:4px;background:#F4EEE3;border:1px dashed #C9BFA8;display:grid;place-items:center;color:#9A9078;font-size:13px;margin-bottom:16px;">Product photo — click to upload</div>
      <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">NAME</div>
      <input value="{{ editName }}" onChange="{{ setEditName }}" style="width:100%;padding:10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;margin-bottom:14px;outline:none;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
        <div>
          <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">PRICE (RM)</div>
          <input type="number" value="{{ editPrice }}" onChange="{{ setEditPrice }}" style="width:100%;padding:10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;outline:none;">
        </div>
        <div>
          <div style="font-size:12.5px;letter-spacing:1px;color:#7A8378;margin-bottom:6px;">STATION</div>
          <select value="{{ editStation }}" onChange="{{ setEditStation }}" style="width:100%;padding:10px;border:1px solid #E3DCCB;background:#F4EEE3;font-size:14px;">
            <option>Barista</option><option>Kitchen</option>
          </select>
        </div>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button onClick="{{ closeEdit }}" style="border:1px solid #E3DCCB;background:#FBF8F1;padding:10px 18px;cursor:pointer;font-size:14px;">Cancel</button>
        <button onClick="{{ saveEdit }}" style="background:#C1744E;color:#FBF8F1;border:none;padding:10px 22px;cursor:pointer;font-size:14px;" style-hover="background:#A85F3D;">Save</button>
      </div>
    </div>
  </div>
</sc-if>
`;

export const toast = `
<sc-if value="{{ hasToast }}">
  <div style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(46,74,60,.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.18);color:#F4EEE3;padding:12px 24px;border-radius:4px;box-shadow:0 10px 30px rgba(0,0,0,.25);font-size:14px;z-index:60;">{{ toastMsg }}</div>
</sc-if>
`;
