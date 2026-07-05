# Nicholas Street Games — Technical Manual

## Overview

Marketing website for Nicholas Street Games, home of the board game **Letter Me This!**. Currently in **pre-launch** mode — the game is not yet available for purchase. The site showcases the game, links to a custom electronic dice roller, and includes a hidden pre-launch party invite page with a built-in RSVP system.

**Live URL:** https://nicholasstreetgames.com
**Stack:** Next.js 14 (Pages Router), styled-jsx, Vercel, Upstash Redis, Resend
**Domain registrar:** GoDaddy (nameservers pointed to Vercel)
**Email:** tim@nicholasstreetgames.com (Microsoft 365, not GoDaddy)

---

## Hosting & Infrastructure

### Vercel
- **Workspace/Team:** nicholas-street-games (its own Vercel workspace, separate from other projects)
- **Project:** nicholas-street-games
- **Project ID:** prj_VAC8seTCptOntreKm4LTewXlD1BH (unchanged by the workspace move)
- **Org/Team ID:** team_1h3rOPZKGzoeDRYoMHHG8Wls (the new "nicholas-street-games" workspace;
  the old Grounded ID team_5hTfGHmr8MLt1hcg5xuyYGVm no longer applies).
- **Framework:** Next.js (auto-detected)
- **Build command:** `next build`
- **Output:** Static pages + serverless API functions

