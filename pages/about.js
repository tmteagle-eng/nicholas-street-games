import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>About — Nicholas Street Games</title>
        <meta name="description" content="Nicholas Street Games started on a cul-de-sac in Southern California where friends, families, and games came together." />
      </Head>

      {/* ── PAGE HERO ── */}
      <section style={s.pageHero}>
        <p style={s.eyebrow}>Our Story</p>
        <h1 style={s.pageTitle}>About<br />Nicholas Street Games</h1>
      </section>

      <div className="color-bar" />

      {/* ── ORIGIN STORY ── */}
      <section style={{padding:'96px 24px', background:'#fff'}}>
        <div style={s.storyGrid}>
          <div style={s.storyText}>
            <p style={s.labelTeal}>Where It Started</p>
            <h2 style={s.secTitle}>A Cul-de-Sac.<br />A Table.<br />The Right People.</h2>
            <p style={s.bodyText}>
              Nicholas Street is a cul-de-sac in Southern California where something kind of
              rare happened — neighbors became friends, families became regulars at each other&apos;s
              tables, and game nights became a standing tradition.
            </p>
            <p style={s.bodyText}>
              Out of those nights came <em>Letter Me This!</em> — a game designed to do exactly
              what the best games do: give a room full of people something to laugh about,
              argue over, and remember the next day.
            </p>
            <p style={s.bodyText}>
              We named the company after that street because it&apos;s where the whole thing
              started. Games have always been about the people around the table, and
              Nicholas Street Games will always be built with that in mind.
            </p>
          </div>

          {/* Visual accent */}
          <div style={s.accentCol}>
            <img src="/images/nsg-logo.png" alt="Nicholas Street Games" style={s.logoImg} />
            <div style={s.statGrid}>
              {[
                { num:'1',           label:'Game so far' },
                { num:'Southern CA', label:'Home base' },
                { num:'1,000+',      label:'Units in first run' },
                { num:'∞',           label:'Good times ahead' },
              ].map(({num, label}) => (
                <div key={label} style={s.statBox}>
                  <div style={s.statNum}>{num}</div>
                  <div style={s.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── MISSION ── */}
      <section style={{background:'#1a1a1a', padding:'96px 24px', textAlign:'center'}}>
        <div style={{maxWidth:720, margin:'0 auto'}}>
          <p style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:11, letterSpacing:5, color:'#F5C518', marginBottom:12}}>
            What We Believe
          </p>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(32px,5vw,52px)', color:'#fff', letterSpacing:2, lineHeight:1.1, marginBottom:32}}>
            The Best Games Don&apos;t Come From Boxes.<br />They Come From the People Playing Them.
          </h2>
          <p style={{fontSize:17, color:'#888', lineHeight:1.85, marginBottom:16}}>
            Anyone can design a game with complex rules and a hundred components.
            We&apos;re more interested in the moment when someone says something about their
            best friend that makes the whole table lose it — the kind of moment that gets
            brought up for years.
          </p>
          <p style={{fontSize:17, color:'#888', lineHeight:1.85}}>
            That&apos;s what <em style={{color:'#ccc'}}>Letter Me This!</em> is built for.
            Every game we make will chase that same feeling.
          </p>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── CTA ── */}
      <section style={{padding:'80px 24px', background:'#f8f7f3', textAlign:'center'}}>
        <p style={s.labelTeal}>Ready to Play?</p>
        <h2 style={{...s.secTitle, marginBottom:32}}>Coming Soon.</h2>
        <div style={{display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap'}}>
          <Link href="/our-games" style={s.btnPrimary}>Learn About the Game</Link>
          <a href="https://tmteagle-eng.github.io/letter-me-this/" style={s.btnSecondary} target="_blank" rel="noopener noreferrer">Try the Dice Roller</a>
        </div>
      </section>
    </>
  )
}

const s = {
  pageHero: {
    background:'#1a1a1a', padding:'80px 24px 64px',
    textAlign:'center', borderBottom:'3px solid #E85D3D',
  },
  eyebrow: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:11,
    letterSpacing:5, color:'#20B2AA', marginBottom:12,
  },
  pageTitle: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:'clamp(44px,7vw,72px)',
    color:'#fff', letterSpacing:3, lineHeight:1.05,
  },
  storyGrid: {
    maxWidth:960, margin:'0 auto',
    display:'grid', gridTemplateColumns:'1fr 1fr',
    gap:64, alignItems:'start',
  },
  storyText: {},
  labelTeal: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:11, letterSpacing:5, color:'#20B2AA',
    marginBottom:12, textTransform:'uppercase',
  },
  secTitle: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:'clamp(30px,4vw,46px)',
    lineHeight:1.05, letterSpacing:2, marginBottom:28,
  },
  bodyText: {
    fontSize:17, lineHeight:1.85, color:'#444', marginBottom:20,
  },
  accentCol: { display:'flex', flexDirection:'column', gap:32, alignItems:'center' },
  logoImg: {
    width:'100%', maxWidth:320, height:'auto',
    filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.12))',
  },
  statGrid: {
    display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, width:'100%',
  },
  statBox: {
    background:'#f8f7f3', borderRadius:6, padding:'20px',
    textAlign:'center', borderTop:'3px solid #20B2AA',
  },
  statNum: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:28,
    letterSpacing:2, color:'#1a1a1a', marginBottom:4,
  },
  statLabel: { fontSize:12, color:'#888', letterSpacing:'0.5px' },
  btnPrimary: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:2,
    background:'#E85D3D', color:'#fff',
    padding:'14px 36px', borderRadius:3, textDecoration:'none',
  },
  btnSecondary: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:2,
    background:'transparent', color:'#1a1a1a',
    border:'2px solid #1a1a1a',
    padding:'12px 34px', borderRadius:3, textDecoration:'none',
  },
}
