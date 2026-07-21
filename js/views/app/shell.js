// app/shell.js — staff app: sidebar nav + content area hosting the 6 tabs.

import { mainTab } from './main.js';
import { analysisTab } from './analysis.js';
import { productTab } from './product.js';
import { orderTab } from './order.js';
import { posTab } from './pos.js';
import { customerTab } from './customer.js';
import { settingTab } from './setting.js';

export const appView = `
<sc-if value="{{ isApp }}">
  <div style="display:flex;min-height:100vh;">
    <div style="width:220px;background:linear-gradient(180deg,#2E4A3C,#24382E);color:#F4EEE3;display:flex;flex-direction:column;flex-shrink:0;">
      <div style="padding:22px 20px;border-bottom:1px solid #3D5A4B;">
        <div style="font-family:'Marcellus',serif;font-size:17px;letter-spacing:2px;">BLUE SEA CAFE</div>
        <div style="font-size:12px;color:#9DB3A6;margin-top:4px;">Signed in · {{ staffId }}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:2px;padding:14px 10px;flex:1;">
        <sc-for list="{{ navItems }}" as="n">
          <button onClick="{{ n.go }}" style="text-align:left;background:{{ n.bg }};color:{{ n.fg }};border:none;padding:11px 14px;font-size:14px;letter-spacing:.5px;cursor:pointer;border-radius:4px;display:flex;justify-content:space-between;" style-hover="background:#3D5A4B;"><span>{{ n.label }}</span><span style="font-size:12px;color:#C1744E;">{{ n.badge }}</span></button>
        </sc-for>
      </div>
      <button onClick="{{ logout }}" style="margin:14px;background:transparent;border:1px solid #56705F;color:#9DB3A6;padding:10px;cursor:pointer;font-size:13px;border-radius:4px;" style-hover="color:#F4EEE3;">Log out</button>
    </div>
    <div style="flex:1;padding:28px 34px;overflow:auto;background:radial-gradient(circle at 92% 0%, rgba(86,112,95,.12), transparent 40%),radial-gradient(circle at 0% 100%, rgba(193,116,78,.1), transparent 45%),#F4EEE3;">
      ${mainTab}
      ${analysisTab}
      ${productTab}
      ${orderTab}
      ${posTab}
      ${customerTab}
      ${settingTab}
    </div>
  </div>
</sc-if>
`;