### Domain & DNS
- **Domain:** nicholasstreetgames.com (registered at GoDaddy)
- **Nameservers:** ns1.vercel-dns.com, ns2.vercel-dns.com (Vercel manages all DNS)
- **SSL:** Auto-provisioned by Vercel (Let's Encrypt)

### DNS Records (managed in Vercel)
These were migrated from GoDaddy to preserve Microsoft 365 email:

| Type | Name | Value |
|------|------|-------|
| MX | @ | nicholasstreetgames-com.mail.protection.outlook.com (priority 0) |
| CNAME | autodiscover | autodiscover.outlook.com |
| CNAME | enterpriseenrollment | enterpriseenrollment-s.manage.microsoft.com |
| CNAME | enterpriseregistration | enterpriseregistration.windows.net |
| TXT | @ | NETORGFT18654255.onmicrosoft.com |
| TXT | @ | v=spf1 include:spf.protection.outlook.com -all |
| TXT | _dmarc | v=DMARC1; p=reject; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net; |

### GitHub
- **Repo:** https://github.com/tmteagle-eng/nicholas-street-games
- **Branch:** master

---

## Third-Party Services

### Upstash Redis (RSVP Data Storage)
- **Purpose:** Stores all RSVP form submissions for the pre-launch party
- **Dashboard:** https://console.upstash.com
- **Database name:** clever-cougar-48572
- **REST URL:** https://clever-cougar-48572.upstash.io
- **Data structures:**
  - `rsvps` — Redis list; each entry is a JSON string with name, email, phone, attending status, guest count, dietary restrictions, and submission timestamp
  - `releases` — Redis list; each entry is a JSON string with names (array), email, signatureImage (base64 PNG), and submission timestamp
- **Free tier:** 10,000 commands/day, 256MB storage (more than enough for RSVPs + releases)

### Resend (Email Notifications)
- **Purpose:** Sends email notification to tim@nicholasstreetgames.com each time someone submits an RSVP or signs a photo/video release
- **Dashboard:** https://resend.com
- **Account:** Linked to Tim's account
- **Verified sender:** `rsvp@nicholasstreetgames.com` (domain verified, DNS records added to Vercel)
- **Free tier:** 100 emails/day, 3,000 emails/month
- **Resend account email:** tmteagle@gmail.com

### Vercel Analytics
- **Purpose:** Page view and visitor analytics for the site
- **Dashboard:** Vercel project dashboard → Analytics tab
- **Integration:** `@vercel/analytics` package, loaded in `pages/_app.js`
- **Included in Vercel Pro plan** — no additional cost

### Microsoft 365
- **Email:** tim@nicholasstreetgames.com
- **Admin center:** https://admin.microsoft.com
- **User:** Tim Teagle (Global Administrator)
- **Alias:** TimTeagle@NicholasStreetGames687.onmicrosoft.com
- **Plan:** Basic (no Exchange Mail tab in admin — SMTP Auth not available, which is why we use Resend for outbound email instead of Microsoft 365 SMTP)

---

## Environment Variables (Vercel)

All environment variables are set in Vercel for the **Production** environment only.

| Variable | Purpose | Value Source |
|----------|---------|-------------|
| `UPSTASH_REDIS_REST_URL` | Redis database URL | Upstash dashboard |
| `UPSTASH_REDIS_REST_TOKEN` | Redis authentication token | Upstash dashboard |
| `RESEND_API_KEY` | Email sending API key (starts with `re_`) | Resend dashboard → API Keys |
| `ADMIN_PASSWORD` | Password for the /rsvps admin dashboard | `NickStGames!001` |

### Managing Environment Variables
```bash
# List all env vars
vercel env ls

# Add a new env var (pipe value to avoid shell escaping issues)
echo -n "value" | vercel env add VAR_NAME production

# Remove an env var
vercel env rm VAR_NAME production -y
```

**Important:** When adding env vars via CLI, use `echo -n` (no trailing newline) to avoid extra characters that cause authentication failures.

---

## Project Structure

```
C:\Users\tmtea\nicholas-street-games-site\nsg-site\
├── .vercel/
│   └── project.json              # Vercel project link (orgId + projectId)
├── components/
│   ├── Nav.js                    # Fixed top nav with logo, links, dice roller CTA, mobile drawer
│   └── Footer.js                 # 3-column footer: brand, site links, social/contact
├── pages/
│   ├── _app.js                   # Global layout (Nav + Footer wrapper), global CSS, animations, Vercel Analytics
│   ├── _document.js              # HTML document: Google Fonts (Bebas Neue, Nunito), favicon
│   ├── index.js                  # Homepage: hero, game spotlight, how it works, coming soon banner
│   ├── our-games.js              # Letter Me This! detail page with logo, badges, how-to, dice roller
│   ├── about.js                  # Company origin story, NSG logo, stats, mission statement
│   ├── buy.js                    # "Coming Soon" page (will become Amazon buy page when live)
│   ├── launch.js                 # HIDDEN pre-launch party invite with built-in RSVP form
│   ├── release.js                # HIDDEN photo/video release form with signature capture
│   ├── releases.js               # HIDDEN printable release records with signatures (password-protected)
│   ├── rsvps.js                  # HIDDEN password-protected admin dashboard with RSVP + release tracking
│   └── api/
│       ├── rsvp.js               # POST — accepts RSVP submission, saves to Redis, sends email
│       ├── rsvps.js              # GET — returns all RSVPs + releases (requires Bearer token auth)
│       ├── release.js            # POST — accepts release submission, saves to Redis, sends email
│       └── releases.js           # GET — returns all releases with signatures (requires Bearer token auth)
├── public/
│   └── images/
│       ├── nsg-logo.png          # Nicholas Street Games logo (street sign with dice/pawn)
│       ├── lettermethis-logo.png # Letter Me This! box/game logo
│       └── launch-hero.jfif      # Hero image for the pre-launch party page
├── styles/
│   └── tokens.js                 # Brand colors, design tokens, logo path
├── package.json                  # Next.js 14.2.0, React 18.3.0, @upstash/redis, resend, @vercel/analytics
├── next.config.js                # reactStrictMode: true
├── vercel.json                   # Framework: nextjs
└── README.md                     # Original setup instructions
```

---

## Pages

| Route | File | Description | Linked from nav? |
|-------|------|-------------|-----------------|
| `/` | `pages/index.js` | Homepage — hero, game spotlight, how it works, coming soon banner | Yes |
| `/our-games` | `pages/our-games.js` | Letter Me This! detail page with dice roller button | Yes |
| `/about` | `pages/about.js` | Company origin story with NSG logo | Yes |
| `/buy` | `pages/buy.js` | "Coming Soon" placeholder (no Amazon link yet) | No |
| `/launch` | `pages/launch.js` | Private pre-launch party invite with RSVP form | **No — hidden page** |
| `/release` | `pages/release.js` | Photo/video release form with signature capture | **No — hidden page** |
| `/releases` | `pages/releases.js` | Printable release records with signatures (password-protected) | **No — hidden page** |
| `/rsvps` | `pages/rsvps.js` | Password-protected admin dashboard with RSVP + release tracking | **No — hidden page** |
| `/api/rsvp` | `pages/api/rsvp.js` | RSVP submission endpoint (POST only) | N/A — API |
| `/api/rsvps` | `pages/api/rsvps.js` | RSVP + release list endpoint (GET, auth required) | N/A — API |
| `/api/release` | `pages/api/release.js` | Release submission endpoint (POST, 4MB body limit) | N/A — API |
| `/api/releases` | `pages/api/releases.js` | Full release records with signatures (GET, auth required) | N/A — API |

---

## Pre-Launch Party Page (`/launch`)

### Overview
A standalone, fully-designed invitation page for the Letter Me This! pre-launch party. Not linked from any site navigation — only accessible via direct URL: `nicholasstreetgames.com/launch`

### Event Details
- **Event:** Letter Me This! Pre-Launch Party
- **Date:** Saturday, March 28, 2026
- **Time:** 4:00 PM – 7:00 PM
- **Location:** 520 N 2nd Avenue, Upland, CA 91786
- **RSVP Deadline:** March 21, 2026
- **Cost:** Free to attend
- **Includes:** Food, drinks, games
- **Note:** Event will be filmed for social media/promotional content; guests sign a photo/video release at the door

### Page Sections (top to bottom)
1. **Fixed Nav** — NSG logo + "RSVP Now" button (scrolls to form)
2. **Hero Image** — Full-width product image (`launch-hero.jfif`), max 800px wide, centered
3. **Hero Text** — "Nicholas Street Games · Private Event" eyebrow, NSG logo, headline ("The Pre-Launch Party You Don't Want to Miss"), event description, date/time/location pills, "RSVP RIGHT HERE" CTA (scrolls to form)
4. **Color Bar** — Brand gradient divider
5. **What Section** — "The Plan for the Night" — game description + verb cards (Roll, Write, Reveal, Score, Laugh)
6. **Color Bar**
7. **Event Details** — Two-column: left has date/time/location/food, right has filming notice + contact card
8. **RSVP Form** — Built-in form (see below)
9. **Footer** — Copyright + links

### Has its own nav bar and footer — does NOT use the shared Nav.js/Footer.js components.

---

## RSVP System

### How It Works
1. Guest fills out the form on `/launch` and clicks "Submit RSVP"
2. Form data is sent via `POST /api/rsvp`
3. API saves the RSVP to Upstash Redis
4. API sends an email notification to tim@nicholasstreetgames.com via Resend
5. Guest sees a success confirmation message
6. Tim can view all RSVPs at `/rsvps` (password-protected dashboard)

### RSVP Form Fields
| Field | Required | Notes |
|-------|----------|-------|
| Full Name | Yes | |
| Email | Yes | |
| Phone Number | Yes | |
| Will You Be There? | Yes | "Yes, I'm in!" or "Can't make it" toggle buttons |
| Number of Guests | No | Only shown if attending; dropdown 1–4 |
| Dietary Restrictions | No | Only shown if attending; free text |

### RSVP API (`POST /api/rsvp`)
- Validates required fields (name, email, phone, attending)
- Creates RSVP object with timestamp
- Saves to Redis list `rsvps` via `lpush` (newest first)
- Sends formatted HTML email via Resend (non-blocking — if email fails, RSVP is still saved)
- Returns `{ success: true }` on success

### RSVP Data Shape (stored in Redis)
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(555) 123-4567",
  "attending": "yes",
  "guests": "2",
  "dietary": "Vegetarian",
  "submittedAt": "2026-03-08T15:52:51.556Z"
}
```

### Admin Dashboard (`/rsvps`)
- **URL:** nicholasstreetgames.com/rsvps
- **Password:** `NickStGames!001`
- **Authentication:** Password is sent as a Bearer token in the Authorization header to `GET /api/rsvps`
- **Features:**
  - Login screen with password input
  - Summary stats: Total RSVPs, Attending, Total Guests, Declined, Names Signed, Still Need
  - Attending table: Name, Email (clickable mailto), Phone (clickable tel), Guests, Dietary needs, Date, **Actions**
  - Declined table: Name, Email, Phone, Date, **Actions**
  - **RSVP Management:** Each row has action buttons:
    - Attending table: "Mark Declined" (sets attending=no, guests=0) and "Delete" (removes RSVP entirely)
    - Declined table: "Mark Attending" (sets attending=yes, guests=1) and "Delete"
    - All actions require confirmation dialog before executing
    - Useful for: cancellations, duplicate RSVPs, status changes
  - **Release Tracker:** Cross-references RSVP attendees against signed releases (see below)
  - All Signed Names: teal pill badges showing every individual who has signed
  - Release Submissions table: all release form submissions with names, email, date
  - "View & Print with Signatures" button linking to `/releases`
  - Dark theme matching the site brand
- **Not linked from any navigation** — access via direct URL only

### RSVP Admin API (`/api/rsvps`)
- **GET** — Returns all RSVPs and releases (signatures stripped from releases for performance)
- **PUT** — Update an RSVP by `submittedAt` timestamp. Body: `{ submittedAt, updates }`. Used for changing attendance status, guest count, etc. Uses Redis `LSET` for in-place updates.
- **DELETE** — Remove an RSVP by `submittedAt` timestamp. Body: `{ submittedAt }`. Uses Redis `LREM` to remove the entry. Used for duplicate removal.
- All methods require Bearer token auth (same admin password)

### Email Notifications
- **RSVP emails:**
  - **From:** `Letter Me This! RSVP <rsvp@nicholasstreetgames.com>`
  - **To:** tim@nicholasstreetgames.com
  - **Reply-To:** Set to the guest's email (so you can reply directly)
  - **Subject:** `RSVP: [Name] — Yes, I'll be there!` or `RSVP: [Name] — Sorry, I can't make it`
  - **Body:** Formatted HTML table with all RSVP details
- **Release emails:**
  - **From:** `Letter Me This! Release <rsvp@nicholasstreetgames.com>`
  - **To:** tim@nicholasstreetgames.com
  - **Subject:** `Release Signed: [Names]`
  - **Body:** List of names who signed, email if provided, timestamp

---

## Photo/Video Release System

### Overview
Guests sign a digital photo/video release granting Nicholas Street Games permission to use their image, likeness, and voice from the pre-launch party for social media, advertising, and promotional content.

### How It Works
1. Guest visits `/release` (link provided after RSVP or sent directly via text/email)
2. Fills out the release form: checks agreement box, enters name(s), optional email, draws signature
3. Form data is sent via `POST /api/release`
4. API saves the release to Upstash Redis (including signature image as base64 PNG)
5. API sends an email notification to tim@nicholasstreetgames.com via Resend
6. Guest sees a success confirmation with link back to `/launch`
7. Tim can view release status in the admin dashboard at `/rsvps` and print records at `/releases`

### Release Form (`/release`)
- **URL:** nicholasstreetgames.com/release (send this to guests)
- NSG logo header with teal nav border
- Full legal text of the release agreement
- Agreement checkbox (required to submit)
- Name fields with "+ Add Another Person" button (multiple people can sign on one form)
- Remove button on additional names
- Optional email field
- **Signature canvas:** HTML5 Canvas with mouse + touch drawing support, clear button
- Submit disabled until: checkbox checked, at least one name entered, signature drawn
- Success state with link back to launch page

### Release Form Fields
| Field | Required | Notes |
|-------|----------|-------|
| Agreement Checkbox | Yes | Must check to enable form |
| Name(s) | Yes (at least 1) | Can add multiple names per submission |
| Email | No | Optional contact email |
| Signature | Yes | Drawn on canvas, exported as base64 PNG |

### Release API (`POST /api/release`)
- **Body size limit:** 4MB (to accommodate base64 signature images)
- Validates required fields (names array, signatureImage)
- Creates release object with timestamp
- Saves to Redis list `releases` via `lpush`
- Sends email notification via Resend (non-blocking)
- Returns `{ success: true }` on success

### Release Data Shape (stored in Redis)
```json
{
  "names": ["Jane Doe", "John Doe"],
  "email": "jane@example.com",
  "signatureImage": "data:image/png;base64,iVBOR...",
  "submittedAt": "2026-03-08T18:30:00.000Z"
}
```

### Printable Release Records (`/releases`)
- **URL:** nicholasstreetgames.com/releases
- **Password:** Same as admin dashboard (`NickStGames!001`)
- Shows each signed release as a full printable document:
  - NSG logo + "Photo & Video Release" header
  - Full legal text
  - Name(s), email, date signed
  - Signature image
  - NSG footer
- "Print All Records" button
- CSS print styles: page breaks between records, no-print controls, white background
- Fetches from `/api/releases` (includes full signature images)

### Release Tracker (in Admin Dashboard)
The admin dashboard at `/rsvps` includes a release tracking section that cross-references RSVP attendees against signed releases:

- **Progress header:** Shows "X of Y Guests Signed"
- **Tracking table:** Lists every attending RSVP with:
  - Status icon (checkmark or X)
  - RSVP holder name
  - Email (clickable)
  - Party size (guest count from RSVP)
  - Whether the primary RSVP holder has signed (Yes/No)
- **Name matching:** Case-insensitive comparison of RSVP names against all names on signed releases
- **"Still Need Signatures" alert:** Red highlighted box listing everyone who hasn't signed, with their party size
- **Stats row:** "Names Signed" count and "Still Need" count (turns green when everyone has signed)

### Release Tracking Workflow
1. Send `nicholasstreetgames.com/release` to guests via text or email
2. Check `nicholasstreetgames.com/rsvps` → Release Tracker section to see who has/hasn't signed
3. Follow up with anyone in the "Still Need Signatures" list
4. At the party, have remaining guests sign on a phone/tablet at `nicholasstreetgames.com/release`
5. Print all records at `nicholasstreetgames.com/releases` if needed for physical filing

---

## Shared Components

### Nav.js (`components/Nav.js`)
- Fixed position, dark background with blur, coral bottom border
- Left: NSG logo image + "Nicholas Street Games" text
- Right (desktop): Home, Our Games, About links + "Try the Dice Roller" CTA button
- Mobile: Hamburger menu → drawer with same links
- Active page highlighting (teal color + underline)
- Scroll effect: shadow appears on scroll

### Footer.js (`components/Footer.js`)
- 3-column grid: Brand | Site links | Social/Contact
- Brand column: green "NICHOLAS ST." badge + "GAMES" text
- Site links: Home, Our Games, About (no Buy, no Launch)
- Social: Instagram (@lettermethisgame), TikTok (@LetterMeThis1), email
- Color gradient bar at bottom

---

## Brand & Design

### Fonts (loaded from Google Fonts in `_document.js`)
- **Bebas Neue** — Headlines, buttons, labels, all-caps text
- **Nunito** — Body text, nav links, descriptions

### Brand Colors (from `styles/tokens.js`)
| Name | Hex | Usage |
|------|-----|-------|
| Teal | `#20B2AA` | Eyebrows, labels, active states, accents |
| Yellow | `#F5C518` | "Coming Soon" text, section labels, highlights |
| Coral | `#E85D3D` | Primary buttons, nav border, CTAs |
| Green | `#3a7d44` | Street sign badge, step accents |
| Dark | `#1a1a1a` | Dark sections background, text color |
| Cream | `#f8f7f3` | Light section backgrounds, cards |

