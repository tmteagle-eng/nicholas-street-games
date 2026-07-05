import Head from 'next/head'
import Link from 'next/link'
import {
  colors, FONT_DISPLAY, FONT_BODY, ui, SLOGAN,
  LOGO_LMT, DICE_ROLLER_URL, INSTAGRAM_URL, TIKTOK_URL, CONTACT_EMAIL,
} from '../styles/tokens'

const STEPS = [
  { n: 1, color: colors.coral, title: 'Pick a Subject', body: 'One player becomes The Subject for the round — the person everyone will describe.' },
  { n: 2, color: colors.teal,  title: 'Roll the Dice', body: 'The player to the left rolls both dice. The alphabet die gives the letter; the number die gives how many words to write.' },
  { n: 3, color: colors.yellow, fg: '#4a3b00', title: 'Write Fast!', body: 'Everyone except The Subject writes words that start with that letter and describe them. 90 seconds. Only your first words count.' },
  { n: 4, color: colors.green, title: 'Reveal & Score', body: 'Read your words aloud. The Subject approves real words — 1 point each. If two players wrote the same word, nobody scores it.' },
  { n: 5, color: colors.blue,  title: 'Rotate', body: 'The next player becomes The Subject. Play on! Most points wins — or just play for laughs.' },
]

const INSIDE = [
  { qty: 1, label: '20-sided alphabet die' },
  { qty: 1, label: '6-sided number die' },
  { qty: 1, label: 'Dice canister' },
  { qty: 1, label: 'Writing pad (25 sheets)' },
  { qty: 6, label: 'Pencils' },
  { qty: 1, label: 'Pencil sharpener' },
  { qty: 1, label: 'Instruction sheet' },
]

const MODES = [
  { icon: '⏱️', color: colors.teal,   title: 'Challenge Mode',    body: '30-second timer for hardcore thinkers.' },
  { icon: '🍻', color: colors.coral,  title: 'Drinking Game Mode', body: 'Matching words? Take a drink.' },
  { icon: '🎲', color: colors.yellow, title: 'Double Score Rounds', body: 'Roll a Six and make it a double-point round.' },
  { icon: '🎂', color: colors.green,  title: 'Birthday Bash Mode', body: 'Pick a number of rounds to celebrate the guest of honor.' },
  { icon: '🔥', color: colors.blue,   title: 'Savage Mode',       body: 'Bonus points for brutally accurate or hilarious words.' },
  { icon: '🏷️', color: colors.teal,   title: 'Theme Words',       body: 'Pick a theme — holiday, event, product launch — and describe it.' },
]

const TESTIMONIALS = [
  { color: colors.teal,   tag: 'Family Game Night', quote: '“My mom wrote ‘sarcastic’ about my dad. He wrote ‘saint’ about her. We laughed for an hour.”', by: 'The Rodriguez Family, Phoenix AZ' },
  { color: colors.coral,  tag: 'New Friends',       quote: '“Ten minutes in, I knew Marcus better than most of my coworkers. ‘Awkward’ has four synonyms and he owns them all.”', by: 'Jen, first-time housewarming guest' },
  { color: colors.yellow, tag: 'Old Friends',       quote: '“Twenty years of friendship and I never knew Katie thought I was ‘reliable.’ Which hurts more than ‘chaotic’ would have.”', by: 'Amanda, Girls Weekend, Napa' },
  { color: colors.blue,   tag: 'In Memory',         quote: '“We honored Grandma with a tribute round. Somewhere between ‘H for hilarious’ and ‘K for kind,’ we were laughing and crying at once. She would have loved it.”', by: 'The Whitfield Cousins' },
  { color: colors.green,  tag: 'Team Bonding',      quote: '“I watched my VP write ‘terrifying’ about our CEO. Nobody scored it — we all wrote the same thing. Best offsite ever.”', by: 'Priya, Marketing Director' },
  { color: colors.coral,  tag: 'Just Plain Fun!',   quote: '“Roll a P. Three words. My brother said ‘petty’ and now it’s tattooed on my forehead until Christmas.”', by: 'Danny, every Tuesday night' },
]

