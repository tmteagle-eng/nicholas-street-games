import Head from 'next/head'
import Link from 'next/link'

export default function Buy() {
  return (
    <>
      <Head>
        <title>Buy Letter Me This! — Nicholas Street Games</title>
        <meta name="description" content="Letter Me This! — the party game where your friends define you. Coming soon." />
      </Head>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <p style={s.eyebrow}>Get the Game</p>
        <h1 style={s.title}>Letter Me This!</h1>
        <h2 style={s.comingSoon}>Coming Soon</h2>
        <p style={s.sub}>
          We&apos;re putting the finishing touches on everything.
          Sign up below to be the first to know when it&apos;s available.
        </p>

        <a href="mailto:tim@nicholasstreetgames.com" style={s.notifyBtn}>
          Get Notified
        </a>

        <p style={s.note}>
          Drop us a line and we&apos;ll let you know the moment it&apos;s ready.
        </p>
      </section>

      <div className="color-bar" />

      {/* ── WHAT'S IN THE BOX ── */}
      <section style={{padding:'96px 24px', background:'#fff'}}>
        <div style={s.inner}>
          <p style={s.labelTeal}>What&apos;s Inside</p>
          <h2 style={s.secTitle}>Everything You Need.<br />Nothing You Don&apos;t.</h2>
          <div style={s.contentsGrid}>
            {[
              { icon:'🎲', item:'One Custom LMK Alphabet Die' },
              { icon:'🎲', item:'One Numeric Die' },
              { icon:'🧊', item:'Rolling Canister' },
              { icon:'📝', item:'Scoring Pad' },
              { icon:'📄', item:'Instructions' },
            ].map(({icon, item}) => (
              <div key={item} style={s.contentCard}>
                <div style={s.contentIcon}>{icon}</div>
                <div style={s.contentItem}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── GAME SPECS ── */}
      <section style={{background:'#1a1a1a', padding:'80px 24px'}}>
        <div style={{...s.inner, maxWidth:640}}>
          <p style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:11, letterSpacing:5, color:'#F5C518', marginBottom:12, textAlign:'center'}}>
            Game Details
          </p>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(28px,4vw,44px)', color:'#fff', letterSpacing:2, textAlign:'center', marginBottom:40}}>
            At a Glance
          </h2>
          <div style={s.specsGrid}>
            {[
              ['Players',    '3 – 10'],
              ['Ages',       '12+'],
              ['Play Time',  '15 – 30 min'],
              ['Setup',      'Under 2 min'],
            ].map(([label, val]) => (
              <div key={label} style={s.specRow}>
                <span style={s.specLabel}>{label}</span>
                <span style={s.specVal}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:40}}>
            <Link href="/our-games" style={s.notifyBtn}>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

const s = {
  hero: {
    background:'#1a1a1a', padding:'80px 24px 72px',
    textAlign:'center', borderBottom:'3px solid #E85D3D',
  },
  eyebrow: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:11,
    letterSpacing:5, color:'#20B2AA', marginBottom:12,
  },
  title: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:'clamp(48px,8vw,80px)',
    color:'#fff', letterSpacing:3, lineHeight:1, marginBottom:12,
  },
  comingSoon: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(28px,4vw,44px)',
    color:'#F5C518', letterSpacing:2, marginBottom:16,
  },
  sub: { fontSize:16, color:'#888', marginBottom:36, letterSpacing:'0.5px', maxWidth:480, margin:'0 auto 36px', lineHeight:1.7 },
  notifyBtn: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2,
    background:'#E85D3D', color:'#fff',
    padding:'16px 48px', borderRadius:4, textDecoration:'none',
    boxShadow:'0 4px 16px rgba(0,0,0,0.3)', display:'inline-block',
  },
  note: { fontSize:12, color:'#555', letterSpacing:'0.5px', marginTop:16 },
  inner: { maxWidth:900, margin:'0 auto' },
  labelTeal: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:11,
    letterSpacing:5, color:'#20B2AA', marginBottom:12, textTransform:'uppercase',
  },
  secTitle: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:'clamp(30px,4vw,48px)',
    lineHeight:1.05, letterSpacing:2, marginBottom:48,
  },
  contentsGrid: {
    display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',
    gap:20,
  },
  contentCard: {
    background:'#f8f7f3', borderRadius:8, padding:'28px 20px',
    textAlign:'center', borderTop:'3px solid #20B2AA',
  },
  contentIcon: { fontSize:28, marginBottom:12 },
  contentItem: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:1,
    color:'#1a1a1a', marginBottom:8,
  },
  contentDesc: { fontSize:12, color:'#888', lineHeight:1.6 },
  specsGrid: {
    border:'1px solid rgba(255,255,255,0.08)',
    borderRadius:8, overflow:'hidden',
  },
  specRow: {
    display:'flex', justifyContent:'space-between',
    padding:'16px 24px',
    borderBottom:'1px solid rgba(255,255,255,0.06)',
  },
  specLabel: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, color:'#888',
  },
  specVal: { fontSize:15, fontWeight:800, color:'#fff' },
}
