import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { colors, FONT_DISPLAY, FONT_BODY, ui } from '../styles/tokens'
import { useUser } from '../lib/useUser'

const STARTER = {
  role: 'nickie',
  text: "Hi, I'm Nickie — your Letter Me This! Game Master. Ask me anything: rule questions, new modes, or settle a debate about whether that word really counts.",
}

export default function NickiePage() {
  const { user, refresh } = useUser()
  const [messages, setMessages] = useState([STARTER])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [gate, setGate] = useState(null) // null | { reason, message }
  const [usage, setUsage] = useState(null) // { remaining, limit }
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, gate])

  const send = async (e) => {
    e.preventDefault()
    const question = input.trim()
    if (!question || sending) return
    setMessages((m) => [...m, { role: 'you', text: question }])
    setInput('')
    setSending(true)
    try {
      const res = await fetch('/api/nickie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.gated) {
        setGate({ reason: data.reason, message: data.message })
      } else if (data.answer) {
        setMessages((m) => [...m, { role: 'nickie', text: data.answer }])
        if (data.usage) setUsage(data.usage)
        if (data.authed) refresh()
      } else {
        setMessages((m) => [...m, { role: 'nickie', text: data.error || 'Hmm, something went wrong. Try again.' }])
      }
    } catch {
      setMessages((m) => [...m, { role: 'nickie', text: 'Network hiccup — please try again.' }])
    } finally {
      setSending(false)
    }
  }

  const remaining = user ? user.nickieRemaining : usage?.remaining
  const limit = user ? user.nickieLimit : usage?.limit

  return (
    <>
      <Head>
        <title>Chat with Nickie — Letter Me This! AI Game Master</title>
        <meta name="description" content="Ask Nickie, the Letter Me This! AI Game Master, about rules, game modes, and settling mid-game debates." />
      </Head>

      <section style={s.wrap}>
        <div style={s.inner}>
          <div style={s.header}>
            <div style={s.avatar} aria-hidden="true">✨</div>
            <div>
              <h1 style={s.title}>Nickie</h1>
              <p style={s.subtitle}>Your AI Game Master · <span style={{ color: colors.coralInk, fontWeight: 700 }}>Preview</span></p>
            </div>
            {typeof remaining === 'number' && (
              <span style={s.counter}>{remaining} / {limit} left</span>
            )}
          </div>

          <div style={s.chat} ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} style={{ ...s.bubbleRow, justifyContent: m.role === 'you' ? 'flex-end' : 'flex-start' }}>
                <div style={m.role === 'you' ? s.youBubble : s.nickieBubble}>{m.text}</div>
              </div>
            ))}

            {gate && (
              <div style={s.gate}>
                <div style={{ fontSize: 34, marginBottom: 8 }}>{gate.reason === 'register' ? '🎲' : '⏳'}</div>
                <h3 style={s.gateTitle}>
                  {gate.reason === 'register' ? 'Register to keep playing with Nickie' : 'You’ve hit your free limit'}
                </h3>
                <p style={s.gateBody}>{gate.message}</p>
                {gate.reason === 'register' ? (
                  <div style={s.gateBtns}>
                    <Link href="/register?next=/nickie" style={ui.btnPrimary}>Create a free account</Link>
                    <Link href="/login?next=/nickie" style={ui.btnGhost}>I already have one</Link>
                  </div>
                ) : (
                  <div style={s.gateBtns}>
                    <Link href="/account" style={ui.btnTeal}>View your account</Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <form onSubmit={send} style={s.inputBar}>
            <input
              style={s.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={gate ? 'Register to keep chatting…' : 'Ask Nickie a question…'}
              disabled={!!gate || sending}
              maxLength={500}
              aria-label="Your question for Nickie"
            />
            <button type="submit" style={{ ...s.sendBtn, opacity: !!gate || sending ? 0.5 : 1 }} disabled={!!gate || sending}>
              {sending ? '…' : 'Ask'}
            </button>
          </form>

          <p style={s.footnote}>
            Nickie’s full AI answers are coming soon — you’re trying the preview.{' '}
            {!user && <>Free guests get a few questions; <Link href="/register?next=/nickie" style={{ color: colors.tealInk, fontWeight: 700 }}>register free</Link> for more.</>}
          </p>
        </div>
      </section>
    </>
  )
}

const s = {
  wrap: { minHeight: 'calc(100vh - 64px)', padding: '40px 24px 64px', background: `radial-gradient(70% 50% at 50% 0%, ${colors.teal}12 0%, transparent 60%), ${colors.ground}` },
  inner: { maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 },
  header: { display: 'flex', alignItems: 'center', gap: 14 },
  avatar: { width: 52, height: 52, borderRadius: '50%', background: colors.deepTeal, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 24, flex: '0 0 auto' },
  title: { fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 30, color: colors.ink, lineHeight: 1 },
  subtitle: { fontFamily: FONT_BODY, fontSize: 14, color: colors.inkSoft, marginTop: 2 },
  counter: { marginLeft: 'auto', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, color: colors.inkSoft, background: colors.mint, borderRadius: 999, padding: '6px 14px' },
  chat: {
    background: colors.white, border: `1.5px solid ${colors.hair}`, borderRadius: 22,
    padding: 20, height: 'min(56vh, 480px)', overflowY: 'auto',
    display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 10px 26px rgba(20,40,35,0.05)',
  },
  bubbleRow: { display: 'flex' },
  nickieBubble: { maxWidth: '82%', background: colors.mint, color: colors.ink, padding: '12px 16px', borderRadius: '16px 16px 16px 4px', fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.55 },
  youBubble: { maxWidth: '82%', background: colors.coral, color: '#fff', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.55 },
  gate: { marginTop: 6, textAlign: 'center', background: colors.sun, border: `1.5px solid ${colors.yellow}66`, borderRadius: 18, padding: '26px 24px' },
  gateTitle: { fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 22, color: colors.ink, marginBottom: 8 },
  gateBody: { fontFamily: FONT_BODY, fontSize: 15, color: colors.inkSoft, lineHeight: 1.6, maxWidth: '46ch', margin: '0 auto 18px' },
  gateBtns: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' },
  inputBar: { display: 'flex', gap: 10 },
  input: { flex: 1, fontFamily: FONT_BODY, fontSize: 16, padding: '14px 18px', border: `1.5px solid ${colors.hair}`, borderRadius: 999, outline: 'none', background: colors.white, color: colors.ink },
  sendBtn: { fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, color: '#fff', background: colors.teal, border: 'none', borderRadius: 999, padding: '0 26px', cursor: 'pointer' },
  footnote: { fontFamily: FONT_BODY, fontSize: 13, color: colors.inkFaint, textAlign: 'center', lineHeight: 1.6 },
}
