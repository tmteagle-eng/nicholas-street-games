import { useState } from 'react'
import { useRouter } from 'next/router'
import { colors, FONT_DISPLAY, FONT_BODY, ui } from '../styles/tokens'

// Passwordless email form shared by /login and /register. `mode` only changes copy.
export default function AuthForm({ mode = 'login' }) {
  const router = useRouter()
  const isRegister = mode === 'register'
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const nextParam = typeof router.query.next === 'string' ? router.query.next : undefined
  const queryError = router.query.error

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/auth/request-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, next: nextParam }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) setStatus('sent')
      else { setError(data.error || 'Something went wrong.'); setStatus('error') }
    } catch {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={s.card}>
        <div style={s.emoji}>📬</div>
        <h1 style={s.title}>Check your email</h1>
        <p style={s.body}>
          We sent a sign-in link to <strong>{email}</strong>. Click it to
          {isRegister ? ' finish creating your account' : ' sign in'}. The link
          works once and expires in 15 minutes.
        </p>
        <button style={{ ...ui.btnGhost, marginTop: 20 }} onClick={() => setStatus('idle')}>
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <div style={s.card}>
      <h1 style={s.title}>{isRegister ? 'Create your account' : 'Sign in'}</h1>
      <p style={s.body}>
        {isRegister
          ? 'Register free to unlock more time with Nickie, your AI Game Master, and to check out faster.'
          : 'Enter your email and we’ll send you a one-time sign-in link. No password required.'}
      </p>

      {queryError === 'expired' && (
        <p style={s.notice}>That link expired or was already used. Enter your email to get a fresh one.</p>
      )}
      {queryError === 'server' && (
        <p style={s.notice}>Something went wrong signing you in. Please try again.</p>
      )}

      <form onSubmit={submit} style={s.form}>
        <input
          type="email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          style={s.input}
          aria-label="Email address"
        />
        <button type="submit" style={{ ...ui.btnPrimary, opacity: status === 'sending' ? 0.6 : 1 }} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : isRegister ? 'Send my sign-up link' : 'Send my sign-in link'}
        </button>
      </form>

      {status === 'error' && <p style={s.error}>{error}</p>}

      <p style={s.switch}>
        {isRegister ? (
          <>Already have an account? <a href="/login" style={s.link}>Sign in</a></>
        ) : (
          <>New here? <a href="/register" style={s.link}>Create an account</a></>
        )}
      </p>
    </div>
  )
}

const s = {
  card: {
    maxWidth: 460, margin: '0 auto', background: colors.white,
    border: `1.5px solid ${colors.hair}`, borderRadius: 24, padding: '40px 36px',
    boxShadow: '0 12px 34px rgba(20,40,35,0.07)', textAlign: 'center',
  },
  emoji: { fontSize: 44, marginBottom: 10 },
  title: { fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 30, color: colors.ink, marginBottom: 12 },
  body: { fontFamily: FONT_BODY, fontSize: 15.5, color: colors.inkSoft, lineHeight: 1.6 },
  form: { display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 },
  input: {
    fontFamily: FONT_BODY, fontSize: 16, padding: '13px 16px',
    border: `1.5px solid ${colors.hair}`, borderRadius: 12, outline: 'none',
    color: colors.ink, background: colors.ground, textAlign: 'center',
  },
  notice: { fontFamily: FONT_BODY, fontSize: 13.5, color: colors.coralInk, background: '#FDECE7', borderRadius: 10, padding: '10px 14px', marginTop: 16 },
  error: { fontFamily: FONT_BODY, fontSize: 14, color: colors.coralInk, marginTop: 14 },
  switch: { fontFamily: FONT_BODY, fontSize: 14, color: colors.inkSoft, marginTop: 22 },
  link: { color: colors.tealInk, fontWeight: 700, textDecoration: 'none' },
}
