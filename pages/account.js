import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { colors, FONT_DISPLAY, FONT_BODY, ui } from '../styles/tokens'
import { useUser } from '../lib/useUser'

export default function Account() {
  const router = useRouter()
  const { user, loading, logout } = useUser()

  useEffect(() => {
    if (!loading && !user) router.replace('/login?next=/account')
  }, [loading, user, router])

  const handleLogout = async () => {
    await logout()
    router.replace('/')
  }

  return (
    <>
      <Head>
        <title>Your Account — Nicholas Street Games</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section style={s.wrap}>
        <div style={s.inner}>
          {loading || !user ? (
            <p style={ui.body}>Loading…</p>
          ) : (
            <>
              <p style={ui.eyebrow}>Your Account</p>
              <h1 style={s.title}>Welcome back 👋</h1>

              <div style={s.card}>
                <div style={s.row}><span style={s.label}>Email</span><span style={s.value}>{user.email}</span></div>
                <div style={s.divider} />
                <div style={s.row}>
                  <span style={s.label}>Plan</span>
                  <span style={{ ...ui.pill(colors.teal), textTransform: 'capitalize' }}>{user.plan}</span>
                </div>
              </div>

              {/* Nickie usage meter */}
              <div style={s.card}>
                <div style={s.usageHead}>
                  <span style={s.usageTitle}>Nickie questions</span>
                  <span style={s.usageCount}>{user.nickieRemaining} of {user.nickieLimit} left</span>
                </div>
                <div style={s.meter}>
                  <div style={{
                    ...s.meterFill,
                    width: `${Math.min(100, (user.nickieUsed / user.nickieLimit) * 100)}%`,
                    background: user.nickieRemaining === 0 ? colors.coral : colors.teal,
                  }} />
                </div>
                <p style={s.usageNote}>
                  {user.nickieRemaining > 0
                    ? 'Paid plans with more (or unlimited) questions are coming soon.'
                    : 'You’ve used all your questions on the free plan. Paid plans are coming soon.'}
                </p>
                <Link href="/nickie" style={{ ...ui.btnTeal, marginTop: 14 }}>Chat with Nickie</Link>
              </div>

              <button style={s.logout} onClick={handleLogout}>Sign out</button>
            </>
          )}
        </div>
      </section>
    </>
  )
}

const s = {
  wrap: { minHeight: 'calc(100vh - 64px)', padding: '72px 24px 96px', background: colors.ground },
  inner: { maxWidth: 560, margin: '0 auto' },
  title: { fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(30px,5vw,44px)', color: colors.ink, marginBottom: 28 },
  card: { background: colors.white, border: `1.5px solid ${colors.hair}`, borderRadius: 20, padding: 24, marginBottom: 18, boxShadow: '0 8px 22px rgba(20,40,35,0.05)' },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  label: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, color: colors.inkFaint, letterSpacing: '0.04em', textTransform: 'uppercase' },
  value: { fontFamily: FONT_BODY, fontWeight: 700, fontSize: 16, color: colors.ink },
  divider: { height: 1, background: colors.hair, margin: '16px 0' },
  usageHead: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 },
  usageTitle: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: colors.ink },
  usageCount: { fontFamily: FONT_BODY, fontWeight: 700, fontSize: 14, color: colors.inkSoft },
  meter: { height: 10, borderRadius: 999, background: colors.hair, overflow: 'hidden' },
  meterFill: { height: '100%', borderRadius: 999, transition: 'width 0.3s' },
  usageNote: { fontFamily: FONT_BODY, fontSize: 13.5, color: colors.inkFaint, marginTop: 12, lineHeight: 1.6 },
  logout: { marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT_BODY, fontWeight: 700, fontSize: 15, color: colors.coralInk },
}
