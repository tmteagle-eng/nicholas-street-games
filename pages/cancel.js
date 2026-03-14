import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Cancel() {
  const [form, setForm] = useState({ name: '', email: '', guestCount: '1', reason: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          guestCount: form.guestCount,
          reason: form.reason,
          timestamp: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Head>
        <title>Cancel RSVP · Letter Me This!</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.page}>
        {status === 'success' ? (
          <div style={styles.card}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💛</div>
            <h1 style={styles.heading}>GOT IT.</h1>
            <p style={styles.subText}>
              We&apos;ll miss you! Thanks for letting us know.
            </p>
            <Link href="/party" style={styles.backLink}>
              ← Back to Party Page
            </Link>
          </div>
        ) : (
          <div style={styles.card}>
            <h1 style={styles.heading}>WE&apos;LL MISS YOU.</h1>
            <p style={styles.subText}>
              Life happens. Please let us know so we can plan accordingly.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  style={styles.input}
                  placeholder="Your name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  style={styles.input}
                  placeholder="you@email.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Number of People Cancelling *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={form.guestCount}
                  onChange={(e) => update('guestCount', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Reason for Cancelling (optional)</label>
                <textarea
                  value={form.reason}
                  onChange={(e) => update('reason', e.target.value)}
                  style={{ ...styles.input, minHeight: 100, resize: 'vertical' }}
                  placeholder="No worries if you'd rather not say"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  ...styles.submitBtn,
                  opacity: status === 'sending' ? 0.6 : 1,
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'sending' ? 'SENDING...' : 'SUBMIT CANCELLATION'}
              </button>

              {status === 'error' && (
                <p style={{ color: '#E85D3D', fontSize: 14, marginTop: 12, textAlign: 'center' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        )}
      </div>

      <style>{`
        input:focus, textarea:focus {
          border-color: #20B2AA !important;
          box-shadow: 0 0 0 2px rgba(32,178,170,0.3);
        }
      `}</style>
    </>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f0f0f',
    fontFamily: "'Nunito', sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '48px 40px',
    maxWidth: 480,
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(36px, 6vw, 52px)',
    letterSpacing: 3,
    color: '#fff',
    marginBottom: 12,
  },
  subText: {
    fontSize: 16,
    color: '#888',
    lineHeight: 1.6,
    marginBottom: 36,
  },
  formGroup: {
    marginBottom: 24,
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 13,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: 16,
    fontFamily: "'Nunito', sans-serif",
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 6,
    color: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
  },
  submitBtn: {
    width: '100%',
    padding: '18px',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 20,
    letterSpacing: 3,
    color: '#fff',
    background: '#20B2AA',
    border: 'none',
    borderRadius: 6,
    marginTop: 8,
  },
  backLink: {
    display: 'inline-block',
    marginTop: 24,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 16,
    letterSpacing: 2,
    color: '#20B2AA',
    textDecoration: 'none',
  },
}
