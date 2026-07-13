import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { colors, FONT_DISPLAY, ui } from '../../styles/tokens'
import { clearCart } from '../../lib/cart'

export default function OrderSuccess() {
  // The buyer only lands here after Stripe confirms payment.
  useEffect(() => {
    clearCart()
  }, [])

  return (
    <>
      <Head>
        <title>Order Confirmed — Nicholas Street Games</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section style={s.wrap}>
        <div style={s.card}>
          <div style={s.badge} aria-hidden="true">🎉</div>
          <p style={ui.eyebrow}>Order Confirmed</p>
          <h1 style={s.title}>You&apos;re all set!</h1>
          <p style={{ ...ui.lead, margin: '0 auto 10px' }}>
            Thanks for your order — a receipt is on its way to your inbox.
          </p>
          <p style={{ ...ui.body, margin: '0 auto 32px', color: '#5c6f75' }}>
            We&apos;ll pack it up and ship it out within a few business days.
            Questions? Email info@nicholasstreetgames.com.
          </p>
          <div style={s.actions}>
            <Link href="/shop" style={ui.btnPrimary}>Keep Shopping</Link>
            <Link href="/letter-me-this" style={ui.btnGhost}>How to Play</Link>
          </div>
        </div>
      </section>
    </>
  )
}

const s = {
  wrap: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    background: colors.cream,
  },
  card: {
    maxWidth: 560,
    textAlign: 'center',
  },
  badge: {
    fontSize: 56,
    marginBottom: 18,
  },
  title: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: 'clamp(34px, 6vw, 52px)',
    color: colors.ink,
    margin: '6px 0 14px',
  },
  actions: {
    display: 'flex',
    gap: 14,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}
