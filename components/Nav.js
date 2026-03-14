import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Nav() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/',          label: 'Home' },
    { href: '/our-games', label: 'Our Games' },
    { href: '/about',     label: 'About' },
  ]

  const isActive = (href) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href)

  return (
    <>
      <nav style={{
        ...s.nav,
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.15)' : 'none',
        background: scrolled ? 'rgba(26,26,26,0.98)' : 'rgba(26,26,26,0.94)',
      }}>
        {/* Logo / brand */}
        <Link href="/" style={s.brand}>
          <img src="/images/nsg-logo.png" alt="Nicholas Street Games" style={s.navLogo} />
          <span style={s.brandName}>Nicholas Street Games</span>
        </Link>

        {/* Desktop links */}
        <div style={s.links}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                ...s.link,
                color: isActive(href) ? '#20B2AA' : '#ccc',
                borderBottom: isActive(href) ? '2px solid #20B2AA' : '2px solid transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://tmteagle-eng.github.io/letter-me-this/"
            style={s.ctaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Try the Dice Roller
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
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
                color: isActive(href) ? '#20B2AA' : '#fff',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://tmteagle-eng.github.io/letter-me-this/"
            style={s.drawerCta}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Try the Dice Roller
          </a>
        </div>
      )}

      <style>{`
        nav a { transition: color 0.2s, border-color 0.2s; }
        nav a:hover { color: #20B2AA !important; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
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
    padding: '0 40px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 64,
    borderBottom: '2px solid #E85D3D',
    transition: 'background 0.3s, box-shadow 0.3s',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 10,
    textDecoration: 'none',
  },
  navLogo: {
    height: 48, width: 'auto',
  },
  brandName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18, letterSpacing: 3,
    color: '#fff',
  },
  links: {
    display: 'flex', alignItems: 'center', gap: 4,
    className: 'nav-links',
  },
  link: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: 13, fontWeight: 700, letterSpacing: '0.5px',
    textDecoration: 'none', padding: '4px 12px',
    paddingBottom: 2,
    transition: 'color 0.2s, border-color 0.2s',
  },
  ctaBtn: {
    marginLeft: 12,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 14, letterSpacing: 2,
    color: '#fff', background: '#E85D3D',
    padding: '8px 18px', borderRadius: 3,
    textDecoration: 'none', whiteSpace: 'nowrap',
  },
  hamburger: {
    display: 'none', flexDirection: 'column', gap: 5,
    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
    className: 'hamburger',
  },
  bar: {
    display: 'block', width: 24, height: 2,
    background: '#fff', borderRadius: 2,
    transition: 'transform 0.2s, opacity 0.2s',
  },
  drawer: {
    position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
    background: '#1a1a1a',
    borderBottom: '3px solid #E85D3D',
    display: 'flex', flexDirection: 'column',
    padding: '16px 24px 24px',
    gap: 4,
  },
  drawerLink: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: 16, fontWeight: 700,
    textDecoration: 'none',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  drawerCta: {
    marginTop: 12,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 16, letterSpacing: 2,
    color: '#fff', background: '#E85D3D',
    padding: '12px 20px', borderRadius: 3,
    textDecoration: 'none', textAlign: 'center',
  },
}
