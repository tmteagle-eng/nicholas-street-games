import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { colors, FONT_DISPLAY, FONT_BODY } from '../styles/tokens'
import { useCart } from '../lib/cart'
import { useUser } from '../lib/useUser'

export default function Nav() {
  const router = useRouter()
  const { count } = useCart()
  const { user } = useUser()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/',                label: 'Home' },
    { href: '/letter-me-this',  label: 'Letter Me This!' },
    { href: '/shop',            label: 'Shop' },
    { href: '/about',           label: 'About' },
  ]

  const isActive = (href) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href)

  return (
    <>
      <nav style={{
        ...s.nav,
        boxShadow: scrolled ? '0 4px 24px rgba(20,40,35,0.08)' : 'none',
        background: scrolled ? 'rgba(251,250,245,0.98)' : 'rgba(251,250,245,0.92)',
        borderBottom: `1.5px solid ${scrolled ? colors.hair : 'transparent'}`,
      }}>
        {/* Logo / brand */}
        <Link href="/" style={s.brand}>
          <img src="/images/nsg-logo.png" alt="Nicholas Street Games" style={s.navLogo} />
          <span style={s.brandText}>
            <span style={s.brandName}>Nicholas Street Games</span>
            <span style={s.brandTag}>A Two Doors Down Production</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links" style={s.links}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                ...s.link,
                color: isActive(href) ? colors.tealInk : colors.inkSoft,
                background: isActive(href) ? colors.mint : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <Link href="/nickie" style={s.nickieBtn}>
            <img src="/images/nickie-transparent.png" alt="" aria-hidden="true" style={s.nickieBtnImg} /> Chat with Nickie
          </Link>
          <Link
            href={user ? '/account' : '/login'}
            style={{ ...s.link, color: isActive('/account') ? colors.tealInk : colors.inkSoft, background: isActive('/account') ? colors.mint : 'transparent' }}
          >
            {user ? 'Account' : 'Sign In'}
          </Link>
          <Link href="/cart" style={s.cartBtn} aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
            <span aria-hidden="true">🛒</span>
            {count > 0 && <span style={s.cartBadge}>{count}</span>}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          style={s.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ ...s.bar, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ ...s.bar, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...s.bar, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={s.drawer}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                ...s.drawerLink,
                color: isActive(href) ? colors.tealInk : colors.ink,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href={user ? '/account' : '/login'} style={s.drawerLink} onClick={() => setMenuOpen(false)}>
            {user ? '👤 Account' : '👤 Sign In'}
          </Link>
          <Link href="/cart" style={s.drawerLink} onClick={() => setMenuOpen(false)}>
            🛒 Cart{count > 0 ? ` (${count})` : ''}
          </Link>
          <Link href="/nickie" style={{ ...s.drawerCta, background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => setMenuOpen(false)}>
            <img src="/images/nickie-transparent.png" alt="" aria-hidden="true" style={s.nickieBtnImg} /> Chat with Nickie
          </Link>
        </div>
      )}

      <style>{`
        nav a { transition: color 0.2s, background 0.2s; }
        @media (max-width: 1180px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 1181px) {
          .hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    backdropFilter: 'blur(10px)',
    padding: '0 32px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 64,
    transition: 'background 0.3s, box-shadow 0.3s, border-color 0.3s',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 10,
    textDecoration: 'none',
  },
  navLogo: {
    height: 46, width: 'auto',
  },
  brandText: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  brandName: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800, fontSize: 19, letterSpacing: '0.01em', lineHeight: 1.05,
    color: colors.ink,
  },
  brandTag: {
    fontFamily: FONT_BODY,
    fontWeight: 700, fontSize: 10, letterSpacing: '0.06em',
    textTransform: 'uppercase', color: colors.inkFaint, marginTop: 1,
  },
  links: {
    display: 'flex', alignItems: 'center', gap: 6,
  },
  link: {
    fontFamily: FONT_BODY,
    fontSize: 14, fontWeight: 700, letterSpacing: '0.01em',
    textDecoration: 'none', padding: '8px 14px',
    borderRadius: 999,
  },
  nickieBtnImg: {
    height: 24, width: 'auto', display: 'inline-block',
    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
  },
  nickieBtn: {
    marginLeft: 8,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700, fontSize: 15, letterSpacing: '0.02em',
    color: '#fff', background: colors.teal,
    padding: '10px 18px', borderRadius: 999,
    textDecoration: 'none', whiteSpace: 'nowrap',
    display: 'inline-flex', alignItems: 'center', gap: 6,
  },
  ctaBtn: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700, fontSize: 15, letterSpacing: '0.02em',
    color: '#fff', background: colors.coral,
    padding: '10px 18px', borderRadius: 999,
    textDecoration: 'none', whiteSpace: 'nowrap',
  },
  cartBtn: {
    position: 'relative', marginLeft: 4, textDecoration: 'none',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 40, height: 40, borderRadius: 999, fontSize: 18,
  },
  cartBadge: {
    position: 'absolute', top: 0, right: 0,
    minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999,
    background: colors.coral, color: '#fff',
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 11,
    display: 'grid', placeItems: 'center', lineHeight: 1,
  },
  hamburger: {
    display: 'none', flexDirection: 'column', gap: 5,
    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
  },
  bar: {
    display: 'block', width: 24, height: 2.5,
    background: colors.ink, borderRadius: 2,
    transition: 'transform 0.2s, opacity 0.2s',
  },
  drawer: {
    position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
    background: colors.ground,
    borderBottom: `1.5px solid ${colors.hair}`,
    boxShadow: '0 12px 24px rgba(20,40,35,0.08)',
    display: 'flex', flexDirection: 'column',
    padding: '12px 24px 22px',
    gap: 2,
  },
  drawerLink: {
    fontFamily: FONT_BODY,
    fontSize: 17, fontWeight: 700,
    textDecoration: 'none',
    padding: '13px 4px',
    borderBottom: `1px solid ${colors.hair}`,
  },
  drawerCta: {
    marginTop: 14,
    fontFamily: FONT_DISPLAY,
    fontWeight: 700, fontSize: 16, letterSpacing: '0.02em',
    color: '#fff', background: colors.coral,
    padding: '13px 20px', borderRadius: 999,
    textDecoration: 'none', textAlign: 'center',
  },
}
