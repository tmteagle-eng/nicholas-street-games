import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { colors, FONT_DISPLAY, FONT_BODY, ui } from '../styles/tokens'
import { products, formatPrice } from '../data/products'
import { addToCart, useCart } from '../lib/cart'

const TYPE_LABEL = { game: 'The Game', merch: 'Merch', accessory: 'Add-ons' }

export default function Shop() {
  const { count } = useCart()
  const [added, setAdded] = useState(null)

  const handleAdd = (id) => {
    addToCart(id, 1)
    setAdded(id)
    setTimeout(() => setAdded((cur) => (cur === id ? null : cur)), 1200)
  }

  return (
    <>
      <Head>
        <title>Shop — Nicholas Street Games</title>
        <meta name="description" content="Buy Letter Me This! and Nicholas Street Games merchandise — the game, tees, caps, stickers, and more." />
      </Head>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={ui.eyebrow}>Shop</p>
          <h1 style={s.title}>Get the game. Wear the brand.</h1>
          <p style={{ ...ui.lead, margin: '14px auto 0' }}>
            Letter Me This! plus a growing lineup of Nicholas Street Games merch.
          </p>
          {count > 0 && (
            <Link href="/cart" style={{ ...ui.btnTeal, marginTop: 24 }}>
              View Cart ({count}) →
            </Link>
          )}
        </div>
      </section>

      <div className="color-bar" />

      {/* ── PRODUCT GRID ── */}
      <section style={{ ...s.section, background: colors.white }}>
        <div style={s.inner}>
          <div style={s.grid}>
            {products.map((p) => (
              <div key={p.id} style={s.card}>
                <div style={{ ...s.thumb, background: p.image ? colors.white : `${p.color}1f`, borderColor: `${p.color}55` }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={s.thumbImg} />
                  ) : (
                    <span style={{ fontSize: 56 }} role="img" aria-label={p.name}>{p.emoji}</span>
                  )}
                  {p.badge && <span style={{ ...s.badge, background: p.color }}>{p.badge}</span>}
                  <span style={s.typeTag}>{TYPE_LABEL[p.type] || 'Item'}</span>
                  <div style={s.soonWash} aria-hidden="true" />
                  <span style={s.soonSticker}>Coming Soon</span>
                </div>
                <div style={s.cardBody}>
                  <h3 style={s.name}>{p.name}</h3>
                  <p style={s.tagline}>{p.tagline}</p>
                  <div style={s.cardFoot}>
                    <span style={s.price}>{formatPrice(p.price)}</span>
                    <button
                      style={{ ...s.addBtn, background: added === p.id ? colors.green : colors.coral }}
                      onClick={() => handleAdd(p.id)}
                    >
                      {added === p.id ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p style={s.disclaimer}>
            Pricing shown is placeholder pending confirmation. Online checkout is
            coming soon — see something you want now? Email{' '}
            <a href="mailto:info@nicholasstreetgames.com" style={{ color: colors.tealInk }}>info@nicholasstreetgames.com</a>.
          </p>
        </div>
      </section>
    </>
  )
}

const s = {
  hero: {
    padding: '84px 24px 60px', textAlign: 'center',
    background: `radial-gradient(60% 80% at 80% 8%, ${colors.coral}1a 0%, transparent 60%), radial-gradient(50% 70% at 15% 20%, ${colors.teal}1a 0%, transparent 60%), ${colors.ground}`,
  },
  title: {
    fontFamily: FONT_DISPLAY, fontWeight: 800,
    fontSize: 'clamp(36px,6vw,60px)', color: colors.ink, letterSpacing: '-0.01em',
    lineHeight: 1.05, textWrap: 'balance',
  },
  section: { padding: '72px 24px' },
  inner: { maxWidth: 1040, margin: '0 auto' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 22,
  },
  card: {
    background: colors.white, border: `1.5px solid ${colors.hair}`,
    borderRadius: 20, overflow: 'hidden', boxShadow: '0 10px 26px rgba(20,40,35,0.06)',
    display: 'flex', flexDirection: 'column',
  },
  thumb: {
    position: 'relative', height: 180, display: 'grid', placeItems: 'center',
    borderBottom: '1.5px solid', overflow: 'hidden',
  },
  thumbImg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', objectPosition: 'center 42%',
  },
  badge: {
    position: 'absolute', top: 12, left: 12, color: '#fff',
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 12, letterSpacing: '0.04em',
    padding: '4px 12px', borderRadius: 999,
  },
  typeTag: {
    position: 'absolute', top: 12, right: 12, color: colors.inkSoft, background: '#ffffffcc',
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 11, letterSpacing: '0.06em',
    textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999,
  },
  soonWash: {
    position: 'absolute', inset: 0,
    background: 'rgba(251,250,245,0.45)',
  },
  soonSticker: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%,-50%) rotate(-8deg)',
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 17, letterSpacing: '0.02em',
    color: '#fff', background: colors.coral,
    padding: '9px 20px', borderRadius: 999,
    border: '3px solid #fff',
    boxShadow: '0 6px 18px rgba(20,40,35,0.22)',
    whiteSpace: 'nowrap',
  },
  cardBody: { padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 },
  name: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 21, color: colors.ink },
  tagline: { fontFamily: FONT_BODY, fontSize: 14, color: colors.inkSoft, lineHeight: 1.5, flex: 1 },
  cardFoot: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  price: { fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 22, color: colors.ink },
  addBtn: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, letterSpacing: '0.01em',
    color: '#fff', border: 'none', cursor: 'pointer',
    padding: '10px 18px', borderRadius: 999, transition: 'background 0.2s',
  },
  disclaimer: {
    marginTop: 36, textAlign: 'center', fontFamily: FONT_BODY, fontSize: 13.5,
    color: colors.inkFaint, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6,
  },
}
