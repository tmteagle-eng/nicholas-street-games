# Nicholas Street Games — nicholasstreetgames.com

Built with Next.js 14 (Pages Router). Deploys to Vercel.

---

## Pages

| Route         | File                   | Description                        |
|---------------|------------------------|------------------------------------|
| `/`           | `pages/index.js`       | Homepage                           |
| `/our-games`  | `pages/our-games.js`   | Letter Me This! game page          |
| `/about`      | `pages/about.js`       | NSG origin story                   |
| `/buy`        | `pages/buy.js`         | Buy page → Amazon redirect         |
| `/launch`     | `pages/launch.js`      | Launch party landing + RSVP        |

## Shared Components

- `components/Nav.js` — Fixed top nav, responsive with mobile drawer
- `components/Footer.js` — Full footer with links and socials

---

## Deploying to Vercel

1. Push this folder to a GitHub repo (e.g., `nicholas-street-games`)
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import from GitHub
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy** — done

### Connect your GoDaddy domain

1. In Vercel: **Project → Settings → Domains** → Add `nicholasstreetgames.com`
2. Vercel gives you nameserver addresses (e.g., `ns1.vercel-dns.com`)
3. In GoDaddy: **Domain → Manage DNS → Nameservers → Custom**
4. Replace GoDaddy nameservers with Vercel's two nameservers
5. Save — propagates in 5–30 minutes
6. Your Microsoft 365 email is **not affected** — Vercel manages all DNS including MX records

---

## Before Going Live — Swap These

### Logo
Replace the base64 inline image with the real file:

1. Copy `LetterMeThis_Box_Image_No_Picture.png` → `public/images/lettermethis-logo.png`
2. In `pages/index.js` and `pages/our-games.js`, change:
   ```js
   const LOGO = 'data:image/png;base64,...'
   ```
   to:
   ```js
   const LOGO = '/images/lettermethis-logo.png'
   ```
3. Optionally swap `<img>` for Next.js `<Image>` for better performance

### Amazon URL
In `pages/buy.js`, update:
```js
const AMAZON_URL = 'https://amazon.com' // ← replace with real listing URL
```
Once live, uncomment the auto-redirect block to send visitors straight to Amazon.

---

## Brand Tokens

Colors, logo, and key URLs live in `styles/tokens.js`.

| Variable     | Value     |
|--------------|-----------|
| Teal         | `#20B2AA` |
| Yellow       | `#F5C518` |
| Coral        | `#E85D3D` |
| Green        | `#3a7d44` |
| Dark         | `#1a1a1a` |
| RSVP URL     | `https://forms.office.com/r/5jMmN45h2j` |

---

## RSVP / Launch Party

The launch party page (`/launch`) is fully built with the live Microsoft Forms link embedded.
Share as: `nicholasstreetgames.com/launch`
