import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function RsvpDashboard() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [rsvps, setRsvps] = useState([])
  const [releases, setReleases] = useState([])
  const [cancellations, setCancellations] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/rsvps', {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (res.status === 401) throw new Error('auth')
      if (!res.ok) throw new Error('server')
      const data = await res.json()
      setRsvps(data.rsvps)
      setReleases(data.releases || [])
      setCancellations(data.cancellations || [])
      setAuthed(true)
    } catch (err) {
      setError(
        err.message === 'server'
          ? 'Server error — couldn’t load the dashboard. Try again in a moment.'
          : err.message === 'auth'
          ? 'Invalid password. Try again.'
          : 'Network error — check your connection and try again.'
      )
    }
    setLoading(false)
  }

  const updateRsvp = async (submittedAt, updates) => {
    if (!confirm(`Are you sure you want to ${updates.attending === 'no' ? 'mark as declined' : updates.attending === 'yes' ? 'mark as attending' : 'update'}?`)) return
    try {
      const res = await fetch('/api/rsvps', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ submittedAt, updates }),
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setRsvps(rsvps.map((r) => r.submittedAt === submittedAt ? data.rsvp : r))
    } catch { alert('Failed to update RSVP') }
  }

  const deleteRsvp = async (submittedAt, name) => {
    if (!confirm(`Delete RSVP for "${name}"? This cannot be undone.`)) return
    try {
      const res = await fetch('/api/rsvps', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ submittedAt }),
      })
      if (!res.ok) throw new Error('Failed')
      setRsvps(rsvps.filter((r) => r.submittedAt !== submittedAt))
    } catch { alert('Failed to delete RSVP') }
  }

  const attending = rsvps.filter((r) => r.attending === 'yes')
  const declined = rsvps.filter((r) => r.attending === 'no')
  const totalGuests = attending.reduce((sum, r) => sum + parseInt(r.guests || '1', 10), 0)

  // Check if a person has cancelled (match by name or email, case-insensitive)
  const isCancelled = (rsvp) => cancellations.some(
    (c) => c.name.toLowerCase().trim() === rsvp.name.toLowerCase().trim() ||
           c.email.toLowerCase().trim() === rsvp.email.toLowerCase().trim()
  )

  // Collect all signed names from releases (lowercased for matching)
  const allSignedNames = releases.flatMap((r) => r.names || [])
  const signedNamesLower = allSignedNames.map((n) => n.toLowerCase().trim())

  // For each attending RSVP, check if the primary name has signed
  const trackingData = attending.map((r) => {
    const nameMatch = signedNamesLower.includes(r.name.toLowerCase().trim())
    const guestCount = parseInt(r.guests || '1', 10)
    return { ...r, guestCount, primarySigned: nameMatch }
  })

  const signedCount = allSignedNames.length
  const unsignedPrimaries = trackingData.filter((r) => !r.primarySigned)

  if (!authed) {
    return (
      <>
        <Head><title>RSVP Admin · Nicholas Street Games</title></Head>
        <div style={styles.page}>
          <div style={styles.loginCard}>
            <h1 style={styles.loginTitle}>RSVP Dashboard</h1>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
              Enter admin password to view RSVPs
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
                {loading ? 'Loading...' : 'View RSVPs'}
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
      <Head><title>RSVP Dashboard · Nicholas Street Games</title></Head>
      <div style={{ ...styles.page, alignItems: 'flex-start' }}>
        <div style={styles.dashboard}>

          <div style={styles.header}>
            <h1 style={styles.dashTitle}>Letter Me This! Pre-Launch Party</h1>
            <p style={styles.dashSub}>RSVP Dashboard · March 28, 2026</p>
          </div>

          {/* Stats */}
          <div style={styles.statsRow}>
            <div style={{ ...styles.statCard, borderTopColor: '#20B2AA' }}>
              <div style={styles.statNumber}>{rsvps.length}</div>
              <div style={styles.statLabel}>Total RSVPs</div>
            </div>
            <div style={{ ...styles.statCard, borderTopColor: '#3a7d44' }}>
              <div style={styles.statNumber}>{attending.length}</div>
              <div style={styles.statLabel}>Attending</div>
            </div>
            <div style={{ ...styles.statCard, borderTopColor: '#F5C518' }}>
              <div style={styles.statNumber}>{totalGuests}</div>
              <div style={styles.statLabel}>Total Guests</div>
            </div>
            <div style={{ ...styles.statCard, borderTopColor: '#E85D3D' }}>
              <div style={styles.statNumber}>{declined.length}</div>
              <div style={styles.statLabel}>Declined</div>
            </div>
            <div style={{ ...styles.statCard, borderTopColor: '#c9a000' }}>
              <div style={styles.statNumber}>{signedCount}</div>
              <div style={styles.statLabel}>Names Signed</div>
            </div>
            <div style={{ ...styles.statCard, borderTopColor: signedCount >= totalGuests ? '#3a7d44' : '#E85D3D' }}>
              <div style={styles.statNumber}>{totalGuests - signedCount > 0 ? totalGuests - signedCount : 0}</div>
              <div style={styles.statLabel}>Still Need</div>
            </div>
            <div style={{ ...styles.statCard, borderTopColor: '#E85D3D' }}>
              <div style={styles.statNumber}>{cancellations.length}</div>
              <div style={styles.statLabel}>Cancellations</div>
            </div>
          </div>

          {/* Attending Table */}
          <div style={styles.tableSection}>
            <h2 style={styles.tableTitle}>Attending ({attending.length})</h2>
            {attending.length === 0 ? (
              <p style={styles.emptyMsg}>No attendees yet</p>
            ) : (
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Phone</th>
                      <th style={styles.th}>Guests</th>
                      <th style={styles.th}>Dietary</th>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attending.map((r, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={styles.td}>
                          {r.name}
                          {isCancelled(r) && (
                            <span style={{
                              display: 'inline-block', marginLeft: 8,
                              background: 'rgba(232,93,61,0.2)', border: '1px solid rgba(232,93,61,0.4)',
                              borderRadius: 4, padding: '2px 8px',
                              fontSize: 10, fontFamily: "'Bebas Neue', sans-serif",
                              letterSpacing: 1, color: '#E85D3D',
                            }}>CANCELLED</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          <a href={`mailto:${r.email}`} style={styles.link}>{r.email}</a>
                        </td>
                        <td style={styles.td}>
                          <a href={`tel:${r.phone}`} style={styles.link}>{r.phone}</a>
                        </td>
                        <td style={{ ...styles.td, textAlign: 'center' }}>{r.guests}</td>
                        <td style={styles.td}>{r.dietary || '—'}</td>
                        <td style={{ ...styles.td, color: '#888', fontSize: 12 }}>
                          {new Date(r.submittedAt).toLocaleDateString()}
                        </td>
                        <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>
                          <button onClick={() => updateRsvp(r.submittedAt, { attending: 'no', guests: '0' })} style={styles.actionBtn}>
                            Mark Declined
                          </button>
                          <button onClick={() => deleteRsvp(r.submittedAt, r.name)} style={{ ...styles.actionBtn, color: '#E85D3D', borderColor: 'rgba(232,93,61,0.3)' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Declined Table */}
          {declined.length > 0 && (
            <div style={styles.tableSection}>
              <h2 style={{ ...styles.tableTitle, color: '#E85D3D' }}>Declined ({declined.length})</h2>
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Phone</th>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {declined.map((r, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={styles.td}>{r.name}</td>
                        <td style={styles.td}>
                          <a href={`mailto:${r.email}`} style={styles.link}>{r.email}</a>
                        </td>
                        <td style={styles.td}>
                          <a href={`tel:${r.phone}`} style={styles.link}>{r.phone}</a>
                        </td>
                        <td style={{ ...styles.td, color: '#888', fontSize: 12 }}>
                          {new Date(r.submittedAt).toLocaleDateString()}
                        </td>
                        <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>
                          <button onClick={() => updateRsvp(r.submittedAt, { attending: 'yes', guests: '1' })} style={{ ...styles.actionBtn, color: '#3a7d44', borderColor: 'rgba(58,125,68,0.3)' }}>
                            Mark Attending
                          </button>
                          <button onClick={() => deleteRsvp(r.submittedAt, r.name)} style={{ ...styles.actionBtn, color: '#E85D3D', borderColor: 'rgba(232,93,61,0.3)' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Release Tracker */}
          <div style={styles.tableSection}>
            <h2 style={{ ...styles.tableTitle, color: '#c9a000' }}>
              Release Tracker — {signedCount} of {totalGuests} Guests Signed
            </h2>
            <p style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>
              Each RSVP holder is responsible for getting their entire party to sign.
              A checkmark means that person's name was found on a signed release.
            </p>
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>RSVP Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Party Size</th>
                    <th style={styles.th}>Primary Signed</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingData.map((r, i) => (
                    <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                      <td style={{ ...styles.td, textAlign: 'center', fontSize: 18 }}>
                        {r.primarySigned ? '✅' : '❌'}
                      </td>
                      <td style={styles.td}>{r.name}</td>
                      <td style={styles.td}>
                        <a href={`mailto:${r.email}`} style={styles.link}>{r.email}</a>
                      </td>
                      <td style={{ ...styles.td, textAlign: 'center' }}>{r.guestCount}</td>
                      <td style={{
                        ...styles.td,
                        color: r.primarySigned ? '#3a7d44' : '#E85D3D',
                        fontWeight: 700,
                      }}>
                        {r.primarySigned ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {unsignedPrimaries.length > 0 && (
              <div style={{
                marginTop: 16, padding: '16px 20px',
                background: 'rgba(232,93,61,0.1)', border: '1px solid rgba(232,93,61,0.3)',
                borderRadius: 8,
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 14,
                  letterSpacing: 2, color: '#E85D3D', marginBottom: 8,
                }}>
                  STILL NEED SIGNATURES ({unsignedPrimaries.length})
                </div>
                <div style={{ fontSize: 13, color: '#ddd', lineHeight: 1.8 }}>
                  {unsignedPrimaries.map((r, i) => (
                    <span key={i}>
                      {r.name} ({r.guestCount} guest{r.guestCount !== 1 ? 's' : ''})
                      {i < unsignedPrimaries.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* All Signed Names */}
          {allSignedNames.length > 0 && (
            <div style={styles.tableSection}>
              <h2 style={{ ...styles.tableTitle, color: '#20B2AA' }}>
                All Signed Names ({allSignedNames.length})
              </h2>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8,
              }}>
                {allSignedNames.map((name, i) => (
                  <span key={i} style={{
                    background: 'rgba(32,178,170,0.15)', border: '1px solid rgba(32,178,170,0.3)',
                    borderRadius: 20, padding: '6px 16px', fontSize: 13, color: '#20B2AA',
                  }}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Releases Table */}
          <div style={styles.tableSection}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 style={{ ...styles.tableTitle, color: '#c9a000', marginBottom: 0 }}>Release Submissions ({releases.length})</h2>
              <Link href="/releases" style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 2,
                color: '#fff', background: '#c9a000', padding: '8px 20px',
                borderRadius: 4, textDecoration: 'none',
              }}>
                View & Print with Signatures
              </Link>
            </div>
            {releases.length === 0 ? (
              <p style={styles.emptyMsg}>No releases signed yet</p>
            ) : (
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Names</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {releases.map((r, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={styles.td}>{r.names.join(', ')}</td>
                        <td style={styles.td}>
                          {r.email ? <a href={`mailto:${r.email}`} style={styles.link}>{r.email}</a> : '—'}
                        </td>
                        <td style={{ ...styles.td, color: '#888', fontSize: 12 }}>
                          {new Date(r.submittedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Cancellations Table */}
          {cancellations.length > 0 && (
            <div style={styles.tableSection}>
              <h2 style={{ ...styles.tableTitle, color: '#E85D3D' }}>Cancellations ({cancellations.length})</h2>
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}># Cancelling</th>
                      <th style={styles.th}>Reason</th>
                      <th style={styles.th}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancellations.map((c, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={styles.td}>{c.name}</td>
                        <td style={styles.td}>
                          <a href={`mailto:${c.email}`} style={styles.link}>{c.email}</a>
                        </td>
                        <td style={{ ...styles.td, textAlign: 'center' }}>{c.guestCount}</td>
                        <td style={styles.td}>{c.reason || '—'}</td>
                        <td style={{ ...styles.td, color: '#888', fontSize: 12 }}>
                          {new Date(c.submittedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#111',
    fontFamily: "'Nunito', sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loginCard: {
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '48px 40px',
    textAlign: 'center',
    maxWidth: 380,
    width: '100%',
  },
  loginTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 28,
    letterSpacing: 3,
    color: '#fff',
    marginBottom: 8,
  },
  loginInput: {
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
    marginBottom: 16,
  },
  loginBtn: {
    width: '100%',
    padding: '14px',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18,
    letterSpacing: 3,
    color: '#fff',
    background: '#E85D3D',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  dashboard: {
    maxWidth: 1000,
    width: '100%',
  },
  header: {
    marginBottom: 32,
  },
  dashTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(28px, 5vw, 40px)',
    letterSpacing: 3,
    color: '#fff',
    marginBottom: 4,
  },
  dashSub: {
    fontSize: 14,
    color: '#888',
    letterSpacing: 1,
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 16,
    marginBottom: 40,
  },
  statCard: {
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.08)',
    borderTop: '4px solid',
    borderRadius: 8,
    padding: '24px 20px',
    textAlign: 'center',
  },
  statNumber: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 42,
    color: '#fff',
    letterSpacing: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  tableSection: {
    marginBottom: 32,
  },
  tableTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 20,
    letterSpacing: 2,
    color: '#3a7d44',
    marginBottom: 12,
  },
  tableWrap: {
    overflowX: 'auto',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.08)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14,
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 12,
    letterSpacing: 2,
    color: '#888',
    textTransform: 'uppercase',
    background: '#1a1a1a',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  td: {
    padding: '12px 16px',
    color: '#ddd',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  trEven: {
    background: 'rgba(255,255,255,0.02)',
  },
  link: {
    color: '#20B2AA',
    textDecoration: 'none',
  },
  actionBtn: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 4,
    color: '#888',
    fontSize: 11,
    fontFamily: "'Bebas Neue', sans-serif",
    letterSpacing: 1,
    padding: '4px 10px',
    cursor: 'pointer',
    marginRight: 6,
  },
  emptyMsg: {
    color: '#666',
    fontSize: 14,
    padding: 24,
    textAlign: 'center',
    background: '#1a1a1a',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.08)',
  },
}
