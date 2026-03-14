import { useState } from 'react'
import Head from 'next/head'

export default function ReleaseRecords() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [releases, setReleases] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/releases', {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (!res.ok) throw new Error('Invalid password')
      const data = await res.json()
      setReleases(data.releases)
      setAuthed(true)
    } catch {
      setError('Invalid password. Try again.')
    }
    setLoading(false)
  }

  if (!authed) {
    return (
      <>
        <Head><title>Release Records · Nicholas Street Games</title></Head>
        <div style={styles.page}>
          <div style={styles.loginCard}>
            <h1 style={styles.loginTitle}>Release Records</h1>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
              Enter admin password to view signed releases
            </p>
            <form onSubmit={login}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={styles.loginInput}
                autoFocus
              />
              <button type="submit" disabled={loading} style={styles.loginBtn}>
                {loading ? 'Loading...' : 'View Releases'}
              </button>
              {error && <p style={{ color: '#E85D3D', fontSize: 14, marginTop: 12 }}>{error}</p>}
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head><title>Release Records · Nicholas Street Games</title></Head>
      <div style={styles.printPage}>
        <div style={styles.controls} className="no-print">
          <button onClick={() => window.print()} style={styles.printBtn}>
            Print All Records
          </button>
          <span style={{ color: '#888', fontSize: 14 }}>
            {releases.length} release{releases.length !== 1 ? 's' : ''} signed
          </span>
        </div>

        {releases.map((release, idx) => (
          <div key={idx} style={styles.record} className="release-record">
            <div style={styles.recordHeader}>
              <img src="/images/nsg-logo.png" alt="NSG" style={{ height: 50 }} />
              <div>
                <h2 style={styles.recordTitle}>Photo & Video Release</h2>
                <p style={styles.recordSub}>Nicholas Street Games, LLC · Letter Me This! Pre-Launch Party</p>
              </div>
            </div>

            <div style={styles.recordBody}>
              <p style={styles.recordLegal}>
                By signing below, the undersigned grant(s) Nicholas Street Games, LLC permission
                to use their image, likeness, and voice captured during the Letter Me This! Pre-Launch Party
                on March 28, 2026 at 520 N 2nd Avenue, Upland, CA 91786 for social media, advertising,
                promotional content, and any other marketing purposes related to the Letter Me This! game
                and Nicholas Street Games brand.
              </p>

              <div style={styles.recordField}>
                <div style={styles.fieldLabel}>Name(s):</div>
                <div style={styles.fieldValue}>
                  {release.names.map((name, i) => (
                    <div key={i}>{name}</div>
                  ))}
                </div>
              </div>

              {release.email && (
                <div style={styles.recordField}>
                  <div style={styles.fieldLabel}>Email:</div>
                  <div style={styles.fieldValue}>{release.email}</div>
                </div>
              )}

              <div style={styles.recordField}>
                <div style={styles.fieldLabel}>Date Signed:</div>
                <div style={styles.fieldValue}>
                  {new Date(release.submittedAt).toLocaleString()}
                </div>
              </div>

              <div style={styles.recordField}>
                <div style={styles.fieldLabel}>Signature:</div>
              </div>
              {release.signatureImage && (
                <img
                  src={release.signatureImage}
                  alt={`Signature of ${release.names.join(', ')}`}
                  style={styles.signatureImg}
                />
              )}
            </div>

            <div style={styles.recordFooter}>
              © 2026 Nicholas Street Games, LLC · Upland, CA
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .release-record {
            page-break-after: always;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
          }
          .release-record:last-child { page-break-after: auto; }
          body { background: #fff !important; }
        }
      `}</style>
    </>
  )
}

const styles = {
  page: {
    minHeight: '100vh', background: '#111',
    fontFamily: "'Nunito', sans-serif",
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  loginCard: {
    background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '48px 40px', textAlign: 'center', maxWidth: 380, width: '100%',
  },
  loginTitle: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 28,
    letterSpacing: 3, color: '#fff', marginBottom: 8,
  },
  loginInput: {
    width: '100%', padding: '14px 16px', fontSize: 16,
    fontFamily: "'Nunito', sans-serif",
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 6, color: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 16,
  },
  loginBtn: {
    width: '100%', padding: '14px',
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 3,
    color: '#fff', background: '#20B2AA', border: 'none', borderRadius: 6, cursor: 'pointer',
  },
  printPage: {
    minHeight: '100vh', background: '#f5f5f5',
    fontFamily: "'Nunito', sans-serif", padding: 24,
  },
  controls: {
    maxWidth: 800, margin: '0 auto 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  printBtn: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 2,
    color: '#fff', background: '#20B2AA', border: 'none',
    borderRadius: 6, padding: '12px 32px', cursor: 'pointer',
  },
  record: {
    maxWidth: 800, margin: '0 auto 32px',
    background: '#fff', borderRadius: 8,
    border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  recordHeader: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '24px 32px', borderBottom: '3px solid #20B2AA',
  },
  recordTitle: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 2,
    color: '#1a1a1a', margin: 0,
  },
  recordSub: {
    fontSize: 12, color: '#888', letterSpacing: 0.5, margin: 0,
  },
  recordBody: {
    padding: '28px 32px',
  },
  recordLegal: {
    fontSize: 13, lineHeight: 1.7, color: '#555',
    marginBottom: 24, paddingBottom: 24,
    borderBottom: '1px solid #eee',
  },
  recordField: {
    display: 'flex', gap: 12, marginBottom: 12, alignItems: 'baseline',
  },
  fieldLabel: {
    fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
    color: '#888', fontWeight: 700, minWidth: 100, flexShrink: 0,
  },
  fieldValue: {
    fontSize: 15, color: '#1a1a1a', fontWeight: 600,
  },
  signatureImg: {
    maxWidth: 400, height: 'auto', border: '1px solid #eee',
    borderRadius: 4, marginTop: 8,
  },
  recordFooter: {
    padding: '16px 32px', borderTop: '1px solid #eee',
    fontSize: 11, color: '#aaa', letterSpacing: 0.5,
  },
}