export default function LetterMeThis() {
  return (
    <>
      <Head>
        <title>Letter Me This! — The Party Game Where Your Friends Define You</title>
        <meta name="description" content="Letter Me This! is the party game where your friends define you. Roll. Write. Reveal. Laugh. 3–8 players, ages 14+, 20+ minutes of chaos." />
      </Head>

      {/* ── 1 · HERO ── */}
      <section style={s.hero}>
        <span style={{ ...s.dot, width: 14, height: 14, background: colors.yellow, top: 70, left: '9%' }} />
        <span style={{ ...s.dot, width: 11, height: 11, background: colors.coral, top: 120, right: '12%' }} />
        <span style={{ ...s.dot, width: 12, height: 12, background: colors.green, bottom: 90, left: '18%' }} />
        <span style={{ ...s.dot, width: 10, height: 10, background: colors.teal, top: 60, right: '30%' }} />

        <div style={s.heroInner}>
          <img src={LOGO_LMT} alt="Letter Me This!" style={s.heroLogo} />
          <p style={s.heroTagline}>The party game where your friends define you.</p>

          <p style={s.slogan}>
            {SLOGAN.map(({ word, color }, i) => (
              <span key={word} style={{ color, marginRight: i < SLOGAN.length - 1 ? 12 : 0 }}>{word}</span>
            ))}
          </p>

          <div style={s.pillRow}>
            <span style={ui.pill(colors.teal)}>3–8 Players</span>
            <span style={ui.pill(colors.coral)}>Ages 14+</span>
            <span style={ui.pill(colors.green)}>20+ Min</span>
          </div>

          <div style={s.heroBtns}>
            <Link href="/buy" style={ui.btnPrimary}>Buy the Game</Link>
            <Link href="/nickie" style={ui.btnTeal}>✨ Chat with Nickie</Link>
            <a href={DICE_ROLLER_URL} style={ui.btnGhost} target="_blank" rel="noopener noreferrer">Try the Dice Roller</a>
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── 2 · HOW TO PLAY ── */}
      <section style={{ ...s.section, background: colors.white }}>
        <div style={s.inner}>
          <p style={ui.eyebrow}>How to Play</p>
          <h2 style={ui.h2}>Simple to learn. Impossible to play quietly.</h2>

          <div style={s.steps}>
            {STEPS.map((step) => (
              <div key={step.n} style={s.stepCard}>
                <div style={{ ...s.stepNum, background: step.color, color: step.fg || '#fff' }}>{step.n}</div>
                <div>
                  <div style={s.stepTitle}>{step.title}</div>
                  <p style={s.stepBody}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={s.approved}>
            <div style={s.approvedHead}>What counts as an approved word?</div>
            <ul style={s.checkList}>
              <li style={s.checkItem}><span style={s.check}>✓</span> A real word (in the dictionary).</li>
              <li style={s.checkItem}><span style={s.check}>✓</span> Truly describes The Subject — even if unflattering.</li>
              <li style={s.checkItem}><span style={s.check}>✓</span> Minor misspellings still count — it’s a party game, not a spelling bee.</li>
            </ul>
            <p style={s.approvedNote}>When in doubt, majority rules.</p>
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── 3 · WHAT'S INSIDE ── */}
      <section style={{ ...s.section, background: colors.mint }}>
        <div style={s.inner}>
          <p style={ui.eyebrow}>What&apos;s Inside</p>
          <h2 style={ui.h2}>Everything you need in one canister.</h2>
          <div style={s.insideGrid}>
            {INSIDE.map((item) => (
              <div key={item.label} style={s.insideItem}>
                <span style={s.qty}>{item.qty}</span>
                <span style={s.insideLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · ENDLESS WAYS TO PLAY ── */}
      <section style={{ ...s.section, background: colors.white }}>
        <div style={s.inner}>
          <p style={ui.eyebrow}>Endless Ways to Play</p>
          <h2 style={ui.h2}>So many ways to play — pick from the list or invent your own.</h2>
          <div style={s.modeGrid}>
            {MODES.map((m) => (
              <div key={m.title} style={{ ...s.modeCard, borderTop: `4px solid ${m.color}` }}>
                <span style={s.modeIcon}>{m.icon}</span>
                <div style={s.modeTitle}>{m.title}</div>
                <p style={s.modeBody}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · MEET NICKIE ── */}
      <section style={{ ...s.section, background: colors.deepTeal }}>
        <div style={{ ...s.inner, maxWidth: 760, textAlign: 'center' }}>
          <div style={s.nickieBadge}>✨ Preview Available</div>
          <h2 style={{ ...ui.h2, color: '#fff' }}>Meet Nickie — your AI Game Master.</h2>
          <p style={{ ...ui.lead, color: '#B9DAD8', margin: '18px auto 0', maxWidth: '52ch' }}>
            Endless rule variations, brand-new modes, and mid-game debates — settled.
            Nickie is the friendly AI game master built right into Letter Me This! Ask a question,
            invent a mode, or let Nickie referee that word you swear is real.
          </p>
          <div style={s.nickieChips}>
            <span style={s.nickieChip}>Rule variations</span>
            <span style={s.nickieChip}>New modes on demand</span>
            <span style={s.nickieChip}>Debates, settled</span>
          </div>
          <div style={{ marginTop: 28 }}>
            <Link href="/nickie" style={{ ...ui.btnPrimary, background: '#fff', color: colors.deepTeal }}>
              Chat with Nickie — Preview
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6 · TESTIMONIALS ── */}
      <section style={{ ...s.section, background: colors.ground }}>
        <div style={s.inner}>
          <p style={ui.eyebrow}>In Their Own Words</p>
          <h2 style={ui.h2}>Players keep gathering ’round.</h2>
          <div style={s.testGrid}>
            {TESTIMONIALS.map((t) => (
              <div key={t.tag} style={{ ...s.testCard, borderTop: `4px solid ${t.color}` }}>
                <div style={{ ...s.testTag, color: t.color }}>{t.tag}</div>
                <p style={s.testQuote}>{t.quote}</p>
                <div style={s.testBy}>— {t.by}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 · BUY / CTA ── */}
      <section style={{ ...s.section, background: colors.sun, textAlign: 'center' }}>
        <div style={{ ...s.inner, maxWidth: 640 }}>
          <p style={ui.eyebrow}>Ready to Play?</p>
          <h2 style={ui.h2}>Get Letter Me This!</h2>
          <p style={{ ...ui.lead, margin: '16px auto 0' }}>
            We’re getting ready to launch. Grab the dice roller now, and follow along to be the first to know when the game drops.
          </p>
          <div style={{ ...s.heroBtns, justifyContent: 'center', marginTop: 32 }}>
            <Link href="/buy" style={ui.btnPrimary}>Coming Soon</Link>
            <a href={DICE_ROLLER_URL} style={ui.btnTeal} target="_blank" rel="noopener noreferrer">Try the Dice Roller</a>
          </div>
          <div style={s.socialRow}>
            <a href={INSTAGRAM_URL} style={s.socialLink} target="_blank" rel="noopener noreferrer">Instagram · @lettermethisgame</a>
            <a href={TIKTOK_URL} style={s.socialLink} target="_blank" rel="noopener noreferrer">TikTok · @lettermethis1</a>
            <a href={`mailto:${CONTACT_EMAIL}`} style={s.socialLink}>{CONTACT_EMAIL}</a>
          </div>
        </div>
      </section>

      <style>{`
        .mode-card { transition: transform 0.18s; }
        @media (max-width: 720px) {
          .step-card { flex-direction: row !important; }
        }
      `}</style>
    </>
  )
}

const s = {
  hero: {
    position: 'relative', overflow: 'hidden',
    padding: '92px 24px 72px',
    background: `
      radial-gradient(60% 80% at 12% 8%, ${colors.teal}22 0%, transparent 60%),
      radial-gradient(50% 70% at 92% 18%, ${colors.coral}1f 0%, transparent 60%),
      radial-gradient(60% 60% at 78% 98%, ${colors.yellow}2b 0%, transparent 60%),
      ${colors.ground}`,
    textAlign: 'center',
  },
  dot: { position: 'absolute', borderRadius: '50%' },
  heroInner: { maxWidth: 760, margin: '0 auto', position: 'relative' },
  heroLogo: { width: 'min(360px, 78%)', height: 'auto', margin: '0 auto 24px', filter: 'drop-shadow(0 10px 28px rgba(20,40,35,0.12))' },
  heroTagline: {
    fontFamily: FONT_BODY, fontStyle: 'italic', fontWeight: 700,
    fontSize: 'clamp(18px,2.6vw,24px)', color: colors.ink, marginBottom: 24,
  },
  slogan: {
    fontFamily: FONT_DISPLAY, fontWeight: 800,
    fontSize: 'clamp(30px,5.5vw,52px)', letterSpacing: '-0.01em',
    lineHeight: 1.1, marginBottom: 28,
  },
  pillRow: { display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 },
  heroBtns: { display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' },

  section: { padding: '80px 24px' },
  inner: { maxWidth: 1000, margin: '0 auto' },

  steps: {
    marginTop: 40,
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18,
  },
  stepCard: {
    display: 'flex', gap: 16, alignItems: 'flex-start',
    background: colors.ground, border: `1.5px solid ${colors.hair}`,
    borderRadius: 18, padding: '22px 22px',
  },
  stepNum: {
    flex: '0 0 auto', width: 40, height: 40, borderRadius: '50%',
    display: 'grid', placeItems: 'center',
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 19,
  },
  stepTitle: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: colors.ink, marginBottom: 4 },
  stepBody: { fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.6, color: colors.inkSoft },

  approved: {
    marginTop: 28, background: colors.sun,
    border: `1.5px solid ${colors.yellow}66`, borderRadius: 18, padding: '24px 26px',
  },
  approvedHead: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 19, color: colors.ink, marginBottom: 12 },
  checkList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 },
  checkItem: { fontFamily: FONT_BODY, fontSize: 15.5, color: colors.inkSoft, display: 'flex', gap: 10, alignItems: 'flex-start' },
  check: { color: colors.green, fontWeight: 800 },
  approvedNote: { fontFamily: FONT_BODY, fontStyle: 'italic', fontWeight: 700, color: colors.ink, marginTop: 14 },

  insideGrid: {
    marginTop: 40,
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14,
  },
  insideItem: {
    display: 'flex', alignItems: 'center', gap: 14,
    background: colors.white, border: `1.5px solid ${colors.hair}`,
    borderRadius: 14, padding: '16px 18px',
  },
  qty: {
    flex: '0 0 auto', minWidth: 34, height: 34, padding: '0 6px', borderRadius: '50%',
    background: colors.teal, color: '#fff',
    display: 'grid', placeItems: 'center',
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 16,
  },
  insideLabel: { fontFamily: FONT_BODY, fontWeight: 700, fontSize: 15.5, color: colors.ink },

  modeGrid: {
    marginTop: 40,
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 18,
  },
  modeCard: {
    background: colors.ground, border: `1.5px solid ${colors.hair}`,
    borderRadius: 18, padding: '24px 22px',
    boxShadow: '0 8px 22px rgba(20,40,35,0.05)',
    className: 'mode-card',
  },
  modeIcon: { fontSize: 30, display: 'block', marginBottom: 12 },
  modeTitle: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: colors.ink, marginBottom: 6 },
  modeBody: { fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.6, color: colors.inkSoft },

  nickieBadge: {
    display: 'inline-block', background: '#ffffff22', color: '#EAF6F5',
    border: '1.5px solid #ffffff33', borderRadius: 999,
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, letterSpacing: '0.06em',
    padding: '7px 16px', marginBottom: 18,
  },
  nickieChips: { display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 26 },
  nickieChip: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14,
    color: '#0C5C63', background: '#EAF6F5', borderRadius: 999, padding: '8px 16px',
  },

  testGrid: {
    marginTop: 40,
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18,
  },
  testCard: {
    background: colors.white, border: `1.5px solid ${colors.hair}`,
    borderRadius: 18, padding: '24px 24px',
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  testTag: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17 },
  testQuote: { fontFamily: FONT_BODY, fontSize: 15.5, lineHeight: 1.65, color: colors.ink },
  testBy: { fontFamily: FONT_BODY, fontWeight: 700, fontSize: 13, color: colors.inkFaint, marginTop: 'auto' },

  socialRow: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 32 },
  socialLink: { fontFamily: FONT_BODY, fontWeight: 700, fontSize: 15, color: colors.tealInk, textDecoration: 'none' },
}
