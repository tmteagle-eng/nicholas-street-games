// Design tokens — single source of truth for the NSG marketing site.
// Rebranded to match the production packaging (Tube v2 / Trifold Insert v5):
// warm light grounds, rounded Baloo 2 display type, brand hues as playful roles.

export const colors = {
  // Brand accents (same hexes as the printed box)
  teal:   '#20B2AA',
  yellow: '#F5C518',
  coral:  '#E85D3D',
  green:  '#3A7D44',
  blue:   '#2E7DD1',

  // Darker, text-safe variants of the accents
  tealInk:  '#0E6A64',
  coralInk: '#B8402A',
  greenInk: '#2A5E33',
  yellowInk:'#8A6D00',

  // Warm light grounds + panels lifted from the packaging
  ground:   '#FBFAF5', // warm off-white page background
  white:    '#FFFFFF',
  mint:     '#E7F4EC', // soft green panel
  sky:      '#DCEEFB', // pale blue panel
  sun:      '#FDF3D6', // soft yellow panel
  deepTeal: '#0C5C63', // the single dark panel for contrast/rhythm

  // Ink + hairlines (warm-biased neutrals, not pure grey)
  ink:      '#1D2624',
  inkSoft:  '#52605C',
  inkFaint: '#8A968F',
  hair:     '#E7E4DA',

  // Legacy alias (kept so older event pages don't break)
  dark:  '#1a1a1a',
  cream: '#f8f7f3',
  gray:  '#888888',
}

// Typefaces (loaded in pages/_document.js)
export const FONT_DISPLAY = "'Baloo 2', ui-rounded, 'Segoe UI Rounded', system-ui, sans-serif"
export const FONT_BODY = "'Nunito', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"

// Logo + external links
export const LOGO_LMT = '/images/lettermethis-logo.png'
export const LOGO_NSG = '/images/nsg-logo.png'
export const LOGO_BASE64 = '/images/lettermethis-logo.png' // legacy alias
export const LOGO_PATH = '/images/lettermethis-logo.png'    // legacy alias
export const DICE_ROLLER_URL = 'https://tmteagle-eng.github.io/letter-me-this/'
export const RSVP_URL = 'https://forms.office.com/r/5jMmN45h2j'
export const CONTACT_EMAIL = 'info@nicholasstreetgames.com'
export const INSTAGRAM_URL = 'https://instagram.com/lettermethisgame'
export const TIKTOK_URL = 'https://tiktok.com/@LetterMeThis1'

// Reusable style fragments so every reskinned page stays consistent.
export const ui = {
  eyebrow: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13,
    letterSpacing: '0.16em', textTransform: 'uppercase', color: colors.tealInk,
    marginBottom: 14,
  },
  h2: {
    fontFamily: FONT_DISPLAY, fontWeight: 800,
    fontSize: 'clamp(30px,4.5vw,48px)', lineHeight: 1.05,
    letterSpacing: '-0.01em', color: colors.ink,
  },
  lead: {
    fontFamily: FONT_BODY, fontSize: 19, lineHeight: 1.6,
    color: colors.inkSoft, maxWidth: '62ch',
  },
  body: {
    fontFamily: FONT_BODY, fontSize: 17, lineHeight: 1.7, color: colors.inkSoft,
  },
  card: {
    background: colors.white, border: `1.5px solid ${colors.hair}`,
    borderRadius: 22, padding: 26, boxShadow: '0 10px 30px rgba(20,40,35,0.07)',
  },
  btnPrimary: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, letterSpacing: '0.01em',
    background: colors.coral, color: '#fff', padding: '13px 28px',
    borderRadius: 999, textDecoration: 'none', display: 'inline-block',
    border: '2px solid transparent',
  },
  btnTeal: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, letterSpacing: '0.01em',
    background: colors.teal, color: '#fff', padding: '13px 28px',
    borderRadius: 999, textDecoration: 'none', display: 'inline-block',
    border: '2px solid transparent',
  },
  btnGhost: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, letterSpacing: '0.01em',
    background: 'transparent', color: colors.tealInk, padding: '11px 26px',
    borderRadius: 999, textDecoration: 'none', display: 'inline-block',
    border: `2px solid ${colors.teal}66`,
  },
  pill: (bg, fg = '#fff') => ({
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, letterSpacing: '0.03em',
    background: bg, color: fg, padding: '6px 14px', borderRadius: 999,
    display: 'inline-flex', alignItems: 'center', gap: 6,
  }),
}

// The signature slogan, in its four colors.
export const SLOGAN = [
  { word: 'Roll.',   color: colors.teal },
  { word: 'Write.',  color: colors.yellowInk },
  { word: 'Reveal.', color: colors.coral },
  { word: 'Laugh.',  color: colors.green },
]
