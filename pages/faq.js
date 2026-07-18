import Head from 'next/head'
import Link from 'next/link'
import { colors, FONT_DISPLAY, FONT_BODY, ui } from '../styles/tokens'

// One source of truth for the Q&A content — rendered on the page AND emitted as
// FAQPage JSON-LD so Google can show rich results. Keep both in sync by editing
// only this array.
const SECTIONS = [
  {
    title: 'The Game',
    color: colors.teal,
    items: [
      {
        q: 'What is Letter Me This!?',
        a: 'The party game where your friends define you. One player becomes The Subject, everyone rolls a letter and writes words that describe them, then the reveal — unique words score. Roll. Write. Reveal. Laugh.',
      },
      {
        q: 'How many players? How long?',
        a: '3–8+ players, about 20 minutes a game. Best with 4 or more — more players, more surprising answers.',
      },
      {
        q: 'Do I need to be a word person?',
        a: 'Nope. If you can describe your friend in one word, you can play. The funniest answers are never the fanciest ones.',
      },
      {
        q: "Why doesn't the letter die have Q, X, or Z?",
        a: 'We tested them — nobody wants to describe their best friend starting with X. The die carries the 20 most playable letters so every roll keeps the game moving.',
      },
    ],
  },
  {
    title: 'Family & Ages',
    color: colors.green,
    items: [
      {
        q: 'Is it family-friendly?',
        a: 'Proudly. The base game is completely clean, and kids playing alongside parents and grandparents is one of our favorite ways to see it played — hearing what a kid writes about mom or dad is half the fun.',
      },
      {
        q: 'Then what does Ages 14+ mean?',
        a: "That's who we designed and market the game for — teens and adults. It's not a restriction on who can sit at your table; every group decides how it plays, and parents know their kids best. The one hard rule is safety: the game contains small parts (dice) and is not for children under 3.",
      },
      {
        q: 'Is there adult content?',
        a: "Only if your group chooses it. The adult modes — Drinking Game Mode and Savage Mode — are optional and clearly marked. Skip them and it's family night.",
      },
    ],
  },
  {
    title: 'Groups & Events',
    color: colors.coral,
    items: [
      {
        q: 'Is it a good fit for corporate team building?',
        a: "One of the best. It's a fast icebreaker with no setup, and Theme Words mode lets the room describe anything — the new product, the offsite, the boss (brave choice). A facilitator runs the rounds, sets the tone, and picks the modes — your group, your rules. Ask Nickie for hosting ideas sized to your headcount.",
      },
      {
        q: 'What about church groups, Bible studies, or homeschool co-ops?',
        a: 'Yes — ask Nickie about Bible Mode, where The Subject becomes a favorite Bible character, hymn, or story, and the reveals double as discussion starters. Like every group setting, it plays best facilitator-led: an adult runs the round and chooses the modes that fit.',
      },
    ],
  },
  {
    title: 'In the Canister',
    color: colors.yellowInk,
    items: [
      {
        q: "What's in the package?",
        a: 'A 20-sided letter die, a number die, a writing pad, 6 pencils, a pencil sharpener, and illustrated instructions — packed in a printed canister that doubles as permanent storage. No flimsy box to crush in the closet.',
      },
      {
        q: 'What happens when the pad runs out?',
        a: 'Any paper works — or print fresh score sheets and player word sheets free at nicholasstreetgames.com/sheets.',
      },
      {
        q: 'Who is Nickie?',
        a: 'Our squishy teal d20 mascot and AI Game Master. Rules questions, house-rule ideas, mode suggestions for your exact group — Nickie answers on the spot at nicholasstreetgames.com/nickie.',
      },
    ],
  },
  {
    title: 'Ordering & Contact',
    color: colors.blue,
    items: [
      {
        q: 'Where can I buy it, and what does it cost?',
        a: '$24.95, on Amazon and at nicholasstreetgames.com. We currently ship within the U.S.',
      },
      {
        q: 'What if my order arrives damaged?',
        a: "Email info@nicholasstreetgames.com with a photo and your order info — we'll make it right.",
      },
      {
        q: 'Press, wholesale, or want us on your podcast?',
        a: 'Email info@nicholasstreetgames.com. Yes, yes, and yes please.',
      },
    ],
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SECTIONS.flatMap((sec) =>
    sec.items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    }))
  ),
}

