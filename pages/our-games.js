import Head from 'next/head'
import Link from 'next/link'

const LOGO = '/images/lettermethis-logo.png'

export default function OurGames() {
  return (
    <>
      <Head>
        <title>Our Games — Nicholas Street Games</title>
        <meta name="description" content="Letter Me This! — the party game where your friends define you. Roll. Write. Reveal." />
      </Head>

      {/* ── PAGE HERO ── */}
      <section style={s.pageHero}>
        <p style={s.eyebrow}>Nicholas Street Games</p>
        <h1 style={s.pageTitle}>Our Games</h1>
        <p style={s.pageSub}>We make games for the people already at your table.</p>
      </section>

      <div className="color-bar" />

      {/* ── LETTER ME THIS FEATURE ── */}
      <section style={{padding:'96px 24px', background:'#fff'}}>
        <div style={s.gameCard}>

          {/* Logo side */}
          <div style={s.logoSide}>
            <img src={LOGO} alt="Letter Me This!" style={s.gameLogoImg} />
            <div style={s.badgeRow}>
              <span style={{...s.badge, background:'#20B2AA'}}>Ages 12+</span>
              <span style={{...s.badge, background:'#E85D3D'}}>3–10 Players</span>
              <span style={{...s.badge, background:'#3a7d44'}}>15–30 Min</span>
            </div>
          </div>

          {/* Content side */}
          <div style={s.contentSide}>
            <p style={s.labelTeal}>Featured Game</p>
            <h2 style={s.gameTitle}>Letter Me This!</h2>
            <p style={s.taglineText}>
              &ldquo;Wordle and Yahtzee had a baby.&rdquo;
            </p>
            <p style={s.gameBody}>
              A fast, hilarious party game where everyone writes words to describe
              The Subject — all starting with the same rolled letter, all within
              the rolled count. Unique words score. Duplicates vanish. The results
              are clever, ridiculous, flattering, and occasionally relationship-testing.
            </p>

            <div style={s.howRow}>
              {[
                { icon:'🎲', label:'Roll', desc:'Letter + number dice' },
                { icon:'✏️', label:'Write', desc:'2 minutes, no peeking' },
                { icon:'📣', label:'Reveal', desc:'Read aloud, score unique words' },
                { icon:'🔄', label:'Rotate', desc:'New subject, new round' },
              ].map((step) => (
                <div key={step.label} style={s.miniStep}>
                  <span style={s.miniIcon}>{step.icon}</span>
                  <div style={s.miniLabel}>{step.label}</div>
                  <div style={s.miniDesc}>{step.desc}</div>
                </div>
              ))}
            </div>

            <div style={{display:'flex', gap:12, marginTop:36, flexWrap:'wrap'}}>
              <a
                href="https://tmteagle-eng.github.io/letter-me-this/"
                style={s.buyBtn}
                target="_blank" rel="noopener noreferrer"
              >
                Try the Dice Roller
              </a>
              <Link href="/buy" style={s.partyBtn}>Coming Soon</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="color-bar" />

      {/* ── COMING SOON ── */}
      <section style={{background:'#1a1a1a', padding:'80px 24px'}}>
        <div style={{maxWidth:680, margin:'0 auto', textAlign:'center'}}>
          <p style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:11, letterSpacing:5, color:'#F5C518', marginBottom:12}}>
            WHAT&apos;S NEXT
          </p>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(32px,5vw,52px)', color:'#fff', letterSpacing:2, marginBottom:20}}>
            More Games Are Coming
          </h2>
          <p style={{fontSize:16, color:'#888', lineHeight:1.8, marginBottom:32}}>
            Nicholas Street Games was built to be a multi-game company. <em style={{color:'#ccc'}}>Letter Me This!</em> is
            just the first. Follow us to find out what&apos;s next.
          </p>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <a href="https://instagram.com/lettermethisgame" style={s.socialBtn} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://tiktok.com/@LetterMeThis1" style={s.socialBtn} target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

const s = {
  pageHero: {
    background:'#1a1a1a', padding:'80px 24px 64px',
    textAlign:'center',
    borderBottom:'3px solid #E85D3D',
  },
  eyebrow: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:11,
    letterSpacing:5, color:'#20B2AA', marginBottom:12,
  },
  pageTitle: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:'clamp(48px,8vw,80px)',
    color:'#fff', letterSpacing:3, lineHeight:1, marginBottom:16,
  },
  pageSub: { fontSize:18, color:'#888', maxWidth:480, margin:'0 auto' },
  gameCard: {
    maxWidth:1020, margin:'0 auto',
    display:'flex', gap:64, alignItems:'flex-start', flexWrap:'wrap',
  },
  logoSide: {
    flex:'0 0 280px',
    display:'flex', flexDirection:'column', alignItems:'center', gap:20,
  },
  gameLogoImg: {
    width:260, height:'auto',
    filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.15))',
  },
  badgeRow: { display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' },
  badge: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:11, letterSpacing:2,
    color:'#fff', padding:'5px 12px', borderRadius:99,
  },
  contentSide: { flex:'1 1 400px' },
  labelTeal: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:11,
    letterSpacing:5, color:'#20B2AA', marginBottom:8, textTransform:'uppercase',
  },
  gameTitle: {
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:'clamp(40px,6vw,64px)',
    color:'#1a1a1a', letterSpacing:2, lineHeight:1, marginBottom:8,
  },
  taglineText: {
    fontSize:16, color:'#888', fontStyle:'italic', marginBottom:20,
    fontFamily:"'Nunito',sans-serif",
  },
  gameBody: { fontSize:17, lineHeight:1.8, color:'#444', marginBottom:32 },
  howRow: {
    display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16,
    background:'#f8f7f3', borderRadius:8, padding:'24px 20px',
  },
  miniStep: { textAlign:'center' },
  miniIcon: { fontSize:22, display:'block', marginBottom:6 },
  miniLabel: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:2,
    color:'#1a1a1a', marginBottom:4,
  },
  miniDesc: { fontSize:11, color:'#888', lineHeight:1.5 },
  buyBtn: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:2,
    background:'#E85D3D', color:'#fff',
    padding:'14px 32px', borderRadius:3, textDecoration:'none',
  },
  partyBtn: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:2,
    background:'transparent', color:'#20B2AA',
    border:'2px solid #20B2AA',
    padding:'12px 30px', borderRadius:3, textDecoration:'none',
  },
  socialBtn: {
    fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:2,
    color:'#fff', border:'1px solid rgba(255,255,255,0.2)',
    padding:'10px 28px', borderRadius:3, textDecoration:'none',
  },
}
