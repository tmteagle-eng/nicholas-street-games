import { useState, useMemo } from 'react'
import Head from 'next/head'

const TEAL = '#20B2AA'
const CORAL = '#E85D3D'

export default function NickieLog() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const load = async (pw) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/nickie-log', {
        headers: { Authorization: `Bearer ${pw}` },
      })
      if (!res.ok) throw new Error('bad')
      const data = await res.json()
      setQuestions(data.questions || [])
      setAuthed(true)
    } catch {
      setError('Invalid password. Try again.')
    }
    setLoading(false)
  }

  const login = (e) => {
    e.preventDefault()
    load(password)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return questions
    return questions.filter(
      (item) =>
        (item.question || '').toLowerCase().includes(q) ||
        (item.answer || '').toLowerCase().includes(q) ||
        (item.email || '').toLowerCase().includes(q)
    )
  }, [questions, query])

  if (!authed) {
    return (
      <>
        <Head><title>Nickie Log · Nicholas Street Games</title></Head>
        <div style={s.page}>
          <div style={s.loginCard}>
            <h1 style={s.loginTitle}>Nickie Question Log</h1>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
              Enter admin password to view what players asked Nickie
            </p>
            <form onSubmit={login}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={s.loginInput}
                autoFocus
              />
              <button type="submit" disabled={loading} style={s.loginBtn}>
                {loading ? 'Loading…' : 'View Log'}
              </button>
              {error && <p style={{ color: CORAL, fontSize: 14, marginTop: 12 }}>{error}</p>}
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head><title>Nickie Log · Nicholas Street Games</title></Head>
      <div style={s.page}>
        <div style={s.wrap}>
          <div style={s.header}>
            <div>
              <h1 style={s.title}>Nickie Question Log</h1>
              <p style={{ color: '#888', fontSize: 14, margin: '4px 0 0' }}>
                {questions.length} question{questions.length !== 1 ? 's' : ''} asked
                {query && ` · ${filtered.length} matching`}
              </p>
            </div>
            <button onClick={() => load(password)} disabled={loading} style={s.refreshBtn}>
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, answers, or email…"
            style={s.search}
          />

          {filtered.length === 0 ? (
            <p style={{ color: '#999', marginTop: 40, textAlign: 'center' }}>
              {questions.length === 0 ? 'No questions logged yet.' : 'No matches.'}
            </p>
          ) : (
            <div style={s.list}>
              {filtered.map((item, i) => (
                <div key={i} style={s.card}>
                  <div style={s.cardMeta}>
                    <span style={{ ...s.badge, background: item.authed ? TEAL : '#bbb' }}>
                      {item.authed ? (item.email || 'Registered') : 'Guest'}
                    </span>
                    <span style={s.time}>{fmt(item.at)}</span>
                  </div>
                  <p style={s.q}>{item.question}</p>
                  <p style={s.a}>{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function fmt(iso) {
  if (!iso) return ''
  try { return new Date(iso).toLocaleString() } catch { return iso }
}

const s = {
  page: { minHeight: '100vh', background: '#f4f4f2', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '40px 20px' },
  wrap: { maxWidth: 820, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 800, color: '#1a1a1a', margin: 0 },
  refreshBtn: { background: TEAL, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' },
  search: { width: '100%', boxSizing: 'border-box', padding: '12px 14px', fontSize: 15, border: '1px solid #ddd', borderRadius: 10, marginBottom: 22, background: '#fff' },
  list: { display: 'flex', flexDirection: 'column', gap: 14 },
  card: { background: '#fff', border: '1px solid #eee', borderRadius: 14, padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  cardMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 },
  badge: { color: '#fff', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  time: { color: '#999', fontSize: 12, whiteSpace: 'nowrap' },
  q: { fontSize: 16, fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px' },
  a: { fontSize: 15, color: '#444', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap' },
  loginCard: { maxWidth: 380, margin: '12vh auto 0', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' },
  loginTitle: { fontSize: 24, fontWeight: 800, color: '#1a1a1a', margin: '0 0 4px' },
  loginInput: { width: '100%', boxSizing: 'border-box', padding: '12px 14px', fontSize: 16, border: '1px solid #ddd', borderRadius: 10, marginBottom: 12 },
  loginBtn: { width: '100%', padding: '12px', fontSize: 16, fontWeight: 700, color: '#fff', background: TEAL, border: 'none', borderRadius: 10, cursor: 'pointer' },
}
