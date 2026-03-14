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
- Hosted on Vercel (team: grounded1)
- Domain: nicholasstreetgames.com (DNS on Vercel, email via Microsoft 365)

## Pages
- `/` — Homepage
- `/about` — About page
- `/our-games` — Games catalog
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

## Design
- Fonts: Bebas Neue + Nunito (Google Fonts)
- Brand colors: #20B2AA (teal), #F5C518 (yellow), #E85D3D (coral/red), #3a7d44 (green), #1a1a1a (dark)
- Party page uses `<style jsx>` with className-based CSS
- Dashboard and other pages use inline style objects

## Contact
- Email: tim@nicholasstreetgames.com (Microsoft 365)
- TikTok: @LetterMeThis1

## Deploy
```bash
vercel --prod --scope grounded1
```

## Owner
Tim Teagle (tmteagle-eng)
