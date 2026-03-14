import Head from 'next/head';

export default function Party() {
  return (
    <>
      <Head>
        <title>IT&apos;S GO TIME — Letter Me This! Pre-Launch Party</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="page">

        <a href="/release" className="sticky-banner">
          ⚠️ ACTION REQUIRED — Sign the Photo &amp; Video Release Before March 28th →
        </a>

        <section className="hero">
          <div className="hero-eyebrow">🎲 YOU&apos;RE IN. IT&apos;S HAPPENING. 🎲</div>
          <h1 className="hero-title">IT&apos;S<br /><span className="highlight">GO</span><br />TIME.</h1>
          <p className="hero-sub">THE LETTER ME THIS! PRE-LAUNCH PARTY IS LOCKED AND LOADED.<br />AND YOU MADE THE CUT.</p>
        </section>

        <section className="details">
          <div className="details-inner">
            <div className="detail-block">
              <div className="detail-icon">📅</div>
              <div className="detail-label">WHEN</div>
              <div className="detail-value">SATURDAY, MARCH 28, 2026</div>
              <div className="detail-sub">4:00 PM – 7:00 PM SHARP</div>
            </div>
            <div className="detail-divider" />
            <div className="detail-block">
              <div className="detail-icon">📍</div>
              <div className="detail-label">WHERE</div>
              <div className="detail-value">520 N 2ND AVENUE</div>
              <div className="detail-sub">UPLAND, CA 91786</div>
            </div>
            <div className="detail-divider" />
            <div className="detail-block">
              <div className="detail-icon">🍕</div>
              <div className="detail-label">WHAT&apos;S INCLUDED</div>
              <div className="detail-value">FOOD. DRINKS. GAMES.</div>
              <div className="detail-sub">ALL FREE. JUST SHOW UP.</div>
            </div>
          </div>
        </section>

        <section className="expect">
          <h2 className="section-title">HERE&apos;S THE DEAL</h2>
          <div className="expect-grid">
            <div className="expect-card" style={{borderColor: '#20B2AA'}}>
              <div className="expect-emoji">🍽️</div>
              <div className="expect-head">EAT &amp; DRINK</div>
              <p>We&apos;ve got food and drinks covered. Come hungry. Come thirsty. We&apos;ve got you.</p>
            </div>
            <div className="expect-card" style={{borderColor: '#F5C518'}}>
              <div className="expect-emoji">🎲</div>
              <div className="expect-head">PLAY THE GAME</div>
              <p>You&apos;re going to play Letter Me This! — the party game where your friends define you. It&apos;s chaotic. It&apos;s hilarious. You&apos;re going to love it.</p>
            </div>
            <div className="expect-card" style={{borderColor: '#E85D3D'}}>
              <div className="expect-emoji">🎬</div>
              <div className="expect-head">GET ON CAMERA</div>
              <p>We&apos;re filming everything for our social media launch. Your reactions, your laughs, your trash talk — all of it. This is your moment.</p>
            </div>
            <div className="expect-card" style={{borderColor: '#3a7d44'}}>
              <div className="expect-emoji">🔥</div>
              <div className="expect-head">BRING THE ENERGY</div>
              <p>Small group. Big personalities. Leave the quiet version of yourself at home. We need your sassiness, your exuberance, and your full unfiltered self.</p>
            </div>
          </div>
        </section>

        <section className="callout">
          <div className="callout-inner">
            <div className="callout-text">
              BRING YOUR<br />
              <span className="callout-word teal">SASS.</span>{' '}
              <span className="callout-word yellow">YOUR LAUGHS.</span>{' '}
              <span className="callout-word coral">YOUR TRASH TALK.</span>
            </div>
            <p className="callout-sub">WE&apos;RE BUILDING A SIZZLE REEL AND YOU&apos;RE THE STAR.<br />THE LOUDER, THE BETTER. THE SASSIER, THE BETTER.<br />DON&apos;T HOLD BACK — WE&apos;RE COUNTING ON YOU.</p>
          </div>
        </section>

        <section className="release">
          <div className="release-inner">
            <div className="release-badge">⚠️ ACTION REQUIRED ⚠️</div>
            <h2 className="release-title">YOU NEED TO SIGN<br />THE RELEASE FORM.</h2>
            <p className="release-body">
              We&apos;re filming this event for our social media launch campaign.<br />
              <strong>Before you show up, you need to sign our photo &amp; video release.</strong><br />
              It takes 60 seconds. Do it now. Don&apos;t wait until the day of.
            </p>
            <a href="/release" className="release-btn">✍️ SIGN THE RELEASE NOW →</a>
            <p className="release-note">Takes 60 seconds. Sign it today.</p>
          </div>
        </section>

        <section className="closer">
          <h2 className="closer-title">SEE YOU<br />MARCH 28TH.</h2>
          <p className="closer-sub">4PM. 520 N 2ND AVE. UPLAND.<br />DON&apos;T BE LATE. DON&apos;T BE BORING.<br />JUST BE YOU — TURNED ALL THE WAY UP.</p>
          <div className="closer-logos">
            <img src="/images/lettermethis-logo.png" alt="Letter Me This!" className="closer-lmt" />
            <img src="/images/nsg-logo.png" alt="Nicholas Street Games" className="closer-nsg" />
          </div>
          <p className="closer-url">nicholasstreetgames.com</p>
        </section>

        <section className="regrets">
          <div className="regrets-inner">
            <p className="regrets-head">CAN&apos;T MAKE IT?</p>
            <p className="regrets-body">We understand. Life happens. Please let us know so we can plan.</p>
            <a href="/cancel" className="regrets-btn">Send Your Regrets →</a>
          </div>
        </section>

      </div>

      <style jsx>{`
        .sticky-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: block; background: #F5C518; color: #000; font-family: 'Bebas Neue', sans-serif; font-size: clamp(14px, 2vw, 18px); letter-spacing: 2px; text-align: center; padding: 14px 24px; text-decoration: none; transition: background 0.15s; }
        .sticky-banner:hover { background: #e6b800; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { font-family: 'Nunito', sans-serif; background: #0f0f0f; color: #ffffff; overflow-x: hidden; }
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 100px 24px 60px; background: #0f0f0f; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; top: -200px; left: -200px; width: 600px; height: 600px; background: radial-gradient(circle, #20B2AA22 0%, transparent 70%); pointer-events: none; }
        .hero::after { content: ''; position: absolute; bottom: -200px; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle, #E85D3D22 0%, transparent 70%); pointer-events: none; }
        .hero-eyebrow { font-family: 'Bebas Neue', sans-serif; font-size: clamp(14px, 2.5vw, 20px); letter-spacing: 4px; color: #20B2AA; margin-bottom: 24px; }
        .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(100px, 22vw, 220px); line-height: 0.85; letter-spacing: -2px; color: #ffffff; margin-bottom: 32px; }
        .highlight { color: #E85D3D; -webkit-text-stroke: 3px #E85D3D; }
        .hero-sub { font-size: clamp(14px, 2vw, 18px); letter-spacing: 3px; color: #aaaaaa; line-height: 1.8; max-width: 600px; }
        .details { background: #1a1a1a; padding: 60px 24px; }
        .details-inner { max-width: 900px; margin: 0 auto; display: flex; gap: 0; align-items: stretch; flex-wrap: wrap; }
        .detail-block { flex: 1; min-width: 220px; text-align: center; padding: 32px 24px; }
        .detail-divider { width: 1px; background: #333; margin: 20px 0; }
        .detail-icon { font-size: 32px; margin-bottom: 12px; }
        .detail-label { font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 4px; color: #666; margin-bottom: 10px; }
        .detail-value { font-family: 'Bebas Neue', sans-serif; font-size: clamp(20px, 3vw, 26px); color: #ffffff; letter-spacing: 1px; margin-bottom: 6px; }
        .detail-sub { font-size: 13px; color: #F5C518; letter-spacing: 2px; }
        .expect { padding: 80px 24px; background: #0f0f0f; }
        .section-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 6vw, 64px); letter-spacing: 4px; text-align: center; margin-bottom: 48px; color: #ffffff; }
        .expect-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; }
        .expect-card { background: #1a1a1a; border-top: 4px solid; border-radius: 8px; padding: 28px 24px; }
        .expect-emoji { font-size: 36px; margin-bottom: 14px; }
        .expect-head { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; margin-bottom: 10px; color: #ffffff; }
        .expect-card p { font-size: 14px; line-height: 1.7; color: #aaaaaa; }
        .callout { background: #1a1a1a; padding: 80px 24px; text-align: center; border-top: 1px solid #222; border-bottom: 1px solid #222; }
        .callout-inner { max-width: 800px; margin: 0 auto; }
        .callout-text { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 7vw, 80px); line-height: 1.1; letter-spacing: 2px; margin-bottom: 32px; }
        .callout-word { display: inline-block; }
        .teal { color: #20B2AA; }
        .yellow { color: #F5C518; }
        .coral { color: #E85D3D; }
        .callout-sub { font-size: clamp(13px, 1.8vw, 16px); letter-spacing: 2px; color: #888; line-height: 2; }
        .release { background: #E85D3D; padding: 80px 24px; text-align: center; }
        .release-inner { max-width: 700px; margin: 0 auto; }
        .release-badge { display: inline-block; background: #000; color: #F5C518; font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 4px; padding: 8px 20px; border-radius: 4px; margin-bottom: 28px; }
        .release-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 9vw, 96px); line-height: 0.95; letter-spacing: 2px; color: #ffffff; margin-bottom: 28px; }
        .release-body { font-size: clamp(15px, 2vw, 18px); line-height: 1.9; color: #fff; margin-bottom: 40px; }
        .release-body strong { color: #000; }
        .release-btn { display: inline-block; background: #000; color: #ffffff; font-family: 'Bebas Neue', sans-serif; font-size: clamp(20px, 3vw, 28px); letter-spacing: 3px; padding: 22px 52px; border-radius: 6px; text-decoration: none; transition: transform 0.15s, background 0.15s; margin-bottom: 16px; }
        .release-btn:hover { background: #1a1a1a; transform: scale(1.03); }
        .release-note { font-size: 13px; letter-spacing: 2px; color: #ffccbb; margin-top: 12px; }
        .closer { background: #0f0f0f; padding: 100px 24px 80px; text-align: center; }
        .closer-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(72px, 16vw, 160px); line-height: 0.88; letter-spacing: -1px; color: #ffffff; margin-bottom: 32px; }
        .closer-sub { font-size: clamp(13px, 1.8vw, 16px); letter-spacing: 3px; color: #666; line-height: 2.2; margin-bottom: 60px; }
        .closer-logos { display: flex; align-items: center; justify-content: center; gap: 40px; margin-bottom: 32px; flex-wrap: wrap; }
        .closer-lmt { height: 100px; width: auto; }
        .closer-nsg { height: 80px; width: auto; }
        .closer-url { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 4px; color: #20B2AA; }
        .regrets { background: #1a1a1a; padding: 60px 24px; text-align: center; border-top: 1px solid #222; }
        .regrets-inner { max-width: 500px; margin: 0 auto; }
        .regrets-head { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 4px; color: #555; margin-bottom: 12px; }
        .regrets-body { font-size: 14px; color: #444; line-height: 1.7; margin-bottom: 24px; }
        .regrets-btn { display: inline-block; border: 1.5px solid #20B2AA; color: #20B2AA; font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 3px; padding: 14px 36px; border-radius: 5px; text-decoration: none; transition: background 0.15s, color 0.15s; }
        .regrets-btn:hover { background: #20B2AA; color: #000; }
        @media (max-width: 600px) { .detail-divider { display: none; } .details-inner { flex-direction: column; } }
      `}</style>
    </>
  );
}
