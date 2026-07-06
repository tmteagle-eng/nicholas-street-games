# Changelog

## 2026-07-05 — Production rebrand & launch

A full rebrand of the marketing site to match the production **Letter Me This!**
packaging (Tube v2 / Trifold Insert v5), plus new commerce, accounts, and an AI
game-master preview. Shipped to production on nicholasstreetgames.com, and the
companion dice-roller app was recolored to match.

---

### Design system

- Replaced the old dark **Bebas Neue** aesthetic on marketing pages with the
  **"sunny packaging"** look from the box: warm light grounds (`#FBFAF5`),
  soft mint / sky / sun panels, and one deep-teal (`#0C5C63`) contrast panel.
- Added **Baloo 2** (rounded display) alongside **Nunito** (body). Loaded in
  `pages/_document.js`. Bebas Neue kept for the untouched event/admin pages.
- Centralized everything in `styles/tokens.js`: `colors`, font stacks
  (`FONT_DISPLAY`, `FONT_BODY`), reusable style fragments (`ui.btnPrimary`,
  `ui.btnTeal`, `ui.btnGhost`, `ui.pill`, `ui.card`, `ui.eyebrow`, `ui.h2`…),
  the four-color `SLOGAN`, and shared links/emails.
- Event/admin pages (`/party`, `/cancel`, `/release`, `/releases`, `/rsvps`,
  `/launch`) intentionally left on their original dark aesthetic.

### Pages

- **`/letter-me-this` (new)** — dedicated game page and the printed box QR-code
  destination. Sections: hero, How to Play (colored step badges),
  What's Inside, Endless Ways to Play (6 game modes), Meet Nickie, testimonials,
  and buy/social. Chat-with-Nickie button in the hero.
- **`/our-games` (removed)** — now **301-redirects to `/letter-me-this`** via
  `next.config.js`, so the printed box QR code stays valid forever.
- **`/` (homepage)** — reskinned sunny; hero hands off to the game page; added
  the **origin-story video** section ("A message from Jami").
- **`/about`** — reskinned; added founder note from Jami Johnson's thank-you card.
- **`/buy`** — reskinned; specs grid; "Coming Soon."
- **`/shop` (new)** and **`/cart` (new)** — store with product grid, add-to-cart,
  quantity controls, and subtotal. Every thumbnail wears a **Coming Soon** sticker.
- **`/register`, `/login`, `/account` (new)** — passwordless magic-link accounts.
- **`/nickie` (new)** — Nickie AI Game Master chat with freemium gating.

### Commerce (checkout stubbed)

- `data/products.js` — product catalog. Letter Me This! retail price **$24.99**;
  merch placeholders. `stripePriceId` is `null` (ready to wire Stripe).
- `lib/cart.js` — localStorage cart with `useCart()` hook and cross-tab sync.
- `pages/api/checkout.js` — validates the cart server-side and returns **501**
  until Stripe is wired. The cart UI falls back to "email info@ to order."

### Accounts & Nickie (magic-link real; AI stubbed)

- `lib/auth.js` — passwordless magic-link auth over **Resend + Upstash Redis**:
  HMAC-signed session cookies, single-use email tokens, user records, and
  Nickie usage counters. **Requires a new `AUTH_SECRET` env var** (falls back to
  an insecure dev key with a warning if unset).
- API: `pages/api/auth/{request-link,verify,logout,me}.js`.
- `pages/api/nickie.js` — identity + usage metering with a **freemium wall**:
  anonymous visitors get **3 free questions** (signed cookie) → register wall;
  registered free tier gets **25** (metered per account in Redis). The LLM answer
  is **stubbed** (canned game-master tips) until an AI provider is wired.

### Game facts corrected to the box

| Detail | Old | New (box) |
| --- | --- | --- |
| Players | 3–10 | **3–8** |
| Ages | 12+ | **14+** |
| Writing timer | 2 min | **90 seconds** |
| Slogan | Roll. Write. Reveal. | **Roll. Write. Reveal. Laugh.** |
| Public email | tim@ | **info@**nicholasstreetgames.com |

- Nav: added **Letter Me This!**, **Shop**, **Sign In/Account**, a cart badge,
  and a **Chat with Nickie** button. The **Dice Roller** button now appears
  **only on `/letter-me-this`** (removed from home, nav, and About).

### Companion app — dice roller (separate repo `tmteagle-eng/letter-me-this`)

- Recolored `index.html` to the same sunny system (light ground, Baloo 2 +
  Nunito, teal letter die / coral count die, coral roll button, green start).
  Dice logic and timer behavior unchanged. Deployed via GitHub Pages to
  tmteagle-eng.github.io/letter-me-this.

---

### Infrastructure & Vercel changes

These are not visible in code, recorded here for the project history.

- **Dedicated Vercel workspace.** The `nicholas-street-games` project was moved
  out of the shared **"Grounded" (`grounded1`)** workspace into its **own Vercel
  workspace, `nicholas-street-games`** (Pro). The project **transferred with its
  domain (nicholasstreetgames.com), environment variables, and deployments**, so
  the two ventures are now fully isolated (separate billing, members, dashboard).
  Preview URLs now read `…-nicholas-street-games.vercel.app` instead of
  `…-grounded1.vercel.app`.
- **Git integration connected.** The GitHub repo is now linked to the Vercel
  project. **Pushing to `master` auto-deploys production**; every branch/PR gets
  a preview URL. (Previously the site was deployed manually via the Vercel CLI.)
- **Deploy scope** is now `--scope nicholas-street-games` (docs updated in
  `CLAUDE.md` and `TECHNICAL_MANUAL.md`). The old `grounded1` references were
  removed. The workspace **Team ID** in `TECHNICAL_MANUAL.md` is flagged TODO —
  set it from Vercel → Settings → General → Team ID (the Project ID is unchanged).
- **Environment variables (Vercel → Production):**
  - `AUTH_SECRET` — **NEW, required** for magic-link session signing. Add a long
    random string (Production + Preview), then redeploy for it to take effect.
  - `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`,
    `ADMIN_PASSWORD` — existing; still required.
  - `ANTHROPIC_API_KEY` — **NEW** for Nickie's real AI (see below). Nickie falls
    back to canned tips if it's unset, so it's not strictly required to deploy.

## 2026-07-05 (later) — Nickie's real AI

- `pages/api/nickie.js` now calls the **Claude API** (`claude-opus-4-8`, raw
  `fetch` — no SDK, so the project stays dependency-free) with a Game-Master
  system prompt grounded in the actual box (rules, scoring, the 6 modes, box
  contents). The freemium metering/gating and response shape are unchanged.
- **Graceful fallback:** if `ANTHROPIC_API_KEY` is unset or the call errors/times
  out (20s), Nickie serves a canned tip instead of failing. Optional
  `NICKIE_MODEL` env var overrides the model.

### Still stubbed — future work

- **Stripe checkout** — set `STRIPE_SECRET_KEY`, give each product a real
  `stripePriceId`, and replace the TODO in `pages/api/checkout.js` with a
  Checkout Session.
