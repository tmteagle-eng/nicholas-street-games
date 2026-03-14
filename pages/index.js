import Head from 'next/head'
import Link from 'next/link'

const LOGO = '/images/lettermethis-logo.png'

export default function Home() {
  return (
    <>
      <Head>
        <title>Nicholas Street Games — Party Games for Real People</title>
        <meta name="description" content="Nicholas Street Games makes party games where your friends, family, and a little chaos come together. Home of Letter Me This!" />
      </Head>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroDots} />
        <p className="fade-up-1" style={s.eyebrow}>Letter Me This!</p>
        <h1 className="fade-up-2" style={s.headline}>
          The party game where<br /><em style={{color:'#E85D3D',fontStyle:'normal'}}>your friends define you</em>
        </h1>
        <p className="fade-up-3" style={s.sub}>
          Roll. Write. Reveal. That&apos;s all we&apos;re saying.
        </p>
        <div className="fade-up-4" style={s.heroBtns}>
          <Link href="/our-games" style={s.btnPrimary}>See Our Games</Link>
        </div>
        <div style={s.scrollHint} aria-hidden="true">
          <span style={{fontSize:11,letterSpacing:3,color:'#555',textTransform:'uppercase'}}>Scroll</span>
          <div style={s.scrollArrow} className="scroll-bounce" />
        </div>
      </section>

      <div className="color-bar" />

      {/* ── GAME SPOTLIGHT ── */}
      <section style={s.spotlight}>
        <div style={s.spotInner}>
          <div style={s.spotText}>
            <p style={s.labelTeal}>Our First Game</p>
            <h2 style={s.secTitle}>Letter Me This!</h2>
            <p style={s.secBody}>
              Think <strong>Wordle and Yahtzee had a baby</strong>. Roll two dice — one gives you a letter,
              one gives you a number. Now write that many words about the person in the hot seat,
              all starting with that letter. Fast. Funny. Occasionally brutal.
            </p>
            <p style={{...s.secBody, marginTop:12, color:'#888', fontStyle:'italic'}}>
              Unique approved words score a point. Matching words score nothing. Strategy lives in the chaos.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link href="/our-games" style={s.btnPrimary}>Learn More</Link>
              <a href="https://tmteagle-eng.github.io/letter-me-this/" style={{...s.btnSecondary, borderColor:'#20B2AA', color:'#20B2AA'}} target="_blank" rel="noopener noreferrer">Try the Dice Roller</a>
            </div>
          </div>
          <div style={s.spotLogo}>
            <img src={LOGO} alt="Letter Me This!" style={s.logoImg} />
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── HOW IT WORKS ── */}
      <section style={{background:'#1a1a1a', padding:'96px 24px'}}>
        <div style={s.inner}>
          <p style={{...s.labelTeal, color:'#F5C518', textAlign:'center'}}>How It Works</p>
          <h2 style={{...s.secTitle, color:'#fff', textAlign:'center', marginBottom:56}}>
            Simple to Learn.<br />Impossible to Play Quietly.
          </h2>
          <div style={s.stepsGrid}>
            {[
              { num:'01', color:'#20B2AA', title:'Roll',   body:'One die gives you a letter. The other gives you a number. That\'s your challenge.' },
              { num:'02', color:'#F5C518', title:'Write',  body:'Everyone writes that many words about The Subject — all starting with that letter. You\'ve got 2 minutes.' },
              { num:'03', color:'#E85D3D', title:'Reveal', body:'Read your words aloud. Unique approved words score a point. Duplicates score nothing.' },
              { num:'04', color:'#3a7d44', title:'Repeat', body:'Rotate The Subject and go again. Most points wins — or just play for the chaos.' },
            ].map((step) => (
              <div key={step.num} style={{...s.stepCard, borderTopColor: step.color}}>
                <div style={{...s.stepNum, color: step.color}}>{step.num}</div>
                <div style={s.stepTitle}>{step.title}</div>
                <div style={s.stepBody}>{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON BANNER ── */}
      <section style={s.launchBanner}>
        <div style={s.launchDots} />
        <div style={{position:'relative', textAlign:'center', padding:'0 24px'}}>
          <img src="/images/nsg-logo.png" alt="Nicholas Street Games" style={{width:200, height:'auto', marginBottom:24, filter:'drop-shadow(0 4px 16px rgba(0,0,0,0.3))'}} />
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(36px,6vw,64px)', color:'#fff', letterSpacing:2, lineHeight:1, marginBottom:16}}>
            Coming Soon.
          </h2>
          <p style={{fontSize:16, color:'rgba(255,255,255,0.75)', maxWidth:480, margin:'0 auto 32px', lineHeight:1.65}}>
            We&apos;re getting ready to launch Letter Me This! Follow us on social media to be the first to know.
          </p>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <a href="https://instagram.com/lettermethisgame" style={{...s.btnPrimary, background:'#fff', color:'#E85D3D', display:'inline-block'}} target="_blank" rel="noopener noreferrer">
              Follow on Instagram
            </a>
            <a href="https://tiktok.com/@LetterMeThis1" style={{...s.btnPrimary, background:'#fff', color:'#E85D3D', display:'inline-block'}} target="_blank" rel="noopener noreferrer">
              Follow on TikTok
            </a>
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── COMPANY TEASE ── */}
      <section style={{padding:'96px 24px', background:'#f8f7f3'}}>
        <div style={{...s.inner, maxWidth:680, textAlign:'center'}}>
          <p style={s.labelTeal}>About Nicholas Street Games</p>
          <h2 style={{...s.secTitle, marginBottom:20}}>Games From a Cul-de-Sac in Southern California</h2>
          <p style={s.secBody}>
            Nicholas Street Games started the same way every good game does — around a table, with people
            you love, looking for something to do that didn&apos;t involve staring at a screen.
            We&apos;re building games for those moments. <em>Letter Me This!</em> is just the beginning.
          </p>
          <Link href="/about" style={{...s.btnSecondary, marginTop:32, display:'inline-block'}}>Our Story</Link>
        </div>
      </section>

      <style>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50%       { transform: rotate(45deg) translateY(5px); }
        }
        .scroll-bounce { animation: scroll-bounce 1.4s infinite; }
        .step-card:hover { transform: translateY(-4px); }
        @media (max-width: 680px) {
          .spot-inner { flex-direction: column !important; }
          .spot-logo  { display: none; }
        }
      `}</style>
    </>
  )
}

const s = {
  hero: {
    minHeight:'calc(100vh - 64px)', background:'#1a1a1a',
    display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center',
    textAlign:'center', padding:'80px 24px 80px',
    position:'relative', overflow:'hidden',
  },
  heroDots: {
    position:'absolute', inset:0, opacity:0.1,
    backgroundImage:`
      radial-gradient(circle, #20B2AA 2px, transparent 2px),
      radial-gradient(circle, #F5C518 2px, transparent 2px),
      radial-gradient(circle, #E85D3D 2px, transparent 2px),
      radial-gradient(circle, #3a7d44 2px, transparent 2px)`,
    backgroundSize:'120px 120px, 180px 180px, 150px 150px, 200px 200px',
    backgroundPosition:'0 0, 60px 60px, 30px 90px, 90px 30px',
  },
  eyebrow: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:12,
    letterSpacing:5, color:'#20B2AA', marginBottom:20, position:'relative',
  },
  headline: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:'clamp(48px, 8vw, 88px)',
    color:'#fff', lineHeight:1.05, letterSpacing:2,
    marginBottom:20, position:'relative',
  },
  sub: {
    fontSize:'clamp(17px,2.5vw,22px)', color:'#888',
    marginBottom:40, letterSpacing:2,
    fontFamily:"'Bebas Neue',sans-serif", position:'relative',
  },
  heroBtns: {
    display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', position:'relative',
  },
  scrollHint: {
    position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
    display:'flex', flexDirection:'column', alignItems:'center', gap:6,
  },
  scrollArrow: {
    width:18, height:18,
    borderRight:'2px solid #555', borderBottom:'2px solid #555',
    transform:'rotate(45deg)',
  },
  spotlight: { padding:'96px 24px', background:'#fff' },
  spotInner: {
    maxWidth:960, margin:'0 auto',
    display:'flex', alignItems:'center', gap:64, flexWrap:'wrap',
  },
  spotText: { flex:'1 1 400px' },
  spotLogo: { flex:'0 0 320px', display:'flex', justifyContent:'center' },
  logoImg: { width:280, height:'auto', filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.12))' },
  inner: { maxWidth:960, margin:'0 auto' },
  labelTeal: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:11, letterSpacing:5, color:'#20B2AA',
    marginBottom:12, textTransform:'uppercase',
  },
  secTitle: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:'clamp(32px,5vw,52px)',
    lineHeight:1.05, letterSpacing:2, marginBottom:20,
  },
  secBody: { fontSize:17, lineHeight:1.8, color:'#555', maxWidth:560 },
  stepsGrid: {
    display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:20,
  },
  stepCard: {
    background:'rgba(255,255,255,0.04)', borderRadius:6,
    padding:'32px 24px', borderTop:'4px solid',
    transition:'transform 0.2s', className:'step-card',
  },
  stepNum: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:36, letterSpacing:2, marginBottom:8,
  },
  stepTitle: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:2,
    color:'#fff', marginBottom:10,
  },
  stepBody: { fontSize:14, color:'#888', lineHeight:1.7 },
  launchBanner: {
    background:'#E85D3D', padding:'96px 24px',
    position:'relative', overflow:'hidden',
  },
  launchDots: {
    position:'absolute', inset:0,
    backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
    backgroundSize:'28px 28px',
  },
  btnPrimary: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:17, letterSpacing:2,
    background:'#E85D3D', color:'#fff',
    padding:'14px 36px', borderRadius:3,
    textDecoration:'none', display:'inline-block',
    transition:'background 0.2s, transform 0.15s',
  },
  btnSecondary: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:17, letterSpacing:2,
    background:'transparent', color:'#fff',
    border:'2px solid rgba(255,255,255,0.4)',
    padding:'12px 34px', borderRadius:3,
    textDecoration:'none', display:'inline-block',
  },
}
