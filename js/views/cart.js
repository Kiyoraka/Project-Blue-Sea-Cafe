// cart.js — inline ordering cart. One shared panel styled per device via CSS:
// a right-side drawer on desktop, a full-page view on mobile (slides in from the
// right, no sheet/backdrop). Opened from the mobile bottom-nav Cart tab or, on
// desktop, whenever the cart has items. Always mounted; classes toggle so CSS
// transitions animate it. Replaces the old full-page order view.

export const cart = `
<div class="cart-backdrop {{ cartPanelClass }}" onClick="{{ closeCart }}"></div>
<div class="cart-panel {{ cartPanelClass }}">
  <div class="cart-panel-head">
    <div>
      <div style="font-family:'Marcellus',serif;font-size:20px;letter-spacing:1px;color:#2E4A3C;">Your order</div>
      <div style="font-size:12.5px;color:#7A8378;">Blue Sea Cafe · online</div>
    </div>
    <button onClick="{{ closeCart }}" class="cart-close" title="Close">×</button>
  </div>
  <div class="cart-panel-body">
    <sc-if value="{{ hasCart }}">
      <sc-for list="{{ cartList }}" as="l">
        <div style="display:flex;align-items:center;gap:10px;padding:9px 0;font-size:14px;border-bottom:1px solid #F0EADB;">
          <button onClick="{{ l.dec }}" style="width:26px;height:26px;border:1px solid #E3DCCB;background:#FBF8F1;cursor:pointer;border-radius:6px;">−</button>
          <span style="width:18px;text-align:center;font-weight:600;">{{ l.qty }}</span>
          <button onClick="{{ l.inc }}" style="width:26px;height:26px;border:1px solid #E3DCCB;background:#FBF8F1;cursor:pointer;border-radius:6px;">+</button>
          <span style="flex:1;">{{ l.name }}</span>
          <span style="color:#7A8378;">{{ l.subStr }}</span>
        </div>
      </sc-for>
    </sc-if>
    <sc-if value="{{ cartEmpty }}">
      <div style="color:#B8B0A0;font-size:14px;padding:40px 10px;text-align:center;line-height:1.6;">Your cart is empty.<br>Tap + on any menu item to add it.</div>
    </sc-if>
  </div>
  <div class="cart-panel-foot">
    <sc-if value="{{ isGuest }}">
      <div style="display:flex;gap:8px;margin-bottom:10px;">
        <input value="{{ guestName }}" onChange="{{ setGuestName }}" placeholder="Your name" style="flex:1;min-width:0;padding:10px 11px;border:1px solid #E3DCCB;background:#FBF8F1;font-size:14px;border-radius:6px;outline:none;">
        <input value="{{ guestPhone }}" onChange="{{ setGuestPhone }}" placeholder="Phone e.g. 012-3456789" style="flex:1;min-width:0;padding:10px 11px;border:1px solid #E3DCCB;background:#FBF8F1;font-size:14px;border-radius:6px;outline:none;">
      </div>
    </sc-if>
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <sc-for list="{{ payOptions }}" as="p">
        <button onClick="{{ p.pick }}" style="flex:1;padding:9px 4px;font-size:12.5px;border:1px solid {{ p.bd }};background:{{ p.bg }};color:{{ p.fg }};cursor:pointer;border-radius:6px;">{{ p.name }}</button>
      </sc-for>
    </div>
    <button onClick="{{ placeOrder }}" style="width:100%;background:#C1744E;color:#FBF8F1;border:none;padding:14px;font-size:15px;letter-spacing:1px;cursor:pointer;border-radius:8px;" style-hover="background:#A85F3D;">PLACE ORDER · {{ cartTotalStr }}</button>
  </div>
</div>
`;