### Color Bar
Rainbow gradient bar used as section divider: Teal → Yellow → Coral → Green. Defined as `.color-bar` class in `_app.js`.

### Animations (defined in `_app.js`)
- `fadeUp` — Elements fade in and slide up (staggered with `.fade-up-1` through `.fade-up-6`)
- `bounce` — Scroll indicator arrow bounces

---

## External Links

| Link | URL | Where used |
|------|-----|-----------|
| Dice Roller | https://tmteagle-eng.github.io/letter-me-this/ | Nav CTA, homepage spotlight, our-games page, about page |
| Instagram | https://instagram.com/lettermethisgame | Homepage banner, our-games page, footer |
| TikTok | https://tiktok.com/@LetterMeThis1 | Homepage banner, our-games page, footer, launch page |
| Email | tim@nicholasstreetgames.com | Buy page ("Get Notified"), footer, launch page |

---

## Images

### NSG Logo (`public/images/nsg-logo.png`)
- Source: `C:\Users\tmtea\OneDrive - Nicholas Street Games\Visuals\Nicholas Street Games Logo.png`
- Street sign design with dice and game pawn
- Used in: Nav bar, homepage banner, about page, launch page hero

### Launch Hero Image (`public/images/launch-hero.jfif`)
- Source: `C:\Users\tmtea\Downloads\Image (3).jfif`
- Product/brand image displayed prominently at the top of the pre-launch party page
- Max width 800px, centered, natural aspect ratio

