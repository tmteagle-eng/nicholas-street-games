import Head from 'next/head'
import Link from 'next/link'
import InventorVideo from '../components/InventorVideo'
import {
  colors, FONT_DISPLAY, FONT_BODY, ui, SLOGAN,
  LOGO_LMT, DICE_ROLLER_URL, INSTAGRAM_URL, TIKTOK_URL,
} from '../styles/tokens'

const STEPS = [
  { n: 1, color: colors.coral, title: 'Roll',   body: 'One die gives you a letter. The other gives you a number. That’s your challenge.' },
  { n: 2, color: colors.teal,  title: 'Write',  body: 'Everyone writes that many words about The Subject — all starting with that letter. You’ve got 90 seconds.' },
  { n: 3, color: colors.yellow, fg: '#4a3b00', title: 'Reveal', body: 'Read your words aloud. Unique approved words score a point. Duplicates score nothing.' },
  { n: 4, color: colors.green, title: 'Rotate', body: 'Pass The Subject to the next player and go again. Most points wins — or just play for the laughs.' },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Nicholas Street Games — Party Games for Real People</title>
        <meta name="description" content="Nicholas Street Games makes party games where your friends, family, and a little chaos come together. Home of Letter Me This!" />
      </Head>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <span style={{ ...s.dot, width: 14, height: 14, background: colors.yellow, top: 80, left: '10%' }} />
        <span style={{ ...s.dot, width: 11, height: 11, background: colors.coral, top: 130, right: '13%' }} />
        <span style={{ ...s.dot, width: 12, height: 12, background: colors.green, bottom: 90, left: '20%' }} />
        <span style={{ ...s.dot, width: 10, height: 10, background: colors.teal, top: 70, right: '32%' }} />

        <div style={s.heroInner}>
          <p className="fade-up-1" style={s.eyebrow}>Letter Me This!</p>
          <h1 className="fade-up-2" style={s.headline}>
            The party game where <span style={{ color: colors.coral }}>your friends define you.</span>
          </h1>
          <p className="fade-up-3" style={s.slogan}>
            {SLOGAN.map(({ word, color }, i) => (
              <span key={word} style={{ color, marginRight: i < SLOGAN.length - 1 ? 12 : 0 }}>{word}</span>
            ))}
          </p>
          <div className="fade-up-4" style={s.pillRow}>
            <span style={ui.pill(colors.teal)}>3–8 Players</span>
            <span style={ui.pill(colors.coral)}>Ages 14+</span>
            <span style={ui.pill(colors.green)}>20+ Min</span>
          </div>
          <div className="fade-up-4" style={s.heroBtns}>
            <Link href="/letter-me-this" style={ui.btnPrimary}>Meet Letter Me This!</Link>
            <a href={DICE_ROLLER_URL} style={ui.btnGhost} target="_blank" rel="noopener noreferrer">Try the Dice Roller</a>
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── GAME SPOTLIGHT ── */}
      <section style={{ ...s.section, background: colors.white }}>
        <div style={s.spotInner}>
          <div style={s.spotText}>
            <p style={ui.eyebrow}>Our First Game</p>
            <h2 style={ui.h2}>Letter Me This!</h2>
            <p style={{ ...ui.body, marginTop: 16 }}>
              Think <strong>Wordle and Yahtzee had a baby.</strong> Roll two dice — one gives you a letter,
              one gives you a number. Now write that many words about the person in the hot seat,
              all starting with that letter. Fast. Funny. Occasionally brutal.
            </p>
            <p style={{ ...ui.body, marginTop: 12, fontStyle: 'italic', color: colors.inkFaint }}>
              Unique approved words score a point. Matching words score nothing. Strategy lives in the chaos.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              <Link href="/letter-me-this" style={ui.btnPrimary}>Learn More</Link>
              <a href={DICE_ROLLER_URL} style={ui.btnGhost} target="_blank" rel="noopener noreferrer">Try the Dice Roller</a>
            </div>
          </div>
          <div className="spot-logo" style={s.spotLogo}>
            <img src={LOGO_LMT} alt="Letter Me This!" style={s.logoImg} />
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── ORIGIN STORY VIDEO ── */}
      <InventorVideo background={colors.sky} />

      {/* ── HOW IT WORKS ── */}
      <section style={{ ...s.section, background: colors.mint }}>
        <div style={s.inner}>
          <p style={{ ...ui.eyebrow, textAlign: 'center' }}>How It Works</p>
          <h2 style={{ ...ui.h2, textAlign: 'center' }}>Simple to learn. Impossible to play quietly.</h2>
          <div style={s.stepsGrid}>
            {STEPS.map((step) => (
              <div key={step.n} style={s.stepCard}>
                <div style={{ ...s.stepNum, background: step.color, color: step.fg || '#fff' }}>{step.n}</div>
                <div style={s.stepTitle}>{step.title}</div>
                <p style={s.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/letter-me-this" style={ui.btnTeal}>See the Full Game</Link>
          </div>
        </div>
      </section>

      {/* ── COMING SOON BANNER ── */}
      <section style={{ ...s.section, background: colors.deepTeal, textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <img src="/images/nsg-logo.png" alt="Nicholas Street Games" style={{ width: 180, height: 'auto', margin: '0 auto 20px' }} />
          <h2 style={{ ...ui.h2, color: '#fff' }}>Coming Soon.</h2>
          <p style={{ ...ui.lead, color: '#B9DAD8', margin: '16px auto 28px' }}>
            We’re getting ready to launch Letter Me This! Follow along to be the first to know.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={INSTAGRAM_URL} style={s.socialBtn} target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
            <a href={TIKTOK_URL} style={s.socialBtn} target="_blank" rel="noopener noreferrer">Follow on TikTok</a>
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── COMPANY TEASE ── */}
      <section style={{ ...s.section, background: colors.ground, textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={ui.eyebrow}>About Nicholas Street Games</p>
          <h2 style={ui.h2}>Games from a cul-de-sac in Southern California.</h2>
          <p style={{ ...ui.body, margin: '18px auto 0', maxWidth: '60ch' }}>
            Nicholas Street Games started the same way every good game does — around a table, with people
            you love, looking for something to do that didn’t involve staring at a screen.
            We’re building games for those moments. <em>Letter Me This!</em> is just the beginning.
          </p>
          <Link href="/about" style={{ ...ui.btnGhost, marginTop: 30 }}>Our Story</Link>
        </div>
      </section>

      <style>{`
        .spot-card:hover { transform: translateY(-4px); }
        @media (max-width: 760px) {
          .spot-inner { flex-direction: column !important; }
          .spot-logo  { display: none; }
        }
      `}</style>
    </>
  )
}

const s = {
  hero: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', padding: '80px 24px', position: 'relative', overflow: 'hidden',
    background: `
      radial-gradient(55% 70% at 12% 12%, ${colors.teal}22 0%, transparent 60%),
      radial-gradient(50% 60% at 90% 16%, ${colors.coral}1f 0%, transparent 60%),
      radial-gradient(60% 60% at 80% 95%, ${colors.yellow}2b 0%, transparent 60%),
      ${colors.ground}`,
  },
  dot: { position: 'absolute', borderRadius: '50%' },
  heroInner: { maxWidth: 780, position: 'relative' },
  eyebrow: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14,
    letterSpacing: '0.18em', color: colors.tealInk, marginBottom: 18, textTransform: 'uppercase',
  },
  headline: {
    fontFamily: FONT_DISPLAY, fontWeight: 800,
    fontSize: 'clamp(40px,7vw,76px)', color: colors.ink,
    lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 22, textWrap: 'balance',
  },
  slogan: {
    fontFamily: FONT_DISPLAY, fontWeight: 800,
    fontSize: 'clamp(24px,4vw,38px)', lineHeight: 1.1, marginBottom: 28,
  },
  pillRow: { display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 30 },
  heroBtns: { display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' },

  section: { padding: '88px 24px' },
  inner: { maxWidth: 1000, margin: '0 auto' },

  spotInner: {
    maxWidth: 1000, margin: '0 auto',
    display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap',
    className: 'spot-inner',
  },
  spotText: { flex: '1 1 400px' },
  spotLogo: { flex: '0 0 320px', display: 'flex', justifyContent: 'center' },
  logoImg: { width: 300, height: 'auto', filter: 'drop-shadow(0 10px 28px rgba(20,40,35,0.12))' },

  stepsGrid: {
    marginTop: 48,
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18,
  },
  stepCard: {
    background: colors.white, border: `1.5px solid ${colors.hair}`,
    borderRadius: 18, padding: '28px 24px',
    boxShadow: '0 8px 22px rgba(20,40,35,0.05)',
  },
  stepNum: {
    width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center',
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 20, marginBottom: 16,
  },
  stepTitle: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 22, color: colors.ink, marginBottom: 8 },
  stepBody: { fontFamily: FONT_BODY, fontSize: 15, color: colors.inkSoft, lineHeight: 1.65 },

  socialBtn: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, letterSpacing: '0.01em',
    background: '#fff', color: colors.deepTeal, padding: '13px 26px',
    borderRadius: 999, textDecoration: 'none', display: 'inline-block',
  },
}
