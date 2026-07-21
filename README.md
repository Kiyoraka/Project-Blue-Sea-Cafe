# Blue Sea Cafe

A cafe webapp — public site, customer QR ordering, staff login, and a staff
back-office (dashboard, sales analysis, product CRUD, order queue, POS with SST +
VIP tabs, settings). Built as standalone **vanilla HTML + CSS + JS**, reproduced
1:1 from the Claude Design prototype `Blue Sea Cafe.dc.html`.

## Run

The app uses ES modules, so it must be served over HTTP (opening `index.html`
directly via `file://` is blocked by the browser's module CORS policy). From this
folder:

```
python -m http.server 8177
```

then open <http://localhost:8177/index.html>. Any static server works (VS Code
Live Server, `npx serve`, nginx, etc.).

## Try it

- **Public site**: hero, menu, our story, and Track Order (type a phone number, hit
  TRACK for the progress stepper).
- **ORDER ONLINE**: customer QR flow — pick items, adjust the cart, choose a payment
  method, place the order.
- **STAFF**: sign in (any ID, or leave blank for `BS-001`) to reach the back-office.
  Advance live orders, edit products, ring up sales in POS (SST + VIP tabs), and
  tune settings.

## Structure

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full app map, file layout, and how
the reactive engine works. In short:

- `index.html` — shell (fonts, CSS, mount point, module entry)
- `css/base.css` — base + shared styles; `css/mobile.css` — responsive `@media` layer
- `js/engine.js` — a tiny dependency-free reactive engine
- `js/data.js` / `js/logic.js` — seed state + view-model
- `js/views/**` — one template module per view / staff tab
- `js/main.js` — composes the root template and mounts
- `images/` — cafe photos

No build step, no dependencies.