### Letter Me This! Logo (`public/images/lettermethis-logo.png`)
- Source: `C:\Users\tmtea\OneDrive - Nicholas Street Games\Visuals\LetterMeThis_Box_Image_No_Picture.png`
- Used in: Homepage spotlight, our-games page
- Referenced as `/images/lettermethis-logo.png` in code (replaced from base64 data URI for performance)

---

## Invitation Email (HTML)

A separate HTML email invitation exists for sending directly to guests:

- **Location:** `C:\Users\tmtea\OneDrive - Nicholas Street Games\Launch Party\launch_party_invite (1).html`
- **Also available as:** `launch_party_invite.jpg` (image version)
- **Content:** Matches the launch page — event details, filming notice, RSVP link
- **Photo/Video Release:** Available at `C:\Users\tmtea\OneDrive - Nicholas Street Games\Launch Party\photo_video_release.pdf`

---

## Dev Environment

### Prerequisites
- Node.js 24+ / npm 11+
- Git
- Vercel CLI (`npm i -g vercel`)
- GitHub CLI (`gh`)

### Local Development
```bash
cd C:\Users\tmtea\nicholas-street-games-site\nsg-site
npm install
npm run dev        # http://localhost:3000
```

**Note:** The RSVP form and admin dashboard require environment variables to function locally. To pull them from Vercel:
```bash
vercel env pull .env.local
```

