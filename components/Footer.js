import Link from 'next/link'
import { colors, FONT_DISPLAY, FONT_BODY, CONTACT_EMAIL, INSTAGRAM_URL, TIKTOK_URL } from '../styles/tokens'

export default function Footer() {
  return (
    <footer style={s.footer}>
      {/* Color bar */}
      <div style={s.colorBar} />

      <div style={s.inner}>
        {/* Brand */}
        <div style={s.brandCol}>
          <img src="/images/nsg-logo.png" alt="Nicholas Street Games" style={s.logo} />
          <p style={s.credit}>A Two Doors Down Production</p>
          <p style={s.tagline}>Where friends, families, and games come together.</p>
          <p style={s.legal}>© 2026 Nicholas Street Games, LLC · Upland, Southern California</p>
        </div>

        {/* Nav */}
        <div style={s.navCol}>
          <div style={s.colLabel}>Site</div>
          {[
            { href: '/',               label: 'Home' },
            { href: '/letter-me-this', label: 'Letter Me This!' },
            { href: '/shop',           label: 'Shop' },
            { href: '/about',          label: 'About' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={s.footLink}>{label}</Link>
          ))}
        </div>

        {/* Social / contact */}
        <div style={s.contactCol}>
          <div style={s.colLabel}>Connect</div>
          <a href={INSTAGRAM_URL} style={s.footLink} target="_blank" rel="noopener noreferrer">
            Instagram · @lettermethisgame
          </a>
          <a href={TIKTOK_URL} style={s.footLink} target="_blank" rel="noopener noreferrer">
            TikTok · @lettermethis1
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} style={s.footLink}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <style>{`
        footer a:hover { color: #F5C518 !important; }
      `}</style>
    </footer>
  )
}

const s = {
  footer: {
    background: colors.deepTeal,
    color: '#EAF6F5',
  },
  colorBar: {
    height: 6,
    background: `linear-gradient(90deg, ${colors.teal} 0%, ${colors.yellow} 33%, ${colors.coral} 66%, ${colors.green} 100%)`,
  },
  inner: {
    maxWidth: 1000, margin: '0 auto',
    padding: '56px 24px 48px',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: 48,
  },
  brandCol: {
    display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
  },
  logo: {
    height: 70, width: 'auto',
  },
  credit: {
    fontFamily: FONT_BODY, fontWeight: 700, fontSize: 11, letterSpacing: '0.06em',
    textTransform: 'uppercase', color: '#9FCBC8', marginTop: -2,
  },
  tagline: {
    fontFamily: FONT_BODY, fontSize: 14, color: '#B9DAD8', lineHeight: 1.6, maxWidth: 260,
  },
  legal: {
    fontFamily: FONT_BODY, fontSize: 12, color: '#7FB2AF', letterSpacing: '0.3px',
  },
  navCol: {
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  contactCol: {
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  colLabel: {
    fontFamily: FONT_DISPLAY, fontWeight: 700,
    fontSize: 12, letterSpacing: '0.16em', color: colors.yellow,
    marginBottom: 4, textTransform: 'uppercase',
  },
  footLink: {
    fontFamily: FONT_BODY, fontSize: 14, color: '#CDE7E5', textDecoration: 'none',
    transition: 'color 0.2s', fontWeight: 600,
  },
}
