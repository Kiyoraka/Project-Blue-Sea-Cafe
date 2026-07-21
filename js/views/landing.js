// landing.js — public marketing site (nav, hero, ticker, menu, about, track, footer).
// Verbatim from the design; <image-slot> replaced with <img>.

export const landing = `
<sc-if value="{{ isLanding }}">
  <div id="home">
    <div class="nav-pad" style="position:sticky;top:0;z-index:40;display:flex;justify-content:space-between;align-items:center;padding:14px 48px;background:rgba(251,248,241,.92);backdrop-filter:blur(10px);border-bottom:1px solid #E3DCCB;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:38px;height:38px;border-radius:50% 50% 4px 50%;background:#2E4A3C;display:grid;place-items:center;font-family:'Marcellus',serif;font-size:19px;color:#F4EEE3;">B</div>
        <div>
          <div style="font-family:'Marcellus',serif;font-size:18px;letter-spacing:3px;color:#2E4A3C;">BLUE SEA CAFE</div>
          <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;color:#C1744E;margin-top:-2px;">caffeine, sourdough &amp; pastries</div>
        </div>
      </div>
      <div class="nav-links" style="display:flex;gap:32px;align-items:center;font-size:13.5px;letter-spacing:2px;">
        <a href="#home" style="color:#2E4A3C;padding-bottom:2px;border-bottom:1.5px solid transparent;" style-hover="color:#C1744E;border-bottom-color:#C1744E;">HOME</a>
        <a href="#menu" style="color:#2E4A3C;padding-bottom:2px;border-bottom:1.5px solid transparent;" style-hover="color:#C1744E;border-bottom-color:#C1744E;">MENU</a>
        <a href="#about" style="color:#2E4A3C;padding-bottom:2px;border-bottom:1.5px solid transparent;" style-hover="color:#C1744E;border-bottom-color:#C1744E;">ABOUT</a>
        <a href="#track" style="color:#2E4A3C;padding-bottom:2px;border-bottom:1.5px solid transparent;" style-hover="color:#C1744E;border-bottom-color:#C1744E;">TRACK ORDER</a>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <button onClick="{{ goMenu }}" class="nav-cta" style="background:#C1744E;border:none;color:#FBF8F1;padding:11px 24px;letter-spacing:1.5px;cursor:pointer;font-size:13px;border-radius:999px;transition:transform .2s,background .2s;" style-hover="background:#A85F3D;transform:translateY(-1px);">ORDER ONLINE</button>
        <button onClick="{{ goLogin }}" style="background:transparent;border:1px solid #CBBFA6;color:#2E4A3C;padding:10px 18px;letter-spacing:1.5px;cursor:pointer;font-size:13px;border-radius:999px;" style-hover="border-color:#2E4A3C;">STAFF</button>
      </div>
    </div>
    <div class="hero-grid" style="display:grid;grid-template-columns:1.15fr 1fr;min-height:calc(100vh - 68px);">
      <div class="hero-left" style="background:radial-gradient(circle at 88% 12%, rgba(86,112,95,.55), transparent 45%),radial-gradient(circle at 5% 95%, rgba(36,56,46,.9), transparent 55%),#2E4A3C;padding:90px 76px 64px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;">
        <div style="position:absolute;top:40px;right:48px;color:#C1744E;font-size:26px;animation:fadeUp 1s .8s both;">✦</div>
        <div style="position:absolute;bottom:130px;left:36px;color:#56705F;font-size:15px;animation:fadeUp 1s 1s both;">✦</div>
        <div style="display:flex;align-items:center;gap:12px;animation:fadeUp .7s both;">
          <svg width="32" height="24" viewBox="0 0 42 30" style="flex-shrink:0;"><path d="M21 28 C21 16 21 10 21 4" stroke="#C1744E" stroke-width="1.6" fill="none"></path><path d="M21 15 C14 13 9 8 8 2 C15 3 20 8 21 15" fill="#56705F"></path><path d="M21 15 C28 13 33 8 34 2 C27 3 22 8 21 15" fill="#C1744E"></path></svg>
          <div style="font-size:13px;letter-spacing:5px;color:#C89B7B;">EST. 2022 · KUALA LUMPUR</div>
        </div>
        <div style="font-family:'Marcellus',serif;font-size:clamp(52px,6.2vw,96px);line-height:1.02;color:#F4EEE3;margin:26px 0 4px;animation:fadeUp .8s .1s both;">Slow mornings,</div>
        <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(56px,6.8vw,104px);line-height:1;color:#C1744E;animation:fadeUp .8s .22s both;">good coffee.</div>
        <div style="font-size:17px;color:#9DB3A6;line-height:1.7;max-width:440px;margin-top:26px;animation:fadeUp .8s .34s both;">Caffeine, sourdough &amp; pastries by the blue sea. Scan the QR at your table, order online, or let us ride it over to you.</div>
        <div style="display:flex;gap:14px;margin-top:36px;flex-wrap:wrap;animation:fadeUp .8s .46s both;">
          <button onClick="{{ goMenu }}" style="background:#C1744E;color:#FBF8F1;border:none;padding:16px 34px;font-size:14px;letter-spacing:2px;cursor:pointer;border-radius:999px;transition:transform .2s,background .2s;" style-hover="background:#A85F3D;transform:translateY(-2px);">ORDER ONLINE →</button>
          <a href="#menu" style="display:inline-block;color:#F4EEE3;border:1px solid #56705F;padding:15px 34px;font-size:14px;letter-spacing:2px;border-radius:999px;transition:border-color .2s;" style-hover="border-color:#C1744E;color:#F4EEE3;">SEE THE MENU</a>
        </div>
        <div class="stat-row" style="display:flex;gap:40px;margin-top:52px;background:rgba(251,248,241,.08);backdrop-filter:blur(10px);border:1px solid rgba(251,248,241,.16);border-radius:18px;padding:22px 28px;width:fit-content;flex-wrap:wrap;animation:fadeUp .8s .58s both;">
          <div><div style="font-family:'Marcellus',serif;font-size:20px;color:#F4EEE3;">QR at table</div><div style="font-size:13px;color:#9DB3A6;">scan, order, relax</div></div>
          <div><div style="font-family:'Marcellus',serif;font-size:20px;color:#F4EEE3;">5 KM delivery</div><div style="font-size:13px;color:#9DB3A6;">in-house riders</div></div>
          <div><div style="font-family:'Marcellus',serif;font-size:20px;color:#F4EEE3;">VIP tabs</div><div style="font-size:13px;color:#9DB3A6;">buy now, pay later</div></div>
        </div>
      </div>
      <div class="hero-right" style="background:radial-gradient(circle at 18% 18%, rgba(224,158,120,.6), transparent 50%),radial-gradient(circle at 90% 90%, rgba(138,78,49,.55), transparent 55%),#C1744E;display:grid;place-items:center;padding:56px;position:relative;">
        <div style="position:absolute;top:44px;left:44px;color:#F4EEE3;font-size:22px;animation:fadeUp 1s .9s both;">✦</div>
        <div style="position:absolute;bottom:40px;right:48px;color:#8A4E31;font-size:16px;animation:fadeUp 1s 1.1s both;">✦</div>
        <div style="position:relative;animation:fadeUp .9s .3s both;">
          <div style="width:min(340px,72vw);height:460px;border-radius:999px 999px 18px 18px;overflow:hidden;border:8px solid #FBF8F1;box-shadow:0 30px 70px rgba(42,51,44,.35);position:relative;">
            <img src="images/hero.png" alt="Blue Sea Cafe" style="width:100%;height:100%;object-fit:cover;display:block;">
          </div>
          <div style="position:absolute;top:-34px;right:-42px;width:110px;height:110px;pointer-events:none;">
            <svg viewBox="0 0 100 100" style="width:100%;height:100%;animation:spinSlow 16s linear infinite;">
              <defs><path id="circ" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"></path></defs>
              <circle cx="50" cy="50" r="50" fill="#2E4A3C"></circle>
              <text style="font-size:10.5px;letter-spacing:2.5px;fill:#F4EEE3;font-family:'Jost',sans-serif;"><textPath href="#circ">EST 2022 · BLUE SEA CAFE · KL ·</textPath></text>
            </svg>
            <div style="position:absolute;inset:0;display:grid;place-items:center;color:#C1744E;font-size:20px;">✦</div>
          </div>
          <div style="position:absolute;bottom:30px;left:-54px;background:rgba(251,248,241,.35);backdrop-filter:blur(14px);border:1px solid rgba(251,248,241,.55);border-radius:999px;padding:11px 20px;display:flex;align-items:center;gap:10px;box-shadow:0 14px 34px rgba(42,51,44,.22);animation:fadeUp 1s .7s both;">
            <svg width="24" height="18" viewBox="0 0 42 30" style="flex-shrink:0;"><path d="M21 28 C21 16 21 10 21 4" stroke="#2E4A3C" stroke-width="2" fill="none"></path><path d="M21 15 C14 13 9 8 8 2 C15 3 20 8 21 15" fill="#2E4A3C"></path><path d="M21 15 C28 13 33 8 34 2 C27 3 22 8 21 15" fill="#8A4E31"></path></svg>
            <div style="font-size:12px;letter-spacing:1.5px;color:#3B2416;font-weight:600;white-space:nowrap;">GARDEN SEATING · UNDER THE GREENERY</div>
          </div>
        </div>
      </div>
    </div>
    <div style="background:#24382E;overflow:hidden;padding:16px 0;border-top:1px solid #3D5A4B;">
      <div style="display:flex;width:max-content;animation:drift 26s linear infinite;gap:0;">
        <div style="display:flex;gap:36px;padding-right:36px;font-family:'Marcellus',serif;font-size:19px;letter-spacing:3px;color:#F4EEE3;white-space:nowrap;align-items:center;">
          <span>FRESH SOURDOUGH</span><span style="color:#C1744E;">✦</span><span>SINGLE-ORIGIN ESPRESSO</span><span style="color:#C1744E;">✦</span><span>QR TABLE ORDERING</span><span style="color:#C1744E;">✦</span><span>DELIVERY WITHIN 5 KM</span><span style="color:#C1744E;">✦</span><span>BURNT CHEESECAKE</span><span style="color:#C1744E;">✦</span>
        </div>
        <div style="display:flex;gap:36px;padding-right:36px;font-family:'Marcellus',serif;font-size:19px;letter-spacing:3px;color:#F4EEE3;white-space:nowrap;align-items:center;">
          <span>FRESH SOURDOUGH</span><span style="color:#C1744E;">✦</span><span>SINGLE-ORIGIN ESPRESSO</span><span style="color:#C1744E;">✦</span><span>QR TABLE ORDERING</span><span style="color:#C1744E;">✦</span><span>DELIVERY WITHIN 5 KM</span><span style="color:#C1744E;">✦</span><span>BURNT CHEESECAKE</span><span style="color:#C1744E;">✦</span>
        </div>
      </div>
    </div>
    <div id="menu" class="sec-pad" style="background:radial-gradient(circle at 10% 20%, rgba(86,112,95,.16), transparent 42%),radial-gradient(circle at 92% 75%, rgba(193,116,78,.14), transparent 45%),#F4EEE3;padding:96px 64px;">
      <div class="sec-head" style="display:flex;justify-content:space-between;align-items:flex-end;max-width:1040px;margin:0 auto 48px;gap:20px;">
        <div>
          <div style="display:flex;align-items:center;gap:10px;"><svg width="28" height="21" viewBox="0 0 42 30"><path d="M21 28 C21 16 21 10 21 4" stroke="#C1744E" stroke-width="1.8" fill="none"></path><path d="M21 15 C14 13 9 8 8 2 C15 3 20 8 21 15" fill="#56705F"></path><path d="M21 15 C28 13 33 8 34 2 C27 3 22 8 21 15" fill="#C1744E"></path></svg><div style="font-size:13px;letter-spacing:5px;color:#C1744E;">N°01 — MENU</div></div>
          <div style="font-family:'Marcellus',serif;font-size:clamp(38px,4.6vw,64px);color:#2E4A3C;line-height:1.05;margin-top:10px;">From our counter</div>
        </div>
        <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:#7A8378;padding-bottom:8px;">all day, every day (except Mondays)</div>
      </div>
      <div class="menu-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:44px;max-width:1040px;margin:0 auto;">
        <sc-for list="{{ menuGroups }}" as="g">
          <div class="menu-card" style="background:rgba(251,248,241,.62);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:42px 44px;transition:box-shadow .25s,transform .25s;" style-hover="box-shadow:0 22px 50px rgba(42,51,44,.12);transform:translateY(-4px);">
            <div style="display:flex;align-items:baseline;justify-content:space-between;">
              <div style="font-family:'Marcellus',serif;font-size:25px;letter-spacing:2px;color:#2E4A3C;">{{ g.title }}</div>
              <div style="color:#C1744E;font-size:17px;">✦</div>
            </div>
            <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:17px;color:#C1744E;margin:4px 0 22px;">{{ g.tagline }}</div>
            <sc-for list="{{ g.rows }}" as="r">
              <div style="display:flex;align-items:center;gap:12px;padding:10px 8px;margin:0 -8px;border-radius:6px;transition:background .2s;" style-hover="background:#F4EEE3;">
                <div style="font-size:16.5px;font-weight:500;color:#2A332C;white-space:nowrap;flex-shrink:0;">{{ r.name }}</div>
                <div style="flex:1;border-bottom:1.5px dotted #C9BFA8;"></div>
                <div style="color:#C1744E;font-weight:600;">{{ r.priceStr }}</div>
                <button onClick="{{ r.add }}" title="Add to cart" style="width:28px;height:28px;flex-shrink:0;border-radius:50%;border:none;background:#2E4A3C;color:#F4EEE3;font-size:16px;line-height:1;cursor:pointer;transition:background .2s,transform .2s;" style-hover="background:#C1744E;transform:scale(1.08);">+</button>
              </div>
            </sc-for>
          </div>
        </sc-for>
      </div>
      <div style="text-align:center;margin-top:48px;">
        <button onClick="{{ openCart }}" style="background:#2E4A3C;color:#F4EEE3;border:none;padding:16px 36px;font-size:14px;letter-spacing:2px;cursor:pointer;border-radius:999px;transition:background .2s,transform .2s;" style-hover="background:#C1744E;transform:translateY(-2px);">REVIEW MY ORDER →</button>
        <div style="font-size:13px;color:#7A8378;margin-top:12px;">tap + on any item to add it to your cart</div>
      </div>
    </div>
    <div id="about" class="sec-pad" style="background:radial-gradient(circle at 88% 15%, rgba(86,112,95,.13), transparent 42%),radial-gradient(circle at 6% 85%, rgba(193,116,78,.12), transparent 45%),#FBF8F1;padding:96px 64px;">
      <div style="max-width:1100px;margin:0 auto 44px;display:flex;align-items:center;gap:10px;">
        <svg width="28" height="21" viewBox="0 0 42 30"><path d="M21 28 C21 16 21 10 21 4" stroke="#C1744E" stroke-width="1.8" fill="none"></path><path d="M21 15 C14 13 9 8 8 2 C15 3 20 8 21 15" fill="#56705F"></path><path d="M21 15 C28 13 33 8 34 2 C27 3 22 8 21 15" fill="#C1744E"></path></svg>
        <div style="font-size:13px;letter-spacing:5px;color:#C1744E;">N°02 — OUR STORY</div>
      </div>
      <div class="about-grid" style="display:grid;grid-template-columns:1fr 1.1fr;gap:64px;max-width:1100px;margin:0 auto;align-items:center;">
        <div class="about-img" style="height:420px;border-radius:18px 120px 18px 18px;overflow:hidden;box-shadow:0 24px 60px rgba(42,51,44,.18);">
          <img src="images/about.png" alt="Inside Blue Sea Cafe" style="width:100%;height:100%;object-fit:cover;display:block;">
        </div>
        <div>
          <div style="font-family:'Marcellus',serif;font-size:clamp(34px,4vw,52px);line-height:1.1;color:#2E4A3C;margin:0 0 8px;">A little cafe by the sea, <span style="font-family:'Cormorant Garamond',serif;font-style:italic;color:#C1744E;">since 2022</span></div>
          <div style="font-size:16px;color:#7A8378;line-height:1.75;">We bake our sourdough before sunrise, pull every shot to order, and keep the plants very happy. Dine in under the greenery, order from your table with a QR scan, or let our riders bring it to you — anywhere within 5&nbsp;KM.</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:30px;">
            <div style="background:rgba(244,238,227,.7);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.9);border-left:3px solid #C1744E;border-radius:14px;padding:16px 18px;">
              <div style="font-weight:600;font-size:14px;letter-spacing:1px;color:#2E4A3C;">HOURS</div>
              <div style="font-size:14px;color:#7A8378;margin-top:6px;line-height:1.7;">Tue – Sun · 8am – 9pm<br>Closed Mondays</div>
            </div>
            <div style="background:rgba(244,238,227,.7);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.9);border-left:3px solid #C1744E;border-radius:14px;padding:16px 18px;">
              <div style="font-weight:600;font-size:14px;letter-spacing:1px;color:#2E4A3C;">FIND US</div>
              <div style="font-size:14px;color:#7A8378;margin-top:6px;line-height:1.7;">12, Jalan Pantai 3,<br>Kuala Lumpur</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="track" class="sec-pad" style="background:radial-gradient(circle at 85% 20%, rgba(86,112,95,.6), transparent 45%),radial-gradient(circle at 10% 90%, rgba(36,56,46,.9), transparent 55%),#2E4A3C;padding:96px 64px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:52px;left:8%;color:#3D5A4B;font-size:26px;">✦</div>
      <div style="position:absolute;bottom:64px;right:10%;color:#C1744E;font-size:18px;">✦</div>
      <div style="max-width:580px;margin:0 auto;text-align:center;">
        <div style="display:flex;align-items:center;justify-content:center;gap:10px;"><svg width="28" height="21" viewBox="0 0 42 30"><path d="M21 28 C21 16 21 10 21 4" stroke="#C1744E" stroke-width="1.8" fill="none"></path><path d="M21 15 C14 13 9 8 8 2 C15 3 20 8 21 15" fill="#9DB3A6"></path><path d="M21 15 C28 13 33 8 34 2 C27 3 22 8 21 15" fill="#C1744E"></path></svg><div style="font-size:13px;letter-spacing:5px;color:#C1744E;">N°03 — TRACK ORDER</div></div>
        <div style="font-family:'Marcellus',serif;font-size:clamp(34px,4vw,52px);color:#F4EEE3;margin:12px 0 6px;">Where's my coffee?</div>
        <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:21px;color:#9DB3A6;margin-bottom:28px;">enter the phone number you ordered with</div>
        <div style="display:flex;gap:10px;background:rgba(251,248,241,.82);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.55);padding:8px;border-radius:999px;box-shadow:0 20px 50px rgba(0,0,0,.25);">
          <input value="{{ trackPhone }}" onChange="{{ setTrackPhone }}" placeholder="Phone number e.g. 012-3456789" style="flex:1;padding:12px 20px;border:none;background:transparent;font-size:15px;outline:none;min-width:0;">
          <button onClick="{{ doTrack }}" style="background:#C1744E;color:#FBF8F1;border:none;padding:13px 30px;font-size:14px;letter-spacing:1.5px;cursor:pointer;border-radius:999px;transition:background .2s;" style-hover="background:#A85F3D;">TRACK</button>
        </div>
        <sc-if value="{{ trackFound }}">
          <div style="background:#FBF8F1;margin-top:26px;padding:28px;text-align:left;border-radius:16px;animation:fadeUp .5s both;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <div style="font-weight:600;font-size:16px;color:#2E4A3C;">Order {{ trackId }}</div>
              <div style="font-size:13px;color:#7A8378;">{{ trackSrc }}</div>
            </div>
            <div style="font-size:14px;color:#7A8378;margin:6px 0 22px;">{{ trackItems }}</div>
            <div style="display:flex;align-items:center;">
              <sc-for list="{{ trackSteps }}" as="st">
                <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;position:relative;">
                  <div style="width:100%;height:3px;background:{{ st.lineBg }};position:absolute;top:9px;left:-50%;"></div>
                  <div style="width:21px;height:21px;border-radius:50%;background:{{ st.dotBg }};border:3px solid #FBF8F1;position:relative;z-index:1;box-shadow:0 0 0 1px {{ st.dotBg }};"></div>
                  <div style="font-size:12px;letter-spacing:.5px;color:{{ st.fg }};font-weight:{{ st.weight }};">{{ st.label }}</div>
                </div>
              </sc-for>
            </div>
          </div>
        </sc-if>
        <sc-if value="{{ trackNone }}">
          <div style="background:#3D5A4B;color:#C9D6CC;margin-top:26px;padding:16px;font-size:14px;border-radius:12px;animation:fadeUp .5s both;">No active order found for that number — try placing one first</div>
        </sc-if>
      </div>
    </div>
    <div style="background:#24382E;color:#9DB3A6;padding:40px 0 28px;overflow:hidden;">
      <div style="text-align:center;margin-bottom:14px;"><svg width="34" height="26" viewBox="0 0 42 30"><path d="M21 28 C21 16 21 10 21 4" stroke="#C1744E" stroke-width="1.8" fill="none"></path><path d="M21 15 C14 13 9 8 8 2 C15 3 20 8 21 15" fill="#3D5A4B"></path><path d="M21 15 C28 13 33 8 34 2 C27 3 22 8 21 15" fill="#C1744E"></path></svg></div>
      <div style="font-family:'Marcellus',serif;font-size:clamp(32px,5.5vw,72px);line-height:1;letter-spacing:6px;color:#2E4A3C;white-space:nowrap;text-align:center;margin-bottom:32px;user-select:none;">BLUE SEA CAFE</div>
      <div style="display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;padding:0 48px;">
        <div>
          <div style="font-family:'Marcellus',serif;font-size:19px;letter-spacing:3px;color:#F4EEE3;">BLUE SEA CAFE</div>
          <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:#C1744E;margin-top:2px;">caffeine, sourdough &amp; pastries</div>
        </div>
        <div style="font-size:13.5px;line-height:1.8;">Tue – Sun · 8am – 9pm<br>12, Jalan Pantai 3, Kuala Lumpur</div>
        <div style="font-size:13.5px;line-height:1.8;">hello@blueseacafe.my<br>03-1234 5678</div>
      </div>
      <div style="border-top:1px solid #3D5A4B;margin-top:30px;padding-top:18px;display:flex;justify-content:space-between;font-size:12.5px;padding-left:48px;padding-right:48px;flex-wrap:wrap;gap:10px;">
        <span>© 2026 Blue Sea Cafe</span>
        <a href="#" onClick="{{ goLoginA }}" style="color:#9DB3A6;">Staff login</a>
      </div>
    </div>
    <div class="mnav">
      <div class="mnav-inner">
        <a href="#home" class="mnav-item">
          <svg class="mnav-ico" viewBox="0 0 24 24"><path d="M4 11 L12 4 L20 11"></path><path d="M6 10 V20 H18 V10"></path></svg>
          <span>Home</span>
        </a>
        <a href="#menu" class="mnav-item">
          <svg class="mnav-ico" viewBox="0 0 24 24"><path d="M6 8 H16 V13 A4 4 0 0 1 12 17 A4 4 0 0 1 6 13 Z"></path><path d="M16 9 H18 A2 2 0 0 1 18 13 H16"></path></svg>
          <span>Menu</span>
        </a>
        <a href="#about" class="mnav-item">
          <svg class="mnav-ico" viewBox="0 0 24 24"><path d="M12 20 C12 13 12 9 12 4"></path><path d="M12 13 C7 12 4 8 4 4 C9 5 12 8 12 13"></path><path d="M12 13 C17 12 20 8 20 4 C15 5 12 8 12 13"></path></svg>
          <span>About</span>
        </a>
        <a href="#track" class="mnav-item">
          <svg class="mnav-ico" viewBox="0 0 24 24"><path d="M12 21 C12 21 5 14.5 5 9 A7 7 0 0 1 19 9 C19 14.5 12 21 12 21 Z"></path><circle cx="12" cy="9" r="2.4"></circle></svg>
          <span>Track</span>
        </a>
        <button onClick="{{ openCart }}" class="mnav-item mnav-cart">
          <svg class="mnav-ico" viewBox="0 0 24 24"><path d="M6 8 H18 L17 20 H7 Z"></path><path d="M9 8 V6 A3 3 0 0 1 15 6 V8"></path></svg>
          <span>Cart</span>
          <span class="mnav-badge {{ cartBadgeClass }}">{{ cartCount }}</span>
        </button>
      </div>
    </div>
  </div>
</sc-if>
`;