### Build & Deploy
```bash
# Build locally (test)
npm run build

# Deploy to Vercel production
vercel --prod

# Or just deploy (Vercel builds remotely)
vercel --prod
```

### Git Workflow
```bash
cd C:\Users\tmtea\nicholas-street-games-site\nsg-site

# Check status
git status

# Stage and commit
git add -A
git commit -m "description of changes"

# Push to GitHub
git push

# Deploy (GitHub push does NOT auto-deploy — must use Vercel CLI)
vercel --prod
```

**Note:** Deployment is manual via `vercel --prod`. There is no GitHub webhook auto-deploy configured.

### Git Config (per-repo, not global)
```
user.email = tmteagle@gmail.com
user.name = tmteagle-eng
```

---

## Pre-Launch Status & What to Change When Ready

### When Amazon listing is live:
1. **`pages/buy.js`** — Replace "Coming Soon" content with Amazon buy page:
   - Add `const AMAZON_URL = 'https://amazon.com/dp/YOUR_ASIN'`
   - Restore price ($19.99), "Buy on Amazon" button, Prime shipping info
   - Optionally enable auto-redirect to Amazon
2. **`components/Nav.js`** — Add `{ href: '/buy', label: 'Buy' }` back to the `links` array
3. **`components/Footer.js`** — Add `{ href: '/buy', label: 'Buy' }` back to the footer links

