import Head from 'next/head'
import Link from 'next/link'
import { colors, FONT_DISPLAY, FONT_BODY, ui, LOGO_NSG } from '../styles/tokens'

export default function About() {
  return (
    <>
      <Head>
        <title>About — Nicholas Street Games</title>
        <meta name="description" content="Nicholas Street Games started on a cul-de-sac in Southern California where friends, families, and games came together." />
      </Head>

      {/* ── PAGE HERO ── */}
      <section style={s.pageHero}>
        <p style={ui.eyebrow}>Our Story</p>
        <h1 style={s.pageTitle}>About Nicholas Street Games</h1>
      </section>

      <div className="color-bar" />

      {/* ── ORIGIN STORY ── */}
      <section style={{ ...s.section, background: colors.white }}>
        <div style={s.storyGrid}>
          <div>
            <p style={ui.eyebrow}>Where It Started</p>
            <h2 style={ui.h2}>A cul-de-sac. A table. The right people.</h2>
            <p style={{ ...ui.body, marginTop: 20 }}>
              Nicholas Street is a cul-de-sac in Southern California where something kind of
              rare happened — neighbors became friends, families became regulars at each other’s
              tables, and game nights became a standing tradition.
            </p>
            <p style={{ ...ui.body, marginTop: 16 }}>
              Out of those nights came <em>Letter Me This!</em> — a game designed to do exactly
              what the best games do: give a room full of people something to laugh about,
              argue over, and remember the next day.
            </p>
            <p style={{ ...ui.body, marginTop: 16 }}>
              We named the company after that street because it’s where the whole thing
              started. Games have always been about the people around the table, and
              Nicholas Street Games will always be built with that in mind.
            </p>
          </div>

          <div style={s.accentCol}>
            <img src={LOGO_NSG} alt="Nicholas Street Games" style={s.logoImg} />
            <div style={s.statGrid}>
              {[
                { num: '1',           label: 'Game so far' },
                { num: 'Southern CA', label: 'Home base' },
                { num: '1,000+',      label: 'Units in first run' },
                { num: '∞',           label: 'Good times ahead' },
              ].map(({ num, label }) => (
                <div key={label} style={s.statBox}>
                  <div style={s.statNum}>{num}</div>
                  <div style={s.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER NOTE ── */}
      <section style={{ ...s.section, background: colors.sun }}>
        <div style={s.founderCard}>
          <div style={s.founderBadge}>A Note From Our Founder</div>
          <p style={s.founderQuote}>
            “Thank you so much for buying our game. This was a crazy idea that started in our kitchen
            and became something our friends and family all loved. My sincere hope is that it brings
            your friends and family the same laughs and joy it has for us. If it does… tell your friends!”
          </p>
          <p style={s.founderSign}>Jami Johnson</p>
          <p style={s.founderRole}>Founder, Nicholas Street Games</p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ ...s.section, background: colors.deepTeal, textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ ...ui.eyebrow, color: colors.yellow }}>What We Believe</p>
          <h2 style={{ ...ui.h2, color: '#fff' }}>
            The best games don’t come from boxes. They come from the people playing them.
          </h2>
          <p style={{ ...ui.lead, color: '#B9DAD8', margin: '24px auto 16px' }}>
            Anyone can design a game with complex rules and a hundred components.
            We’re more interested in the moment when someone says something about their
            best friend that makes the whole table lose it — the kind of moment that gets
            brought up for years.
          </p>
          <p style={{ ...ui.lead, color: '#B9DAD8', margin: '0 auto' }}>
            That’s what <em style={{ color: '#EAF6F5' }}>Letter Me This!</em> is built for.
            Every game we make will chase that same feeling.
          </p>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── CTA ── */}
      <section style={{ ...s.section, background: colors.ground, textAlign: 'center' }}>
        <p style={ui.eyebrow}>Ready to Play?</p>
        <h2 style={ui.h2}>Meet the Game.</h2>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 30 }}>
          <Link href="/letter-me-this" style={ui.btnPrimary}>Explore Letter Me This!</Link>
        </div>
      </section>
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
  section: { padding: '84px 24px' },
  storyGrid: {
    maxWidth: 1000, margin: '0 auto',
    display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'start',
  },
  accentCol: { display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' },
  logoImg: { width: '100%', maxWidth: 300, height: 'auto', filter: 'drop-shadow(0 10px 28px rgba(20,40,35,0.12))' },
  statGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, width: '100%' },
  statBox: {
    background: colors.mint, borderRadius: 14, padding: 20,
    textAlign: 'center', borderTop: `3px solid ${colors.teal}`,
  },
  statNum: { fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 26, color: colors.ink, marginBottom: 4 },
  statLabel: { fontFamily: FONT_BODY, fontSize: 13, color: colors.inkSoft },

  founderCard: {
    maxWidth: 760, margin: '0 auto', textAlign: 'center',
    background: colors.white, border: `1.5px solid ${colors.yellow}66`,
    borderRadius: 24, padding: '44px 40px', boxShadow: '0 12px 34px rgba(20,40,35,0.07)',
  },
  founderBadge: {
    display: 'inline-block', fontFamily: FONT_DISPLAY, fontWeight: 700,
    fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: colors.coralInk, marginBottom: 20,
  },
  founderQuote: {
    fontFamily: FONT_BODY, fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.65,
    color: colors.ink,
  },
  founderSign: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 30, color: colors.teal, marginTop: 24,
  },
  founderRole: { fontFamily: FONT_BODY, fontSize: 14, color: colors.inkFaint, marginTop: 2 },
}
