// app/shell.js — staff app: sidebar with collapsible dropdown groups + content area.
// Top-level: Main, Analysis, Setting. Operations group: Product/Order/POS/Dashboard.
// People group: Customer/Staff.

import { mainTab } from './main.js';
import { analysisTab } from './analysis.js';
import { productTab } from './product.js';
import { orderTab } from './order.js';
import { posTab } from './pos.js';
import { dashboardTab } from './dashboard.js';
import { customerTab } from './customer.js';
import { staffTab } from './staff.js';
import { settingTab } from './setting.js';

const item = (nav, label, badge) => `
  <button onClick="{{ ${nav}.go }}" style="text-align:left;background:{{ ${nav}.bg }};color:{{ ${nav}.fg }};border:none;padding:11px 14px;font-size:14px;letter-spacing:.5px;cursor:pointer;border-radius:4px;display:flex;justify-content:space-between;align-items:center;" style-hover="background:#3D5A4B;"><span>${label}</span>${badge ? `<span style="font-size:12px;color:#C1744E;">{{ ${badge} }}</span>` : ''}</button>`;

const sub = (nav, label, badge) => `
  <button onClick="{{ ${nav}.go }}" style="text-align:left;background:{{ ${nav}.bg }};color:{{ ${nav}.fg }};border:none;padding:10px 14px 10px 28px;font-size:13.5px;letter-spacing:.5px;cursor:pointer;border-radius:4px;display:flex;justify-content:space-between;align-items:center;" style-hover="background:#3D5A4B;"><span>${label}</span>${badge ? `<span style="font-size:12px;color:#C1744E;">{{ ${badge} }}</span>` : ''}</button>`;

const groupHead = (toggle, label, chevron) => `
  <button onClick="{{ ${toggle} }}" style="text-align:left;background:transparent;color:#9DB3A6;border:none;padding:14px 14px 6px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;display:flex;justify-content:space-between;align-items:center;"><span>${label}</span><span style="font-size:11px;">{{ ${chevron} }}</span></button>`;

export const appView = `
<sc-if value="{{ isApp }}">
  <div style="display:flex;min-height:100vh;">
    <div style="width:220px;background:linear-gradient(180deg,#2E4A3C,#24382E);color:#F4EEE3;display:flex;flex-direction:column;flex-shrink:0;">
      <div style="padding:22px 20px;border-bottom:1px solid #3D5A4B;">
        <div style="font-family:'Marcellus',serif;font-size:17px;letter-spacing:2px;">BLUE SEA CAFE</div>
        <div style="font-size:12px;color:#9DB3A6;margin-top:4px;">Signed in · {{ staffId }}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:2px;padding:14px 10px;flex:1;">
        ${item('navMain', 'Main')}
        ${item('navAnalysis', 'Analysis')}
        ${groupHead('toggleOps', 'Operations', 'opsChevron')}
        <sc-if value="{{ opsOpen }}">
          ${sub('navProduct', 'Product')}
          ${sub('navOrder', 'Order', 'orderBadge')}
          ${sub('navPos', 'POS')}
          ${sub('navDashboard', 'Dashboard')}
        </sc-if>
        ${groupHead('togglePeople', 'People', 'peopleChevron')}
        <sc-if value="{{ peopleOpen }}">
          ${sub('navCustomer', 'Customer')}
          ${sub('navStaff', 'Staff')}
        </sc-if>
        ${item('navSetting', 'Setting')}
      </div>
      <button onClick="{{ logout }}" style="margin:14px;background:transparent;border:1px solid #56705F;color:#9DB3A6;padding:10px;cursor:pointer;font-size:13px;border-radius:4px;" style-hover="color:#F4EEE3;">Log out</button>
    </div>
    <div style="flex:1;padding:28px 34px;overflow:auto;background:radial-gradient(circle at 92% 0%, rgba(86,112,95,.12), transparent 40%),radial-gradient(circle at 0% 100%, rgba(193,116,78,.1), transparent 45%),#F4EEE3;">
      ${mainTab}
      ${analysisTab}
      ${productTab}
      ${orderTab}
      ${posTab}
      ${dashboardTab}
      ${customerTab}
      ${staffTab}
      ${settingTab}
    </div>
  </div>
</sc-if>
`;
