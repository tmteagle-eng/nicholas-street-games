import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const verbCards = [
  { word: 'Roll',   desc: 'Pick a letter & a number',   color: '#20B2AA' },
  { word: 'Write',  desc: 'Describe the subject fast',  color: '#c9a000' },
  { word: 'Reveal', desc: 'Read your words aloud',      color: '#E85D3D' },
  { word: 'Score',  desc: 'Unique answers win points',  color: '#3a7d44' },
  { word: 'Laugh',  desc: 'At your friends. A lot.',    color: '#1a1a1a' },
]

function RsvpForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', attending: '', guests: '1', dietary: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" style={styles.rsvpSection}>
      <div style={styles.rsvpDots} aria-hidden="true" />
      <p style={{ ...styles.sectionLabel, color: 'rgba(255,255,255,0.6)', position: 'relative' }}>
        Don&apos;t Wait
      </p>
      <h2 style={styles.rsvpHeadline}>
        Spots Are Limited.<br />RSVP by March 21st.
      </h2>

      {status === 'success' ? (
        <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
          <div style={styles.formSuccessCard}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 3, color: '#1a1a1a', marginBottom: 12 }}>
              You&apos;re In!
            </h3>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.6 }}>
              {form.attending === 'yes'
                ? "We can't wait to see you on March 28th. Keep an eye on your inbox for any updates!"
                : "Sorry you can't make it — we'll miss you! Maybe next time."}
            </p>
            {form.attending === 'yes' && (
              <Link href="/release" style={{
                display: 'inline-block', marginTop: 24,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 18, letterSpacing: 2,
                color: '#fff', background: '#20B2AA',
                padding: '14px 32px', borderRadius: 4, textDecoration: 'none',
              }}>
                Sign Photo &amp; Video Release →
              </Link>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.rsvpFormWrap} className="rsvp-form">
          <div style={styles.formCard}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                style={styles.formInput}
                placeholder="Your name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                style={styles.formInput}
                placeholder="you@email.com"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone Number *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                style={styles.formInput}
                placeholder="(555) 123-4567"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Will You Be There? *</label>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { value: 'yes', label: "Yes, I'm in!", color: '#3a7d44' },
                  { value: 'no', label: "Can't make it", color: '#E85D3D' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update('attending', opt.value)}
                    style={{
                      ...styles.formToggle,
                      borderColor: form.attending === opt.value ? opt.color : 'rgba(255,255,255,0.15)',
                      background: form.attending === opt.value ? opt.color : 'rgba(255,255,255,0.05)',
                      color: form.attending === opt.value ? '#fff' : '#aaa',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {form.attending === 'yes' && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Number of Guests (including you)</label>
                  <select
                    value={form.guests}
                    onChange={(e) => update('guests', e.target.value)}
                    style={styles.formInput}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Dietary Restrictions (optional)</label>
                  <input
                    type="text"
                    value={form.dietary}
                    onChange={(e) => update('dietary', e.target.value)}
                    style={styles.formInput}
                    placeholder="Vegetarian, gluten-free, allergies, etc."
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={status === 'sending' || !form.attending}
              style={{
                ...styles.formSubmit,
                opacity: (status === 'sending' || !form.attending) ? 0.6 : 1,
                cursor: (status === 'sending' || !form.attending) ? 'not-allowed' : 'pointer',
              }}
            >
              {status === 'sending' ? 'SENDING...' : 'SUBMIT RSVP'}
            </button>

            {status === 'error' && (
              <p style={{ color: '#fff', fontSize: 14, marginTop: 12, textAlign: 'center' }}>
                Something went wrong — please try again or email tim@nicholasstreetgames.com
              </p>
            )}
          </div>

          <p style={styles.rsvpNote}>March 28 · 4–7PM · Upland, CA · Free to attend</p>
        </form>
      )}
    </section>
  )
}

