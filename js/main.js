// main.js — compose the root template from view fragments, define the two design
// props (verbatim defaults), and mount the app.

import { createApp } from './engine.js';
import { initialState } from './data.js';
import { renderVals } from './logic.js';
import { landing } from './views/landing.js';
import { cart } from './views/cart.js';
import { login } from './views/login.js';
import { appView } from './views/app/shell.js';
import { editModal, toast } from './views/modals.js';

// Design props (data-props defaults from the source): deliveryRadiusKm=5, sstPercent=6.
const props = { deliveryRadiusKm: 5, sstPercent: 6 };

const template = `
<div style="min-height:100vh;background:#F4EEE3;">
  ${landing}
  ${cart}
  ${login}
  ${appView}
  ${editModal}
  ${toast}
</div>
`;

createApp({
  root: document.getElementById('app'),
  template,
  state: initialState,
  props,
  getVals: renderVals,
});