export default function Faq() {
  return (
    <>
      <Head>
        <title>FAQ — Letter Me This! | Nicholas Street Games</title>
        <meta
          name="description"
          content="Everything you want to know about Letter Me This! — players, family-friendly play, game modes, corporate and church groups, what's in the canister, and ordering."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      {/* ── PAGE HERO ── */}
      <section style={s.pageHero}>
        <p style={ui.eyebrow}>Good Questions</p>
        <h1 style={s.pageTitle}>Frequently Asked Questions</h1>
        <p style={{ ...ui.lead, margin: '18px auto 0', textAlign: 'center' }}>
          The short answers are below. For answers about <em>your</em> table,{' '}
          <Link href="/nickie" style={s.inlineLink}>ask Nickie</Link> — that&apos;s
          literally what they&apos;re here for.
        </p>
      </section>

      <div className="color-bar" />

      {/* ── FAQ SECTIONS ── */}
      <section style={{ ...s.section, background: colors.white }}>
        <div style={s.faqWrap}>
          {SECTIONS.map(({ title, color, items }) => (
            <div key={title} style={{ marginBottom: 46 }}>
              <h2 style={{ ...s.sectionTitle, color: colors.ink }}>
                <span style={{ ...s.titleDot, background: color }} />
                {title}
              </h2>
              {items.map(({ q, a }) => (
                <details key={q} style={s.item}>
                  <summary style={s.q}>{q}</summary>
                  <p style={s.a}>{a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── ASK NICKIE CTA ── */}
      <section style={{ ...s.section, background: colors.deepTeal, textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ ...ui.eyebrow, color: colors.yellow }}>Still Wondering?</p>
          <h2 style={{ ...ui.h2, color: '#fff' }}>Don&apos;t scroll. Ask.</h2>
          <p style={{ ...ui.lead, color: '#B9DAD8', margin: '20px auto 30px' }}>
            Nickie — our AI Game Master — has answers for your exact group: rules calls,
            house-rule ideas, and the right modes for your table.
          </p>
          <Link href="/nickie" style={ui.btnPrimary}>Ask Nickie →</Link>
        </div>
      </section>

      <style>{`
        details[open] summary { color: ${colors.tealInk}; }
        details summary::-webkit-details-marker { display: none; }
        details summary::after {
          content: '+'; float: right; font-family: ${FONT_DISPLAY};
          font-weight: 700; font-size: 20px; color: ${colors.teal};
          transition: transform 0.2s;
        }
        details[open] summary::after { content: '–'; }
        details summary:hover { color: ${colors.tealInk}; }
      `}</style>
    </>
  )
}

const s = {
  pageHero: {
    padding: '84px 24px 60px', textAlign: 'center',
    background: `radial-gradient(60% 80% at 80% 10%, ${colors.teal}1a 0%, transparent 60%), ${colors.ground}`,
  },
  pageTitle: {
    fontFamily: FONT_DISPLAY, fontWeight: 800,
    fontSize: 'clamp(40px,7vw,72px)', color: colors.ink,
    letterSpacing: '-0.01em', lineHeight: 1.05, textWrap: 'balance',
  },
  inlineLink: { color: colors.tealInk, fontWeight: 700, textDecoration: 'underline' },
  section: { padding: '72px 24px' },
  faqWrap: { maxWidth: 840, margin: '0 auto' },
  sectionTitle: {
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 26,
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
  },
  titleDot: { width: 14, height: 14, borderRadius: 999, display: 'inline-block' },
  item: {
    background: colors.white, border: `1.5px solid ${colors.hair}`,
    borderRadius: 16, padding: '18px 22px', marginBottom: 12,
    boxShadow: '0 6px 18px rgba(20,40,35,0.05)',
  },
  q: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: colors.ink,
    cursor: 'pointer', listStyle: 'none', outline: 'none',
  },
  a: {
    fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.7, color: colors.inkSoft,
    marginTop: 12,
  },
}
