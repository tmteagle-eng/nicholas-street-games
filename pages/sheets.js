import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import {
  colors, FONT_DISPLAY, FONT_BODY, ui, LOGO_LMT, LOGO_NSG,
} from '../styles/tokens'

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n))
const range = (n) => Array.from({ length: n }, (_, i) => i)

// Shared header (both logos + a title) that sits at the top of every printable sheet.
function SheetHeader({ title, subtitle }) {
  return (
    <div style={s.sheetHead}>
      <img src={LOGO_LMT} alt="Letter Me This!" style={s.logoLmt} />
      <div style={s.sheetHeadMid}>
        <div style={s.sheetTitle}>{title}</div>
        {subtitle && <div style={s.sheetSub}>{subtitle}</div>}
      </div>
      <img src={LOGO_NSG} alt="Nicholas Street Games" style={s.logoNsg} />
    </div>
  )
}

// One player's word sheet — logos on top, name/date line, two columns of round blocks.
function PlayerSheet({ index, rounds }) {
  const cols = [[], []]
  range(rounds).forEach((r) => cols[r % 2].push(r))
  const perCol = Math.ceil(rounds / 2)
  const linesPerRound = perCol <= 2 ? 6 : perCol <= 3 ? 5 : perCol <= 4 ? 4 : perCol <= 5 ? 3 : 2

  return (
    <div className="sheet" style={s.paper}>
      <SheetHeader title="Player Word Sheet" subtitle="Write your words — first ones count!" />

      <div style={s.nameRow}>
        <div style={s.field}><span style={s.fieldLbl}>Player</span><span style={s.fieldLine} /></div>
        <div style={{ ...s.field, flex: '0 0 34%' }}><span style={s.fieldLbl}>Date</span><span style={s.fieldLine} /></div>
      </div>

      <div style={s.wordCols}>
        {cols.map((colRounds, ci) => (
          <div key={ci} style={s.wordCol}>
            {colRounds.map((r) => (
              <div key={r} style={s.roundBlock}>
                <div style={s.roundHead}>
                  <span style={s.roundTag}>Round {r + 1}</span>
                  <span style={s.roundLetter}>Letter&nbsp;<span style={s.letterBox} /></span>
                </div>
                <div style={s.lineWrap}>
                  {range(linesPerRound).map((l) => <div key={l} style={s.writeLine} />)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={s.footNote}>
        <span style={{ color: colors.teal }}>Roll.</span>{' '}
        <span style={{ color: colors.yellowInk }}>Write.</span>{' '}
        <span style={{ color: colors.coral }}>Reveal.</span>{' '}
        <span style={{ color: colors.green }}>Laugh.</span>
        <span style={s.footUrl}>nicholasstreetgames.com/letter-me-this</span>
      </div>
    </div>
  )
}

// The scorekeeper's grid — players down the side, rounds across the top, plus a total column.
function ScoreSheet({ players, rounds }) {
  return (
    <div className="sheet" style={s.paper}>
      <SheetHeader title="Score Sheet" subtitle="1 point per unique, approved word" />

      <table style={s.table}>
        <thead>
          <tr>
            <th style={{ ...s.th, ...s.thName }}>Player</th>
            {range(rounds).map((r) => <th key={r} style={s.th}>R{r + 1}</th>)}
            <th style={{ ...s.th, ...s.thTotal }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {range(players).map((p) => (
            <tr key={p}>
              <td style={{ ...s.td, ...s.tdName }} />
              {range(rounds).map((r) => <td key={r} style={s.td} />)}
              <td style={{ ...s.td, ...s.tdTotal }} />
            </tr>
          ))}
        </tbody>
      </table>

      <p style={s.legend}>
        1 point per unique, approved word · matching words score nothing · most points wins.
      </p>

      <div style={s.winnerRow}>
        <div style={s.field}><span style={s.fieldLbl}>🏆 Winner</span><span style={s.fieldLine} /></div>
      </div>

      <div style={s.footNote}>
        <span style={{ color: colors.teal }}>Roll.</span>{' '}
        <span style={{ color: colors.yellowInk }}>Write.</span>{' '}
        <span style={{ color: colors.coral }}>Reveal.</span>{' '}
        <span style={{ color: colors.green }}>Laugh.</span>
        <span style={s.footUrl}>nicholasstreetgames.com/letter-me-this</span>
      </div>
    </div>
  )
}

export default function Sheets() {
  const [players, setPlayers] = useState(4)
  const [rounds, setRounds] = useState(6)
  const [wantScore, setWantScore] = useState(true)
  const [wantPlayer, setWantPlayer] = useState(true)

  const p = clamp(Number(players) || 0, 1, 10)
  const r = clamp(Number(rounds) || 0, 1, 12)

  return (
    <>
      <Head>
        <title>Print Score &amp; Player Sheets — Letter Me This!</title>
        <meta name="description" content="Build and print free Letter Me This! score sheets and player word sheets. Choose your players and rounds, then save as PDF." />
        <meta name="robots" content="index,follow" />
      </Head>

      {/* ── CONTROLS (screen only) ── */}
      <section className="no-print" style={s.controlsWrap}>
        <div style={s.controlsInner}>
          <p style={ui.eyebrow}>Free Printables</p>
          <h1 style={s.h1}>Score &amp; Player Sheets</h1>
          <p style={{ ...ui.lead, marginTop: 10 }}>
            Set your table up, hit print. Pick how many players and rounds — we’ll build a
            scorekeeper grid and a word sheet for every player, ready to print or save as a PDF.
          </p>

          <div style={s.panel}>
            <div style={s.controlRow}>
              <label style={s.control}>
                <span style={s.controlLbl}>Players</span>
                <div style={s.stepper}>
                  <button style={s.stepBtn} onClick={() => setPlayers(clamp(p - 1, 1, 10))} aria-label="Fewer players">–</button>
                  <input
                    style={s.num} type="number" min={1} max={10} value={players}
                    onChange={(e) => setPlayers(e.target.value)}
                    onBlur={() => setPlayers(p)}
                  />
                  <button style={s.stepBtn} onClick={() => setPlayers(clamp(p + 1, 1, 10))} aria-label="More players">+</button>
                </div>
              </label>

              <label style={s.control}>
                <span style={s.controlLbl}>Rounds</span>
                <div style={s.stepper}>
                  <button style={s.stepBtn} onClick={() => setRounds(clamp(r - 1, 1, 12))} aria-label="Fewer rounds">–</button>
                  <input
                    style={s.num} type="number" min={1} max={12} value={rounds}
                    onChange={(e) => setRounds(e.target.value)}
                    onBlur={() => setRounds(r)}
                  />
                  <button style={s.stepBtn} onClick={() => setRounds(clamp(r + 1, 1, 12))} aria-label="More rounds">+</button>
                </div>
              </label>
            </div>

            <div style={s.checkRow}>
              <label style={s.check}>
                <input type="checkbox" checked={wantScore} onChange={(e) => setWantScore(e.target.checked)} />
                <span>Score sheet <span style={s.checkHint}>(1 page)</span></span>
              </label>
              <label style={s.check}>
                <input type="checkbox" checked={wantPlayer} onChange={(e) => setWantPlayer(e.target.checked)} />
                <span>Player word sheets <span style={s.checkHint}>({p} page{p > 1 ? 's' : ''})</span></span>
              </label>
            </div>

            <div style={s.actionRow}>
              <button
                style={{ ...ui.btnPrimary, cursor: 'pointer', opacity: (wantScore || wantPlayer) ? 1 : 0.5 }}
                disabled={!wantScore && !wantPlayer}
                onClick={() => window.print()}
              >
                🖨️ Print / Save as PDF
              </button>
              <Link href="/letter-me-this" style={ui.btnGhost}>← Back to the game</Link>
            </div>
            <p style={s.tip}>Tip: in the print dialog choose <b>Save as PDF</b> as the destination to keep a digital copy.</p>
          </div>

          <p style={s.previewLabel}>Preview</p>
        </div>
      </section>

      {/* ── PRINTABLE SHEETS ── */}
      <div className="sheet-stage" style={s.stage}>
        <div className="sheet-stack" style={s.stack}>
          {wantScore && <ScoreSheet players={p} rounds={r} />}
          {wantPlayer && range(p).map((i) => <PlayerSheet key={i} index={i} rounds={r} />)}
          {!wantScore && !wantPlayer && (
            <p className="no-print" style={{ ...ui.body, textAlign: 'center', padding: 40 }}>
              Select at least one sheet type above.
            </p>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: letter portrait; margin: 0.5in; }
          nav, footer, .no-print { display: none !important; }
          main { padding: 0 !important; }
          html, body { background: #fff !important; }
          .sheet-stage { background: #fff !important; padding: 0 !important; overflow: visible !important; }
          .sheet-stack { gap: 0 !important; }
          .sheet {
            page-break-after: always; break-after: page;
            width: 100% !important; min-height: 9.9in !important; height: auto !important;
            padding: 0 !important; margin: 0 !important;
            box-shadow: none !important; border: none !important; border-radius: 0 !important;
            -webkit-print-color-adjust: exact; print-color-adjust: exact;
          }
          .sheet:last-child { page-break-after: auto; break-after: auto; }
        }
      `}</style>
    </>
  )
}

const PAGE_W = '7.5in'

const s = {
  // ---- controls (screen) ----
  controlsWrap: { background: colors.ground, padding: '38px 20px 0' },
  controlsInner: { maxWidth: 780, margin: '0 auto' },
  h1: {
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(30px,5vw,46px)',
    lineHeight: 1.04, letterSpacing: '-0.01em', color: colors.ink,
  },
  panel: {
    ...ui.card, marginTop: 22, padding: 24,
    display: 'flex', flexDirection: 'column', gap: 18,
  },
  controlRow: { display: 'flex', gap: 20, flexWrap: 'wrap' },
  control: { display: 'flex', flexDirection: 'column', gap: 8 },
  controlLbl: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14,
    letterSpacing: '0.02em', color: colors.tealInk,
  },
  stepper: { display: 'flex', alignItems: 'center', gap: 8 },
  stepBtn: {
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 20, lineHeight: 1,
    width: 42, height: 42, borderRadius: 12, border: `1.5px solid ${colors.hair}`,
    background: colors.white, color: colors.tealInk, cursor: 'pointer',
  },
  num: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, textAlign: 'center',
    width: 72, height: 42, borderRadius: 12, border: `1.5px solid ${colors.hair}`,
    color: colors.ink, background: colors.white,
  },
  checkRow: { display: 'flex', gap: 22, flexWrap: 'wrap' },
  check: {
    display: 'flex', alignItems: 'center', gap: 9,
    fontFamily: FONT_BODY, fontSize: 16, fontWeight: 700, color: colors.ink, cursor: 'pointer',
  },
  checkHint: { color: colors.inkFaint, fontWeight: 600 },
  actionRow: { display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' },
  tip: { fontFamily: FONT_BODY, fontSize: 14, color: colors.inkSoft },
  previewLabel: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: colors.inkFaint, margin: '34px 0 4px',
  },

  // ---- stage that holds the printable sheets ----
  stage: { background: colors.ground, padding: '18px 20px 60px', overflowX: 'auto' },
  stack: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 },

  // ---- a single 8.5×11 sheet ----
  paper: {
    width: PAGE_W, minHeight: '10in', background: colors.white,
    border: `1px solid ${colors.hair}`, borderRadius: 6,
    boxShadow: '0 10px 30px rgba(20,40,35,0.10)',
    padding: '0.35in 0.4in', display: 'flex', flexDirection: 'column',
    color: colors.ink,
  },

  sheetHead: {
    display: 'flex', alignItems: 'center', gap: 14,
    borderBottom: `2px solid ${colors.hair}`, paddingBottom: 12, marginBottom: 16,
  },
  logoLmt: { width: 92, height: 'auto', flex: 'none' },
  logoNsg: { width: 74, height: 'auto', flex: 'none' },
  sheetHeadMid: { flex: 1, textAlign: 'center' },
  sheetTitle: {
    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 26, color: colors.ink, lineHeight: 1.05,
  },
  sheetSub: { fontFamily: FONT_BODY, fontSize: 13.5, color: colors.inkSoft, marginTop: 2 },

  nameRow: { display: 'flex', gap: 20, marginBottom: 14 },
  winnerRow: { marginTop: 14 },
  field: { flex: 1, display: 'flex', alignItems: 'flex-end', gap: 8 },
  fieldLbl: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, color: colors.tealInk, whiteSpace: 'nowrap',
  },
  fieldLine: { flex: 1, borderBottom: `1.5px solid ${colors.inkFaint}`, height: 20 },

  // ---- player word columns ----
  wordCols: { display: 'flex', gap: 22, flex: 1 },
  wordCol: { flex: 1, display: 'flex', flexDirection: 'column', gap: 14 },
  roundBlock: {
    flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column',
    border: `1.5px solid ${colors.hair}`, borderRadius: 10, padding: '8px 10px 12px',
  },
  lineWrap: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 },
  roundHead: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
  },
  roundTag: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, color: colors.coral,
  },
  roundLetter: {
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 12.5, color: colors.inkSoft,
    display: 'inline-flex', alignItems: 'center',
  },
  letterBox: {
    display: 'inline-block', width: 26, height: 20, borderBottom: `1.5px solid ${colors.inkFaint}`,
  },
  writeLine: { borderBottom: `1px solid ${colors.hair}`, height: 22 },

  // ---- score table ----
  table: { width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', flex: 'none' },
  th: {
    border: `1.5px solid ${colors.inkFaint}`, background: colors.sky,
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, color: colors.ink,
    padding: '8px 2px', textAlign: 'center',
  },
  thName: { width: '22%', textAlign: 'left', paddingLeft: 8, background: colors.mint },
  thTotal: { width: '12%', background: colors.sun },
  td: { border: `1.5px solid ${colors.inkFaint}`, height: 54 },
  legend: {
    fontFamily: FONT_BODY, fontSize: 12.5, color: colors.inkSoft,
    textAlign: 'center', marginTop: 12, fontStyle: 'italic',
  },
  tdName: { background: '#fff' },
  tdTotal: { background: '#FCFBF4' },

  footNote: {
    marginTop: 'auto', paddingTop: 12,
    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15,
    display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
  },
  footUrl: {
    marginLeft: 'auto', fontFamily: FONT_BODY, fontWeight: 700, fontSize: 12.5, color: colors.inkFaint,
  },
}
