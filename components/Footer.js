import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        {/* Brand */}
        <div style={s.brandCol}>
          <div style={s.signWrap}>
            <span style={s.signText}>NICHOLAS ST.</span>
          </div>
          <span style={s.gamesText}>GAMES</span>
          <p style={s.tagline}>Where friends, families, and games come together.</p>
          <p style={s.legal}>© 2026 Nicholas Street Games, LLC · Upland, Southern California</p>
        </div>

        {/* Nav */}
        <div style={s.navCol}>
          <div style={s.colLabel}>Site</div>
          {[
            { href: '/',          label: 'Home' },
            { href: '/our-games', label: 'Our Games' },
            { href: '/about',     label: 'About' },
            { href: '/buy',       label: 'Buy' },
            { href: '/launch',    label: 'Launch Party' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={s.footLink}>{label}</Link>
          ))}
        </div>

        {/* Social / contact */}
        <div style={s.contactCol}>
          <div style={s.colLabel}>Connect</div>
          <a href="https://instagram.com/lettermethisgame" style={s.footLink} target="_blank" rel="noopener noreferrer">
            Instagram · @lettermethisgame
          </a>
          <a href="https://tiktok.com/@lettermethisgame" style={s.footLink} target="_blank" rel="noopener noreferrer">
            TikTok · @lettermethisgame
          </a>
          <a href="mailto:tim@nicholasstreetgames.com" style={s.footLink}>
            tim@nicholasstreetgames.com
          </a>
        </div>
      </div>

      {/* Color bar */}
      <div style={s.colorBar} />
    </footer>
  )
}

const s = {
  footer: {
    background: '#111',
    color: '#fff',
    paddingTop: 64,
  },
  inner: {
    maxWidth: 960, margin: '0 auto',
    padding: '0 24px 48px',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: 48,
  },
  brandCol: {
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  signWrap: {
    background: '#3a7d44',
    padding: '3px 10px', borderRadius: 2,
    display: 'inline-flex', width: 'fit-content',
  },
  signText: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 13, letterSpacing: 3, color: '#fff',
  },
  gamesText: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 20, letterSpacing: 5, color: '#fff',
    marginTop: -4,
  },
  tagline: {
    fontSize: 13, color: '#666', lineHeight: 1.6, marginTop: 4, maxWidth: 260,
  },
  legal: {
    fontSize: 11, color: '#444', letterSpacing: '0.5px', marginTop: 8,
  },
  navCol: {
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  contactCol: {
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  colLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 11, letterSpacing: 4, color: '#20B2AA',
    marginBottom: 4, textTransform: 'uppercase',
  },
  footLink: {
    fontSize: 13, color: '#777', textDecoration: 'none',
    transition: 'color 0.2s',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 600,
  },
  colorBar: {
    height: 4,
    background: 'linear-gradient(90deg, #20B2AA 0%, #F5C518 33%, #E85D3D 66%, #3a7d44 100%)',
  },
}
