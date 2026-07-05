import { colors, FONT_DISPLAY, FONT_BODY, ui } from '../styles/tokens'

// ── Set the inventor's video here once it's hosted ───────────────────────────
// type: 'youtube' | 'vimeo' | 'file' | 'none'
//   'youtube' → src is the video ID only (from youtu.be/<ID> or watch?v=<ID>)
//   'vimeo'   → src is the numeric video ID (from vimeo.com/<ID>)
//   'file'    → src is a URL/path to an .mp4 (e.g. '/videos/intro-video.mp4')
//   'none'    → shows the "coming soon" placeholder
export const INVENTOR_VIDEO = {
  type: 'none',
  src: '',
  poster: '', // optional poster image URL for the 'file' type
}
// ─────────────────────────────────────────────────────────────────────────────

function Player() {
  const { type, src, poster } = INVENTOR_VIDEO

  if (type === 'youtube') {
    return (
      <iframe
        style={s.media}
        src={`https://www.youtube-nocookie.com/embed/${src}`}
        title="A message from the game inventor"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  if (type === 'vimeo') {
    return (
      <iframe
        style={s.media}
        src={`https://player.vimeo.com/video/${src}`}
        title="A message from the game inventor"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    )
  }
  if (type === 'file') {
    return (
      <video style={s.media} controls playsInline poster={poster || undefined}>
        <source src={src} type="video/mp4" />
        Your browser doesn’t support embedded video.
      </video>
    )
  }
  // Placeholder
  return (
    <div style={s.placeholder}>
      <div style={s.playBtn} aria-hidden="true">▶</div>
      <div style={s.placeholderText}>Video message coming soon</div>
    </div>
  )
}

export default function InventorVideo({ background = colors.white }) {
  return (
    <section style={{ padding: '80px 24px', background }}>
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <p style={ui.eyebrow}>Our Origin Story</p>
        <h2 style={ui.h2}>A message from the game inventor.</h2>
        <p style={{ ...ui.lead, margin: '14px auto 34px' }}>
          How Nicholas Street Games and Letter Me This! came to be — straight from the
          person who dreamed it up around the kitchen table.
        </p>
        <div style={s.frame}>
          <Player />
        </div>
      </div>
    </section>
  )
}

const s = {
  frame: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    borderRadius: 22,
    overflow: 'hidden',
    border: `1.5px solid ${colors.hair}`,
    boxShadow: '0 14px 40px rgba(20,40,35,0.12)',
    background: colors.deepTeal,
  },
  media: {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%', border: 'none',
    objectFit: 'cover',
  },
  placeholder: {
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 16,
    background: `radial-gradient(60% 80% at 50% 30%, ${colors.teal}33 0%, transparent 70%), ${colors.deepTeal}`,
  },
  playBtn: {
    width: 74, height: 74, borderRadius: '50%',
    background: '#ffffff', color: colors.deepTeal,
    display: 'grid', placeItems: 'center',
    fontSize: 26, paddingLeft: 6,
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
  },
  placeholderText: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16,
    letterSpacing: '0.04em', color: '#EAF6F5',
  },
}