export default function LaunchParty() {
  return (
    <>
      <Head>
        <title>Pre-Launch Party · Letter Me This! · March 28, 2026</title>
        <meta name="description" content="You're invited to the Letter Me This! pre-launch party — March 28, 2026 · 4–7 PM · Upland, CA. RSVP now." />
        <meta property="og:title" content="Letter Me This! Pre-Launch Party" />
        <meta property="og:description" content="Saturday March 28 · 4–7 PM · 520 N 2nd Ave, Upland CA. Roll. Write. Reveal. Laugh." />
      </Head>

      <div style={{ fontFamily: "'Nunito', sans-serif", background: '#fff', color: '#1a1a1a', overflowX: 'hidden' }}>

        {/* ── NAV ── */}
        <nav style={styles.nav}>
          <Link href="/" style={styles.navLogo}>
            Nicholas Street <span style={{ color: '#20B2AA' }}>Games</span>
          </Link>
          <a href="#rsvp" style={styles.navRsvp}>
            RSVP Now
          </a>
        </nav>

        {/* ── HERO IMAGE ── */}
        <div style={styles.heroImageWrap}>
          <img
            src="/images/launch-hero.jfif"
            alt="Letter Me This! Pre-Launch Party"
            style={styles.heroImage}
          />
          <div style={styles.heroImageOverlay} />
        </div>

        {/* ── HERO ── */}
        <section style={styles.hero}>
          <div style={styles.heroDots} aria-hidden="true" />

          <p style={styles.heroEyebrow}>Nicholas Street Games · Private Event</p>

          <img
            src="/images/nsg-logo.png"
            alt="Nicholas Street Games"
            style={styles.heroLogo}
          />

          <h1 style={styles.heroHeadline}>
            The <em style={{ color: '#E85D3D', fontStyle: 'normal' }}>Pre-Launch Party</em>
            <br />You Don&apos;t Want to Miss
          </h1>

          <p style={styles.heroSub}>
            We&apos;re getting close to launching <strong>Letter Me This!</strong> and you&apos;ve been
            hand-picked to be there. Come play, eat, drink, laugh — and help us kick this off
            the right way.
          </p>

          <div style={styles.heroPills}>
            <Pill color="#20B2AA">📅 Saturday, March 28, 2026</Pill>
            <Pill color="#F5C518">🕓 4:00 PM – 7:00 PM</Pill>
            <Pill color="#E85D3D">📍 520 N 2nd Ave · Upland, CA</Pill>
          </div>

          <a href="#rsvp" style={styles.heroCta}>
            RSVP RIGHT HERE
          </a>
          <p style={styles.heroCtaSub}>Spots are limited · Free to attend</p>

          <div style={styles.scrollHint} aria-hidden="true">
            <span>Scroll</span>
            <div style={styles.scrollArrow} />
          </div>
        </section>

        {/* ── COLOR BAR ── */}
        <ColorBar />

        {/* ── WHAT SECTION ── */}
        <section style={{ padding: '96px 24px', background: '#fff' }}>
          <div style={styles.sectionInner}>
            <p style={styles.sectionLabel}>The Plan for the Night</p>
            <h2 style={styles.sectionTitle}>Roll. Write. Reveal.<br />Laugh. Eat. Drink.</h2>
            <p style={styles.sectionBody}>
              <strong>Letter Me This!</strong> is a fast, hilarious party game where your friends
              describe you one letter at a time. It gets competitive. It gets funny. It gets
              surprisingly honest.
              <br /><br />
              This is the first time we&apos;ve opened the doors — and we want a room full of
              people who know how to have a great time.
            </p>

            <div style={styles.verbGrid}>
              {verbCards.map((v) => (
                <div key={v.word} style={{ ...styles.verbCard, borderTopColor: v.color }}>
                  <div style={{ ...styles.verbCardWord, color: v.color }}>{v.word}</div>
                  <div style={styles.verbCardDesc}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COLOR BAR ── */}
        <ColorBar />

        {/* ── EVENT DETAILS ── */}
        <section style={styles.detailsSection}>
          <div style={styles.detailsGrid}>

            {/* Left col */}
            <div>
              <p style={{ ...styles.sectionLabel, color: '#F5C518' }}>Event Details</p>
              <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>
                Everything<br />You Need<br />to Know
              </h2>

              {[
                { icon: '📅', label: 'Date',           value: 'Saturday, March 28, 2026' },
                { icon: '🕓', label: 'Time',           value: '4:00 PM – 7:00 PM' },
                { icon: '📍', label: 'Location',       value: null },
                { icon: '🍕', label: "What's Included", value: 'Food · Drinks · Games' },
              ].map((row, i) => (
                <div key={i} style={{
                  ...styles.detailRow,
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  marginBottom: i < 3 ? 28 : 0,
                  paddingBottom: i < 3 ? 28 : 0,
                }}>
                  <span style={styles.detailIcon}>{row.icon}</span>
                  <div>
                    <div style={styles.detailLabel}>{row.label}</div>
                    {row.value ? (
                      <div style={styles.detailValue}>{row.value}</div>
                    ) : (
                      <div style={styles.detailValue}>
                        520 N 2nd Avenue<br />Upland, CA 91786<br />
                        <a
                          href="https://maps.google.com/?q=520+N+2nd+Avenue+Upland+CA+91786"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#20B2AA', textDecoration: 'none' }}
                        >
                          Get Directions →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={styles.filmingCard}>
                <div style={styles.filmingCardTitle}>📹 A Note on Filming</div>
                <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.75 }}>
                  We&apos;ll be filming throughout the evening for social media and promotional
                  content as we introduce <strong style={{ color: '#fff' }}>Letter Me This!</strong> to
                  the world.
                  <br /><br />
                  We want real reactions, real energy, and real laughs — which is exactly what
                  you bring. Everyone will sign a simple photo/video release on arrival.
                </p>
              </div>

              <div style={styles.contactCard}>
                <div style={styles.detailLabel}>Questions?</div>
                <p style={{ fontSize: 15, color: '#aaa', lineHeight: 1.7, marginTop: 10 }}>
                  Reach out to Tim directly at{' '}
                  <a
                    href="mailto:tim@nicholasstreetgames.com"
                    style={{ color: '#20B2AA', textDecoration: 'none', fontWeight: 700 }}
                  >
                    tim@nicholasstreetgames.com
                  </a>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── RSVP FORM SECTION ── */}
        <RsvpForm />

        {/* ── FOOTER ── */}
        <footer style={styles.footer}>
          <span style={styles.footerBrand}>© 2026 Nicholas Street Games, LLC</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/" style={styles.footerLink}>Home</Link>
            <a href="mailto:tim@nicholasstreetgames.com" style={styles.footerLink}>Contact</a>
          </div>
        </footer>

      </div>

      {/* ── ANIMATIONS ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50%       { transform: rotate(45deg) translateY(5px); }
        }
        .hero-image-wrap { animation: fadeUp 0.8s 0.1s both; }
        .hero-eyebrow  { animation: fadeUp 0.6s 0.1s both; }
        .hero-logo     { animation: fadeUp 0.7s 0.2s both; }
        .hero-headline { animation: fadeUp 0.7s 0.3s both; }
        .hero-sub      { animation: fadeUp 0.7s 0.4s both; }
        .hero-pills    { animation: fadeUp 0.7s 0.5s both; }
        .hero-cta      { animation: fadeUp 0.7s 0.6s both; }
        .hero-cta-sub  { animation: fadeUp 0.7s 0.7s both; }
        .scroll-hint   { animation: fadeUp 0.7s 1.0s both; }
        .scroll-arrow  { animation: bounce 1.4s infinite; }
        .verb-card { transition: transform 0.2s; }
        .verb-card:hover { transform: translateY(-4px); }
        nav a:hover { opacity: 0.85; }
        html { scroll-behavior: smooth; }
        .rsvp-form input:focus, .rsvp-form select:focus {
          border-color: #F5C518 !important;
          box-shadow: 0 0 0 2px rgba(245,197,24,0.3);
        }
        .rsvp-form select option { background: #1a1a1a; color: #fff; }
        @media (max-width: 680px) {
          .details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

// ── Sub-components ──────────────────────────────────────────

function Pill({ color, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: 'rgba(255,255,255,0.08)',
      border: `1px solid ${color}`,
      borderRadius: 999, padding: '10px 20px',
      fontSize: 13, color, fontWeight: 700, letterSpacing: '0.5px',
    }}>
      {children}
    </div>
  )
}

function ColorBar() {
  return (
    <div style={{
      height: 6,
      background: 'linear-gradient(90deg, #20B2AA 0%, #F5C518 33%, #E85D3D 66%, #3a7d44 100%)',
    }} />
  )
}

// ── Styles ──────────────────────────────────────────────────

const styles = {
  heroImageWrap: {
    position: 'relative',
    width: '100%',
    maxWidth: 800,
    margin: '68px auto 0',
    overflow: 'hidden',
    borderRadius: '0 0 8px 8px',
  },

  heroImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  heroImageOverlay: {
    display: 'none',
  },
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    background: 'rgba(26,26,26,0.96)',
    backdropFilter: 'blur(8px)',
    padding: '12px 40px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    borderBottom: '3px solid #E85D3D',
  },
  navLogo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 13, letterSpacing: 4,
    color: '#888', textDecoration: 'none', textTransform: 'uppercase',
  },
  navRsvp: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 15, letterSpacing: 2,
    color: '#fff', background: '#E85D3D',
    padding: '8px 20px', borderRadius: 3, textDecoration: 'none',
  },
  hero: {
    background: '#1a1a1a',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', padding: '60px 24px 80px',
    position: 'relative', overflow: 'hidden',
  },
  heroDots: {
    position: 'absolute', inset: 0, opacity: 0.12,
    backgroundImage: `
      radial-gradient(circle, #20B2AA 2px, transparent 2px),
      radial-gradient(circle, #F5C518 2px, transparent 2px),
      radial-gradient(circle, #E85D3D 2px, transparent 2px),
      radial-gradient(circle, #3a7d44 2px, transparent 2px)`,
    backgroundSize: '120px 120px, 180px 180px, 150px 150px, 200px 200px',
    backgroundPosition: '0 0, 60px 60px, 30px 90px, 90px 30px',
  },
  heroEyebrow: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18, letterSpacing: 5, color: '#20B2AA',
    marginBottom: 24, position: 'relative',
  },
  heroLogo: {
    width: 200, height: 'auto', marginBottom: 28,
    filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))',
    position: 'relative',
  },
  heroHeadline: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(44px, 8vw, 80px)',
    color: '#fff', lineHeight: 1, letterSpacing: 3,
    marginBottom: 16, position: 'relative',
  },
  heroSub: {
    fontSize: 'clamp(16px, 2.5vw, 20px)',
    color: '#aaa', maxWidth: 520, lineHeight: 1.65,
    marginBottom: 40, position: 'relative',
  },
  heroPills: {
    display: 'flex', flexWrap: 'wrap', gap: 12,
    justifyContent: 'center', marginBottom: 44, position: 'relative',
  },
  heroCta: {
    display: 'inline-block', background: '#E85D3D', color: '#fff',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 22, letterSpacing: 3, padding: '18px 56px',
    borderRadius: 4, textDecoration: 'none', position: 'relative',
  },
  heroCtaSub: {
    fontSize: 12, color: '#666', marginTop: 12,
    letterSpacing: 1, position: 'relative',
  },
  scrollHint: {
    position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
    fontSize: 11, letterSpacing: 3, color: '#555', textTransform: 'uppercase',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
  },
  scrollArrow: {
    width: 18, height: 18,
    borderRight: '2px solid #555', borderBottom: '2px solid #555',
    transform: 'rotate(45deg)',
  },
  sectionInner: { maxWidth: 900, margin: '0 auto' },
  sectionLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 11, letterSpacing: 5, color: '#20B2AA',
    marginBottom: 12, textTransform: 'uppercase',
  },
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(32px, 5vw, 52px)',
    lineHeight: 1.05, letterSpacing: 2, marginBottom: 24,
  },
  sectionBody: { fontSize: 17, lineHeight: 1.8, color: '#444', maxWidth: 640 },
  verbGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 14, marginTop: 48,
  },
  verbCard: {
    background: '#f8f7f3', borderRadius: 6,
    padding: '28px 20px', textAlign: 'center', borderTop: '4px solid',
  },
  verbCardWord: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 28, letterSpacing: 2, marginBottom: 6,
  },
  verbCardDesc: { fontSize: 12, color: '#888', letterSpacing: '0.5px', lineHeight: 1.5 },
  detailsSection: { background: '#1a1a1a', padding: '96px 24px', color: '#fff' },
  detailsGrid: {
    maxWidth: 900, margin: '0 auto',
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 48, alignItems: 'start',
  },
  detailRow: { display: 'flex', alignItems: 'flex-start', gap: 16 },
  detailIcon: { fontSize: 22, flexShrink: 0, marginTop: 2 },
  detailLabel: {
    fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
    color: '#666', marginBottom: 4,
  },
  detailValue: { fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1.4 },
  filmingCard: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderLeft: '4px solid #F5C518',
    borderRadius: '0 6px 6px 0', padding: 28,
  },
  filmingCardTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18, letterSpacing: 2, color: '#F5C518', marginBottom: 12,
  },
  contactCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 6, padding: 24,
  },
  rsvpSection: {
    background: '#E85D3D', padding: '100px 24px',
    textAlign: 'center', position: 'relative', overflow: 'hidden',
  },
  rsvpDots: {
    position: 'absolute', inset: 0,
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
    backgroundSize: '30px 30px',
  },
  rsvpHeadline: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(40px, 7vw, 72px)',
    color: '#fff', letterSpacing: 3, lineHeight: 1,
    marginBottom: 20, position: 'relative',
  },
  rsvpSub: {
    fontSize: 16, color: 'rgba(255,255,255,0.8)',
    maxWidth: 480, margin: '0 auto 40px',
    lineHeight: 1.65, position: 'relative',
  },
  rsvpFormWrap: {
    position: 'relative',
    maxWidth: 480,
    margin: '0 auto',
    width: '100%',
  },
  formCard: {
    background: 'rgba(0,0,0,0.25)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    padding: '36px 32px',
    textAlign: 'left',
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    display: 'block',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 13,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  formInput: {
    width: '100%',
    padding: '14px 16px',
    fontSize: 16,
    fontFamily: "'Nunito', sans-serif",
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 6,
    color: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
  },
  formToggle: {
    flex: 1,
    padding: '14px 16px',
    fontSize: 15,
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    border: '2px solid',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  formSubmit: {
    width: '100%',
    padding: '18px',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 22,
    letterSpacing: 3,
    color: '#E85D3D',
    background: '#fff',
    border: 'none',
    borderRadius: 6,
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    marginTop: 8,
  },
  formSuccessCard: {
    background: '#fff',
    borderRadius: 10,
    padding: '48px 32px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },
  rsvpNote: {
    fontSize: 12, color: 'rgba(255,255,255,0.55)',
    marginTop: 16, letterSpacing: 1, position: 'relative',
  },
  footer: {
    background: '#1a1a1a', padding: '32px 40px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 16,
    borderTop: '3px solid rgba(255,255,255,0.06)',
  },
  footerBrand: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 11, letterSpacing: 4, color: '#555',
  },
  footerLink: { fontSize: 11, color: '#555', textDecoration: 'none', letterSpacing: 1 },
}
