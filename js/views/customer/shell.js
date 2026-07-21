// customer/shell.js — customer dashboard: phone-style column (head + scrolling body +
// bottom nav Main/Order/History/Setting) hosting the four tab fragments.

import { custMainTab } from './main.js';
import { custOrderTab } from './order.js';
import { custHistoryTab } from './history.js';
import { custSettingTab } from './setting.js';

export const customer = `
<sc-if value="{{ isCustomer }}">
  <div class="cust-wrap">
    <div class="cust-head">
      <div>
        <div style="font-family:'Marcellus',serif;font-size:17px;letter-spacing:2px;">BLUE SEA CAFE</div>
        <div style="font-size:12px;color:#9DB3A6;">{{ custName }} · {{ custPhoneStr }}</div>
      </div>
      <button onClick="{{ goLanding }}" style="background:transparent;border:1px solid #56705F;color:#F4EEE3;padding:6px 14px;font-size:12px;cursor:pointer;border-radius:2px;">EXIT</button>
    </div>
    <div class="cust-body">
      ${custMainTab}
      ${custOrderTab}
      ${custHistoryTab}
      ${custSettingTab}
    </div>
    <div class="cnav">
      <button onClick="{{ goCMain }}" class="cnav-item {{ cMainCls }}">
        <svg class="cnav-ico" viewBox="0 0 24 24"><path d="M4 11 L12 4 L20 11"></path><path d="M6 10 V20 H18 V10"></path></svg>
        <span>Main</span>
      </button>
      <button onClick="{{ goCOrder }}" class="cnav-item {{ cOrderCls }}">
        <svg class="cnav-ico" viewBox="0 0 24 24"><path d="M6 8 H18 L17 20 H7 Z"></path><path d="M9 8 V6 A3 3 0 0 1 15 6 V8"></path></svg>
        <span>Order</span>
      </button>
      <button onClick="{{ goCHistory }}" class="cnav-item {{ cHistoryCls }}">
        <svg class="cnav-ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><path d="M12 8 V12 L15 14"></path></svg>
        <span>History</span>
      </button>
      <button onClick="{{ goCSetting }}" class="cnav-item {{ cSettingCls }}">
        <svg class="cnav-ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M12 3 V6 M12 18 V21 M3 12 H6 M18 12 H21 M5.6 5.6 L7.7 7.7 M16.3 16.3 L18.4 18.4 M18.4 5.6 L16.3 7.7 M7.7 16.3 L5.6 18.4"></path></svg>
        <span>Setting</span>
      </button>
    </div>
  </div>
</sc-if>
`;
