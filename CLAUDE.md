# Nicholas Street Games

## What This Is
Website for Nicholas Street Games — home of the Letter Me This! board game. Includes the main site, pre-launch party system (RSVP, confirmations, cancellations, photo/video release forms), and admin dashboard.

**Live:** https://nicholasstreetgames.com
**GitHub:** https://github.com/tmteagle-eng/nicholas-street-games
**Dice Roller:** https://tmteagle-eng.github.io/letter-me-this/

## Stack
- Next.js 14 (Pages Router — NOT App Router)
- Upstash Redis (data storage via LPUSH/LRANGE for RSVPs, releases, cancellations)
- Resend (transactional email from rsvp@nicholasstreetgames.com)
- Hosted on Vercel (own workspace: nicholas-street-games — separate from other projects)
- Domain: nicholasstreetgames.com (DNS on Vercel, email via Microsoft 365)

## Pages
- `/` — Homepage
- `/about` — About page
- `/letter-me-this` — Dedicated Letter Me This! game page (how to play, what's inside, game modes, Nickie AI game master, testimonials, buy). This is the printed box QR-code destination.
- `/our-games` — 301-redirects to `/letter-me-this` (via next.config.js). Kept so the printed box QR code stays valid.
- `/buy` — Buy page (currently "Coming Soon")
- `/launch` — Original party invitation page (hidden, not in nav)
- `/party` — Party confirmation page sent to confirmed guests. Has sticky yellow release banner, event details, "Here's the Deal" cards, release CTA, regrets link
- `/cancel` — Cancellation form (dark, standalone, noindex)
- `/release` — Photo/video release signing form with signature canvas
- `/releases` — Admin view of signed releases with printable signatures
- `/rsvps` — Admin dashboard (password-protected) with stats, attending/declined tables, release tracker, cancellations

## API Routes
- `/api/rsvp` — POST: saves RSVP to Redis + emails tim@nicholasstreetgames.com
- `/api/rsvps` — GET (auth): fetches RSVPs + releases + cancellations. Also PUT (update) and DELETE
- `/api/cancel` — POST: saves cancellation to Redis + emails notification
- `/api/release` — POST: saves signed release to Redis + emails notification
- `/api/releases` — GET (auth): fetches all releases with signatures

## Data Storage
All data stored in Upstash Redis as JSON-stringified entries in lists:
- `rsvps` — RSVP submissions
- `releases` — Signed photo/video releases
- `cancellations` — Cancellation submissions

## Environment Variables (Vercel)
- ADMIN_PASSWORD — for /rsvps dashboard auth
- UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
- RESEND_API_KEY
- AUTH_SECRET — signs magic-link sessions + Nickie anon cookies (lib/auth.js)
- ANTHROPIC_API_KEY — powers Nickie's AI answers (pages/api/nickie.js); falls back to canned tips if unset
- NICKIE_MODEL (optional) — override the Claude model for Nickie (default claude-opus-4-8)

## Design
- **Marketing pages** (`/`, `/letter-me-this`, `/about`, `/buy`, Nav, Footer) use the
  "sunny packaging" aesthetic that matches the production box/insert: warm light grounds,
  rounded **Baloo 2** display type + Nunito body, brand hues as playful accents (colored
  circle step-badges, pill tags), one deep-teal (#0C5C63) panel for contrast. Shared tokens
  and reusable style fragments live in `styles/tokens.js` (`colors`, `ui`, `FONT_DISPLAY`, `SLOGAN`, etc.).
- **Event/admin pages** (`/party`, `/cancel`, `/release`, `/releases`, `/rsvps`, `/launch`) keep
  their original dark Bebas Neue aesthetic — they are event tooling, not marketing.
- Brand colors: #20B2AA (teal), #F5C518 (yellow), #E85D3D (coral/red), #3a7d44 (green), #0C5C63 (deep teal), #1a1a1a (dark)
- Fonts loaded in `pages/_document.js`: Baloo 2 + Bebas Neue + Nunito (Google Fonts)
- Game facts (source of truth = production box): 3–8 players, ages 14+, 20+ min, 90-second timer, slogan "Roll. Write. Reveal. Laugh."

## Nickie™ — AI Game Master character
- **Nickie™** is the mascot: a teal 20-sided die in an NSG cap. Chat at `/nickie`
  (Claude-powered via `pages/api/nickie.js`); homepage has a "Meet Nickie™" card;
  `/letter-me-this` has a preview section.
- **Trademark convention:** superscript ™ on the FIRST prominent "Nickie" per page
  (headings + title tags) — never in conversational strings (chat text, placeholders, nav).
  Character art is AI-generated (Gemini/Veo from `OneDrive/Visuals/NIckie.jpg`), so
  copyright protection is weak — trademark is the primary protection; keep generation
  history as first-use evidence.
- **Animated character on `/nickie`:** not a framed video player — an ambient character.
  `public/videos/nickie-idle.{webm,mp4}` (5.4s seamless ping-pong wave loop, autoplays
  muted) + `nickie-full.{webm,mp4}` (~14.6s intro with voice, plays on tap). The webm
  files are VP9 **with alpha** (transparent bg, Nickie floats); Safari/iOS can't decode
  VP9 alpha so the page UA-sniffs and serves the white-bg mp4 in a circular badge.
- **Asset pipeline** (source: `OneDrive/Visuals/Nickie Intro/Nickie Intro.mp4`, 4K HEVC
  9:16 with the square white-bg content letterboxed inside): ffmpeg scale to 1080x1920 →
  crop `1080:1082:0:418` → 640px PNG frames → **flood-fill key** (only bg regions
  connected to the frame border go transparent — protects Nickie's white eyes/N; plain
  colorkey would eat them) → force 4px border transparent (kills letterbox residue) →
  encode VP9 `yuva420p -auto-alt-ref 0` + H.264 fallbacks. Idle loop = frames 3–85
  forward + reverse. Shareable GIF made from the same frames
  (`OneDrive/Visuals/Nickie Wave.gif`).

## Contact
- Ops/admin email: tim@nicholasstreetgames.com (Microsoft 365)
- Public marketing email (shown on the site, matches the box): info@nicholasstreetgames.com
- Instagram: @lettermethisgame · TikTok: @lettermethis1

## Deploy
The GitHub repo is connected to Vercel, so **pushing to `master` auto-deploys production**
and every branch/PR gets a preview URL. Manual deploy (if ever needed):
```bash
vercel --prod --scope nicholas-street-games
```

## Owner
Tim Teagle (tmteagle-eng)