### When pre-launch party is over:
- Either delete `pages/launch.js` or convert it to something else
- Delete `pages/rsvps.js`, `pages/release.js`, `pages/releases.js` and all API routes (`pages/api/rsvp.js`, `pages/api/rsvps.js`, `pages/api/release.js`, `pages/api/releases.js`) if no longer needed
- Remove `@upstash/redis` and `resend` from dependencies if no longer needed
- Remove environment variables from Vercel (`UPSTASH_*`, `RESEND_API_KEY`, `ADMIN_PASSWORD`)
- No nav/footer changes needed (these pages are already unlinked)
- **Keep release records printed/saved** before deleting Redis data

### ~~Finish domain verification in Resend~~ DONE
- Domain `nicholasstreetgames.com` verified in Resend
- DNS records added to Vercel: DKIM (TXT resend._domainkey), SPF (MX send, TXT send)
- Sender updated to `rsvp@nicholasstreetgames.com` in both `pages/api/rsvp.js` and `pages/api/release.js`

---

## Vercel Project Setup (for reference / rebuilding)

If you ever need to set up the Vercel project from scratch:

```bash
# Create project
vercel project add nicholas-street-games --scope nicholas-street-games

# Get project ID via API
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.vercel.com/v9/projects/nicholas-street-games?teamId=team_1h3rOPZKGzoeDRYoMHHG8Wls"

# Create .vercel/project.json
echo '{"orgId":"team_1h3rOPZKGzoeDRYoMHHG8Wls","projectId":"prj_VAC8seTCptOntreKm4LTewXlD1BH"}' > .vercel/project.json

# Set framework
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"framework":"nextjs"}' \
  "https://api.vercel.com/v9/projects/prj_VAC8seTCptOntreKm4LTewXlD1BH?teamId=team_1h3rOPZKGzoeDRYoMHHG8Wls"

# Disable SSO protection
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"ssoProtection":null}' \
  "https://api.vercel.com/v9/projects/prj_VAC8seTCptOntreKm4LTewXlD1BH?teamId=team_1h3rOPZKGzoeDRYoMHHG8Wls"

# Add domain
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"nicholasstreetgames.com"}' \
  "https://api.vercel.com/v10/projects/prj_VAC8seTCptOntreKm4LTewXlD1BH/domains?teamId=team_5hTfGHmr8McLt1hcg5xuyYGVm"

# Enable DNS zone (required before adding DNS records)
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"zone":true}' \
  "https://api.vercel.com/v6/domains/nicholasstreetgames.com?teamId=team_1h3rOPZKGzoeDRYoMHHG8Wls"

# Then add DNS records (MX, CNAME, TXT) — see DNS Records section above

# Add environment variables
echo -n "value" | vercel env add VAR_NAME production
```

