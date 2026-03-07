import Head from 'next/head'
import { useEffect } from 'react'

// UPDATE THIS when your Amazon listing is live:
const AMAZON_URL = 'https://amazon.com' // ← replace with real ASIN URL

export default function Buy() {

  // Auto-redirect after a short moment once Amazon listing is live
  // Uncomment the block below when ready:
  /*
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = AMAZON_URL
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  */

  return (
    <>
      <Head>
        <title>Buy Letter Me This! — Nicholas Street Games</title>
        <meta name="description" content="Get Letter Me This! — the party game where your friends define you. Available on Amazon. $19.99." />
      </Head>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <p style={s.eyebrow}>Get the Game</p>
        <h1 style={s.title}>Letter Me This!</h1>
        <p style={s.price}>$19.99</p>
        <p style={s.sub}>Available on Amazon · Ships via FBA · Prime eligible</p>

        <div style={s.btnGroup}>
          <a href={AMAZON_URL} style={s.amazonBtn} target="_blank" rel="noopener noreferrer">
            🛒&nbsp; Buy on Amazon
          </a>
        </div>

        <p style={s.note}>
          Clicking takes you directly to our Amazon listing.
          Free shipping with Prime.
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
              { icon:'🎲', item:'1× 20-sided Alphabet Die',   desc:'Custom letter die with the 20 most-used letters' },
              { icon:'🎲', item:'1× 6-sided Number Die',       desc:'Numbers 3–8 to set your word count' },
              { icon:'🧊', item:'1× Dice Canister',            desc:'Roll anywhere — lid keeps everything together' },
              { icon:'📝', item:'Scoring Pad',                 desc:'Track points for the whole group' },
              { icon:'📄', item:'Instruction Sheet',           desc:'You\'ll be playing in under 5 minutes' },
            ].map(({icon, item, desc}) => (
              <div key={item} style={s.contentCard}>
                <div style={s.contentIcon}>{icon}</div>
                <div style={s.contentItem}>{item}</div>
                <div style={s.contentDesc}>{desc}</div>
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
              ['Price',      '$19.99'],
              ['Where',      'Amazon (FBA)'],
            ].map(([label, val]) => (
              <div key={label} style={s.specRow}>
                <span style={s.specLabel}>{label}</span>
                <span style={s.specVal}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:40}}>
            <a href={AMAZON_URL} style={s.amazonBtn} target="_blank" rel="noopener noreferrer">
              🛒&nbsp; Buy on Amazon
            </a>
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
  price: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:36,
    color:'#F5C518', letterSpacing:2, marginBottom:8,
  },
  sub: { fontSize:15, color:'#888', marginBottom:36, letterSpacing:'0.5px' },
  btnGroup: { display:'flex', justifyContent:'center', marginBottom:16 },
  amazonBtn: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:2,
    background:'#F5C518', color:'#1a1a1a',
    padding:'16px 48px', borderRadius:4, textDecoration:'none',
    boxShadow:'0 4px 16px rgba(0,0,0,0.3)', display:'inline-block',
  },
  note: { fontSize:12, color:'#555', letterSpacing:'0.5px' },
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
