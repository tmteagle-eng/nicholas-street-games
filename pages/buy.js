import Head from 'next/head'
import Link from 'next/link'
import { colors, FONT_DISPLAY, FONT_BODY, ui, CONTACT_EMAIL } from '../styles/tokens'

const INSIDE = [
  { icon: '🎲', item: '20-sided alphabet die' },
  { icon: '🎲', item: '6-sided number die' },
  { icon: '📝', item: 'Writing pad (25 sheets)' },
  { icon: '✏️', item: '6 pencils + sharpener' },
  { icon: '📄', item: 'Instruction sheet' },
]

const SPECS = [
  ['Players',   '3 – 8+'],
  ['Ages',      '14+'],
  ['Play Time', '20+ min'],
  ['Timer',     '90 seconds'],
]

export default function Buy() {
  return (
    <>
      <Head>
        <title>Buy Letter Me This! — Nicholas Street Games</title>
        <meta name="description" content="Letter Me This! — the party game where your friends define you. Coming soon." />
      </Head>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <p style={ui.eyebrow}>Get the Game</p>
        <h1 style={s.title}>Letter Me This!</h1>
        <h2 style={s.comingSoon}>Coming Soon</h2>
        <p style={{ ...ui.lead, margin: '0 auto 32px', textAlign: 'center' }}>
          We’re putting the finishing touches on everything. Drop us a line and we’ll
          let you know the moment it’s available.
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`} style={ui.btnPrimary}>Get Notified</a>
      </section>

      <div className="color-bar" />

      {/* ── WHAT'S IN THE BOX ── */}
      <section style={{ ...s.section, background: colors.white }}>
        <div style={s.inner}>
          <p style={ui.eyebrow}>What&apos;s Inside</p>
          <h2 style={ui.h2}>Everything you need. Nothing you don’t.</h2>
          <div style={s.contentsGrid}>
            {INSIDE.map(({ icon, item }) => (
              <div key={item} style={s.contentCard}>
                <div style={s.contentIcon}>{icon}</div>
                <div style={s.contentItem}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAME SPECS ── */}
      <section style={{ ...s.section, background: colors.deepTeal }}>
        <div style={{ ...s.inner, maxWidth: 620 }}>
          <p style={{ ...ui.eyebrow, color: colors.yellow, textAlign: 'center' }}>Game Details</p>
          <h2 style={{ ...ui.h2, color: '#fff', textAlign: 'center', marginBottom: 32 }}>At a Glance</h2>
          <div style={s.specsGrid}>
            {SPECS.map(([label, val]) => (
              <div key={label} style={s.specRow}>
                <span style={s.specLabel}>{label}</span>
                <span style={s.specVal}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/letter-me-this" style={s.lightBtn}>Learn More</Link>
          </div>
        </div>
      </section>
    </>
  )
}

const s = {
  hero: {
    padding: '84px 24px 72px', textAlign: 'center',
    background: `radial-gradient(60% 80% at 50% 0%, ${colors.yellow}26 0%, transparent 60%), ${colors.ground}`,
  },
  title: {
    fontFamily: FONT_DISPLAY, fontWeight: 800,
    fontSize: 'clamp(44px,8vw,76px)', color: colors.ink, letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 10,
  },
  comingSoon: {
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(26px,4vw,42px)',
    color: colors.coral, marginBottom: 18,
  },
  section: { padding: '84px 24px' },
  inner: { maxWidth: 900, margin: '0 auto' },
  contentsGrid: {
    marginTop: 40,
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16,
  },
  contentCard: {
    background: colors.mint, borderRadius: 16, padding: '28px 20px',
    textAlign: 'center', borderTop: `3px solid ${colors.teal}`,
  },
  contentIcon: { fontSize: 30, marginBottom: 12 },
  contentItem: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, color: colors.ink },
  specsGrid: {
    background: '#ffffff10', border: '1px solid #ffffff1f', borderRadius: 14, overflow: 'hidden',
  },
  specRow: {
    display: 'flex', justifyContent: 'space-between', padding: '16px 24px',
    borderBottom: '1px solid #ffffff14',
  },
  specLabel: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, color: '#B9DAD8' },
  specVal: { fontFamily: FONT_BODY, fontSize: 16, fontWeight: 800, color: '#fff' },
  lightBtn: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16,
    background: '#fff', color: colors.deepTeal, padding: '13px 28px',
    borderRadius: 999, textDecoration: 'none', display: 'inline-block',
  },
}