### GoDaddy Nameserver Config
In GoDaddy → Domain → DNS → Nameservers → Custom:
- ns1.vercel-dns.com
- ns2.vercel-dns.com

---

## Troubleshooting

### Site not updating after deploy
- Git is now connected: pushing to `master` auto-deploys production (no manual CLI needed).
  Branches/PRs get preview URLs. Manual `vercel --prod` still works as a fallback.
- Clear browser cache or use incognito window

### Vercel CLI scope error
- Add `--scope nicholas-street-games` to commands, or run `vercel link --scope nicholas-street-games` first

### Email not working after DNS change
- Verify MX record exists: `vercel dns ls nicholasstreetgames.com --scope nicholas-street-games`
- MX should point to `nicholasstreetgames-com.mail.protection.outlook.com`
- To revert: change GoDaddy nameservers back to `ns37.domaincontrol.com` / `ns38.domaincontrol.com`

### "nicholasstreetgames.com is not a DNS zone" error
- Must enable zone first: PATCH `/v6/domains/nicholasstreetgames.com` with `{"zone":true}`
- Then DNS records can be added

### RSVP form returns "Something went wrong"
- Check that all 4 environment variables are set in Vercel (`vercel env ls`)
- If env vars were recently changed, a redeploy is required (`vercel --prod`)
- When adding env vars via CLI, use `echo -n` to avoid trailing newlines
- Test Redis directly: `curl -s "https://clever-cougar-48572.upstash.io/ping" -H "Authorization: Bearer TOKEN"` → should return `{"result":"PONG"}`
- Test API directly: `curl -s -X POST https://nicholasstreetgames.com/api/rsvp -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","phone":"555","attending":"yes"}'`

### Admin dashboard login fails
- Verify ADMIN_PASSWORD env var is set correctly (no extra whitespace/newlines)
- Remove and re-add: `vercel env rm ADMIN_PASSWORD production -y && echo -n 'PASSWORD' | vercel env add ADMIN_PASSWORD production`
- Redeploy after changing env vars

