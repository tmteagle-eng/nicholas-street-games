import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { colors, FONT_DISPLAY, FONT_BODY, ui } from '../styles/tokens'
import { formatPrice } from '../data/products'
import { useCart } from '../lib/cart'

// Mirrors the server-side rule in pages/api/checkout.js.
const SHIPPING_FLAT_CENTS = 500
const FREE_SHIPPING_MIN_QTY = 2

export default function Cart() {
  const { lines, subtotal, count, setQty, removeFromCart } = useCart()
  const [status, setStatus] = useState(null) // null | 'loading' | 'soon' | 'error'

  const freeShipping = count >= FREE_SHIPPING_MIN_QTY
  const shippingCents = freeShipping ? 0 : SHIPPING_FLAT_CENTS

  const handleCheckout = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map((l) => ({ id: l.product.id, qty: l.qty })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.url) {
        window.location.href = data.url // Stripe Checkout, once wired
      } else {
        setStatus('soon')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Head>
        <title>Your Cart — Nicholas Street Games</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section style={s.wrap}>
        <div style={s.inner}>
          <p style={ui.eyebrow}>Your Cart</p>
          <h1 style={s.title}>{count > 0 ? `${count} item${count === 1 ? '' : 's'} ready` : 'Your cart is empty'}</h1>

          {count === 0 ? (
            <div style={s.empty}>
              <p style={{ ...ui.body, marginBottom: 20 }}>Nothing here yet. Let’s fix that.</p>
              <Link href="/shop" style={ui.btnPrimary}>Browse the Shop</Link>
            </div>
          ) : (
            <div style={s.layout}>
              {/* Line items */}
              <div style={s.lines}>
                {lines.map(({ product, qty, lineTotal }) => (
                  <div key={product.id} style={s.line}>
                    <div style={{ ...s.lineThumb, background: `${product.color}1f`, borderColor: `${product.color}55` }}>
                      <span style={{ fontSize: 30 }} role="img" aria-label="">{product.emoji}</span>
                    </div>
                    <div style={s.lineMain}>
                      <div style={s.lineName}>{product.name}</div>
                      <div style={s.lineUnit}>{formatPrice(product.price)} each</div>
                      <button style={s.remove} onClick={() => removeFromCart(product.id)}>Remove</button>
                    </div>
                    <div style={s.qtyBox}>
                      <button style={s.qtyBtn} onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease">–</button>
                      <span style={s.qtyNum}>{qty}</span>
                      <button style={s.qtyBtn} onClick={() => setQty(product.id, qty + 1)} aria-label="Increase">+</button>
                    </div>
                    <div style={s.lineTotal}>{formatPrice(lineTotal)}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <aside style={s.summary}>
                {count === 1 && (
                  <div style={s.upsell}>
                    <span style={s.upsellText}>
                      🚚 You&apos;re <b>one item away</b> from free shipping — add a second{' '}
                      {lines[0].product.name} and skip the {formatPrice(SHIPPING_FLAT_CENTS)}.
                    </span>
                    <button
                      style={s.upsellBtn}
                      onClick={() => setQty(lines[0].product.id, lines[0].qty + 1)}
                    >
                      + Add one more
                    </button>
                  </div>
                )}

                <div style={s.sumRow}><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div style={freeShipping ? s.sumRowFree : s.sumRowMuted}>
                  <span>Shipping &amp; handling</span>
                  <span>{freeShipping ? 'FREE 🎉' : formatPrice(shippingCents)}</span>
                </div>
                <div style={s.sumRowMuted}><span>Tax</span><span>Calculated at checkout</span></div>
                <div style={s.sumDivider} />
                <div style={s.sumTotal}><span>Total</span><span>{formatPrice(subtotal + shippingCents)}</span></div>

                <button style={ui.btnPrimary} onClick={handleCheckout} disabled={status === 'loading'}>
                  {status === 'loading' ? 'One moment…' : 'Checkout'}
                </button>

                {status === 'soon' && (
                  <p style={s.notice}>
                    🛠️ Online checkout is coming soon. To order now, email{' '}
                    <a href="mailto:info@nicholasstreetgames.com" style={{ color: colors.tealInk }}>info@nicholasstreetgames.com</a>{' '}
                    with your cart and we’ll take care of you.
                  </p>
                )}
                {status === 'error' && (
                  <p style={s.notice}>Something went wrong. Please try again in a moment.</p>
                )}

                <Link href="/shop" style={{ ...ui.btnGhost, marginTop: 14, textAlign: 'center' }}>Keep Shopping</Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

const s = {
  wrap: { minHeight: 'calc(100vh - 64px)', padding: '72px 24px 96px', background: colors.ground },
  inner: { maxWidth: 960, margin: '0 auto' },
  title: { fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(30px,5vw,48px)', color: colors.ink, letterSpacing: '-0.01em', marginBottom: 32 },
  empty: { background: colors.white, border: `1.5px solid ${colors.hair}`, borderRadius: 20, padding: '48px 32px', textAlign: 'center' },
  layout: { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 28, alignItems: 'start' },
  lines: { display: 'flex', flexDirection: 'column', gap: 14 },
  line: {
    display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 18, alignItems: 'center',
    background: colors.white, border: `1.5px solid ${colors.hair}`, borderRadius: 16, padding: '16px 18px',
  },
  lineThumb: { width: 64, height: 64, borderRadius: 12, display: 'grid', placeItems: 'center', border: '1.5px solid' },
  lineMain: { display: 'flex', flexDirection: 'column', gap: 2 },
  lineName: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, color: colors.ink },
  lineUnit: { fontFamily: FONT_BODY, fontSize: 13, color: colors.inkFaint },
  remove: { alignSelf: 'flex-start', marginTop: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: FONT_BODY, fontSize: 13, fontWeight: 700, color: colors.coralInk },
  qtyBox: { display: 'flex', alignItems: 'center', gap: 10, border: `1.5px solid ${colors.hair}`, borderRadius: 999, padding: '4px 8px' },
  qtyBtn: { width: 26, height: 26, borderRadius: '50%', border: 'none', background: colors.mint, color: colors.ink, cursor: 'pointer', fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 16, lineHeight: 1 },
  qtyNum: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, minWidth: 18, textAlign: 'center' },
  lineTotal: { fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 18, color: colors.ink },
  summary: { background: colors.white, border: `1.5px solid ${colors.hair}`, borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 88 },
  upsell: {
    display: 'flex', flexDirection: 'column', gap: 10,
    background: `${colors.teal}14`, border: `1.5px solid ${colors.teal}55`,
    borderRadius: 14, padding: '14px 16px', marginBottom: 4,
  },
  upsellText: { fontFamily: FONT_BODY, fontSize: 13.5, color: colors.ink, lineHeight: 1.55 },
  upsellBtn: {
    alignSelf: 'flex-start',
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13.5,
    color: '#fff', background: colors.teal, border: 'none', cursor: 'pointer',
    padding: '8px 16px', borderRadius: 999,
  },
  sumRowFree: { display: 'flex', justifyContent: 'space-between', fontFamily: FONT_BODY, fontSize: 13.5, fontWeight: 800, color: colors.tealInk },
  sumRow: { display: 'flex', justifyContent: 'space-between', fontFamily: FONT_BODY, fontSize: 15, fontWeight: 700, color: colors.ink },
  sumRowMuted: { display: 'flex', justifyContent: 'space-between', fontFamily: FONT_BODY, fontSize: 13.5, color: colors.inkFaint },
  sumDivider: { height: 1, background: colors.hair, margin: '4px 0' },
  sumTotal: { display: 'flex', justifyContent: 'space-between', fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 20, color: colors.ink, marginBottom: 6 },
  notice: { fontFamily: FONT_BODY, fontSize: 13.5, color: colors.inkSoft, lineHeight: 1.6, background: colors.sun, borderRadius: 12, padding: '12px 14px' },
}