### RSVP emails not arriving
- Check spam folder (emails come from `onboarding@resend.dev` until domain is verified)
- Verify RESEND_API_KEY is set in Vercel env vars
- Check Resend dashboard (https://resend.com) → Emails tab for delivery status
- Email failures do NOT block RSVP saves — the RSVP is still stored in Redis

### Next.js security warning during install
- Next.js 14.2.0 has a known vulnerability warning — can upgrade to latest 14.x patch when convenient
- Does not affect site functionality

---

## Change Log

### March 7–8, 2026 — Pre-Launch Party RSVP System

**New features:**
- Added hero product image to the top of the launch party page (`launch-hero.jfif`)
- Renamed "Launch Party" to "Pre-Launch Party" across all text and metadata
- Updated copy: "We're getting close to launching" (was "officially launching")
- Increased font size of "Nicholas Street Games · Private Event" eyebrow text (12px → 18px)
- Built custom RSVP form directly into `/launch` page, replacing the external Microsoft Forms link
  - Fields: name, email, phone, attending (yes/no), guest count, dietary restrictions
  - Success confirmation state with personalized message
  - All RSVP buttons (nav + hero) now smooth-scroll to the form section
- Created serverless API route (`/api/rsvp`) for RSVP submission
- Integrated Upstash Redis for persistent RSVP data storage
- Integrated Resend for email notifications on each RSVP
- Built password-protected admin dashboard at `/rsvps` with:
  - Summary stats (total RSVPs, attending, total guests, declined)
  - Attending table with all details (name, email, phone, guests, dietary, date)
  - Declined table
  - Dark-themed design matching the site brand

**New dependencies:**
- `@upstash/redis` ^1.36.3 — Redis client for RSVP storage
- `resend` ^6.9.3 — Email API for RSVP notifications

**New files:**
- `pages/rsvps.js` — Admin dashboard
- `pages/api/rsvp.js` — RSVP submission endpoint
- `pages/api/rsvps.js` — RSVP list endpoint
- `public/images/launch-hero.jfif` — Hero image

**Infrastructure:**
- Set up Upstash Redis database (clever-cougar-48572)
- Set up Resend account with API key
- Added 4 environment variables to Vercel (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, RESEND_API_KEY, ADMIN_PASSWORD)

### March 8–9, 2026 — Photo/Video Release System, Analytics & Cleanup

**New features:**
- Built photo/video release form at `/release` with:
  - Legal agreement text and required checkbox
  - Multiple name fields (add/remove people)
  - HTML5 Canvas signature capture (mouse + touch support)
  - Optional email field
  - Success state with link back to launch page
- Built printable release records page at `/releases`:
  - Password-protected (same admin password)
  - Each release rendered as a full printable document with legal text, names, signature image
  - Print button with CSS page-break styles
- Added release tracking to admin dashboard at `/rsvps`:
  - Release Tracker section cross-referencing RSVP names against signed release names
  - "Still Need Signatures" alert box listing unsigned attendees
  - "All Signed Names" section with teal pill badges
  - New stats: "Names Signed" and "Still Need" counters
  - "View & Print with Signatures" button linking to `/releases`
- Added Vercel Analytics (`@vercel/analytics`) to `_app.js`
- Replaced base64 Letter Me This! logo with image file (`/images/lettermethis-logo.png`) — reduced page sizes from ~90KB to ~2-5KB
- After RSVP success for attendees, shows "Sign Photo & Video Release →" button linking to `/release`

**New files:**
- `pages/release.js` — Photo/video release form
- `pages/releases.js` — Printable release records
- `pages/api/release.js` — Release submission endpoint (POST, 4MB body limit)
- `pages/api/releases.js` — Release records endpoint (GET, auth required)
- `public/images/lettermethis-logo.png` — Letter Me This! game logo

**New dependencies:**
- `@vercel/analytics` — Vercel page view and visitor analytics

### March 9, 2026 — Domain Verification, Email Fix & RSVP Management

**Fixes:**
- Verified `nicholasstreetgames.com` domain in Resend — added DKIM and SPF DNS records to Vercel
- Updated email sender from `onboarding@resend.dev` to `rsvp@nicholasstreetgames.com` in both `/api/rsvp` and `/api/release`
- Updated email recipient to `tim@nicholasstreetgames.com` (was `tmteagle@gmail.com` temporarily due to Resend free tier restriction before domain verification)

**New features:**
- RSVP management in admin dashboard:
  - "Mark Declined" button on attending RSVPs (sets attending=no, guests=0)
  - "Mark Attending" button on declined RSVPs (sets attending=yes, guests=1)
  - "Delete" button to remove duplicate or erroneous RSVPs
  - All actions require confirmation dialog
- Extended `/api/rsvps` endpoint with PUT (update RSVP) and DELETE (remove RSVP) methods
