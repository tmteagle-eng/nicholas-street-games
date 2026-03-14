import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function ReleasePage() {
  const [names, setNames] = useState([''])
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState('idle')
  const [hasSigned, setHasSigned] = useState(false)
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)
    drawPlaceholder(ctx, rect.width, rect.height)
  }, [])

  const drawPlaceholder = (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = '#ccc'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(20, h - 30)
    ctx.lineTo(w - 20, h - 30)
    ctx.stroke()
    ctx.fillStyle = '#bbb'
    ctx.font = '14px Nunito, sans-serif'
    ctx.fillText('Sign here', 20, h - 38)
  }

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  const startDraw = (e) => {
    e.preventDefault()
    isDrawing.current = true
    const ctx = canvasRef.current.getContext('2d')
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    if (!hasSigned) setHasSigned(true)
  }

  const draw = (e) => {
    e.preventDefault()
    if (!isDrawing.current) return
    const ctx = canvasRef.current.getContext('2d')
    const pos = getPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDraw = () => { isDrawing.current = false }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    drawPlaceholder(ctx, rect.width, rect.height)
    setHasSigned(false)
  }

  const getSignatureData = () => {
    return canvasRef.current.toDataURL('image/png')
  }

  const addName = () => setNames([...names, ''])
  const updateName = (i, val) => {
    const updated = [...names]
    updated[i] = val
    setNames(updated)
  }
  const removeName = (i) => {
    if (names.length <= 1) return
    setNames(names.filter((_, idx) => idx !== i))
  }

  const canSubmit = agreed && names.some(n => n.trim()) && hasSigned && status !== 'sending'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          names: names.filter(n => n.trim()),
          email: email || null,
          agreed: true,
          signatureImage: getSignatureData(),
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
        <title>Photo & Video Release · Letter Me This! Pre-Launch Party</title>
        <meta name="description" content="Sign the photo and video release for the Letter Me This! Pre-Launch Party." />
      </Head>

      <div style={{ fontFamily: "'Nunito', sans-serif", background: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
        <nav style={s.nav}>
          <Link href="/" style={s.navLogo}>
            Nicholas Street <span style={{ color: '#20B2AA' }}>Games</span>
          </Link>
        </nav>

        <div style={s.container}>
          <div style={s.header}>
            <img src="/images/nsg-logo.png" alt="Nicholas Street Games" style={{ width: 120, height: 'auto', margin: '0 auto 20px' }} />
            <h1 style={s.title}>Photo & Video Release</h1>
            <p style={s.subtitle}>Letter Me This! Pre-Launch Party · March 28, 2026</p>
          </div>

          {status === 'success' ? (
            <div style={s.successCard}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📹</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 3, color: '#1a1a1a', marginBottom: 12 }}>
                Release Signed!
              </h2>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.6 }}>
                Thank you for signing the photo and video release.
                We appreciate your participation — see you at the party!
              </p>
              <Link href="/launch" style={s.backLink}>
                Back to Event Details
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={s.card}>
                <p style={s.legalText}>
                  By signing below, I grant <strong style={{ color: '#fff' }}>Nicholas Street Games, LLC</strong> permission
                  to use my image, likeness, and voice captured during the Letter Me This! Pre-Launch Party
                  on <strong style={{ color: '#fff' }}>March 28, 2026</strong> at{' '}
                  <strong style={{ color: '#fff' }}>520 N 2nd Avenue, Upland, CA 91786</strong> for
                  social media, advertising, promotional content, and any other marketing purposes
                  related to the Letter Me This! game and Nicholas Street Games brand.
                </p>

                <div style={s.checkboxWrap}>
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={s.checkbox}
                  />
                  <label htmlFor="agree" style={s.checkboxLabel}>
                    I understand and agree that my image, likeness, and voice may be used by Nicholas Street Games, LLC
                    for social media and promotional content related to the Letter Me This! game launch
                  </label>
                </div>
              </div>

              <div style={s.card}>
                <div style={s.sectionHeader}>Names</div>
                {names.map((name, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateName(i, e.target.value)}
                      placeholder={`Full Name${names.length > 1 ? ` #${i + 1}` : ''}`}
                      style={s.input}
                    />
                    {names.length > 1 && (
                      <button type="button" onClick={() => removeName(i)} style={s.removeBtn}>
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addName} style={s.addBtn}>
                  + Add Another Person
                </button>
              </div>

              <div style={s.card}>
                <div style={s.sectionHeader}>Email (optional)</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  style={s.input}
                />
              </div>

              <div style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={s.sectionHeader}>Signature</div>
                  <button type="button" onClick={clearSignature} style={s.clearBtn}>
                    Clear
                  </button>
                </div>
                <canvas
                  ref={canvasRef}
                  style={s.canvas}
                  onMouseDown={startDraw}
                  onMouseMove={draw}
                  onMouseUp={stopDraw}
                  onMouseLeave={stopDraw}
                  onTouchStart={startDraw}
                  onTouchMove={draw}
                  onTouchEnd={stopDraw}
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  ...s.submitBtn,
                  opacity: canSubmit ? 1 : 0.5,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                }}
              >
                {status === 'sending' ? 'SUBMITTING...' : 'SIGN & SUBMIT RELEASE'}
              </button>

              {status === 'error' && (
                <p style={{ color: '#E85D3D', fontSize: 14, marginTop: 12, textAlign: 'center' }}>
                  Something went wrong — please try again or contact tim@nicholasstreetgames.com
                </p>
              )}
            </form>
          )}

          <footer style={s.footer}>
            <span>© 2026 Nicholas Street Games, LLC</span>
          </footer>
        </div>
      </div>

      <style>{`
        canvas { touch-action: none; }
        input:focus { border-color: #20B2AA !important; box-shadow: 0 0 0 2px rgba(32,178,170,0.3); }
      `}</style>
    </>
  )
}

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    background: 'rgba(26,26,26,0.96)', backdropFilter: 'blur(8px)',
    padding: '12px 40px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    borderBottom: '3px solid #20B2AA',
  },
  navLogo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 13, letterSpacing: 4,
    color: '#888', textDecoration: 'none', textTransform: 'uppercase',
  },
  container: {
    maxWidth: 560, margin: '0 auto', padding: '80px 24px 40px',
  },
  header: {
    textAlign: 'center', marginBottom: 32,
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(28px, 6vw, 42px)', letterSpacing: 3, color: '#fff', marginBottom: 8,
  },
  subtitle: {
    fontSize: 14, color: '#888', letterSpacing: 1,
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, padding: '28px 24px', marginBottom: 20,
  },
  legalText: {
    fontSize: 15, lineHeight: 1.75, color: '#aaa', marginBottom: 24,
  },
  checkboxWrap: {
    display: 'flex', gap: 12, alignItems: 'flex-start',
  },
  checkbox: {
    marginTop: 4, flexShrink: 0, width: 20, height: 20, accentColor: '#20B2AA',
  },
  checkboxLabel: {
    fontSize: 14, lineHeight: 1.6, color: '#ccc',
  },
  sectionHeader: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 14, letterSpacing: 2, color: '#20B2AA',
    textTransform: 'uppercase', marginBottom: 12,
  },
  input: {
    width: '100%', padding: '14px 16px', fontSize: 16,
    fontFamily: "'Nunito', sans-serif",
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 6, color: '#fff', outline: 'none', boxSizing: 'border-box',
  },
  removeBtn: {
    padding: '0 14px', fontSize: 16, color: '#E85D3D',
    background: 'rgba(232,93,61,0.1)', border: '1px solid rgba(232,93,61,0.3)',
    borderRadius: 6, cursor: 'pointer', flexShrink: 0,
  },
  addBtn: {
    background: 'none', border: '1px dashed rgba(255,255,255,0.2)',
    borderRadius: 6, padding: '12px', width: '100%',
    color: '#20B2AA', fontSize: 14, fontWeight: 700,
    cursor: 'pointer', marginTop: 4,
  },
  canvas: {
    width: '100%', height: 160, borderRadius: 6,
    border: '1px solid rgba(255,255,255,0.15)', cursor: 'crosshair',
  },
  clearBtn: {
    background: 'none', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 4, padding: '6px 14px',
    color: '#888', fontSize: 12, fontFamily: "'Bebas Neue', sans-serif",
    letterSpacing: 2, cursor: 'pointer',
  },
  submitBtn: {
    width: '100%', padding: '20px',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 22, letterSpacing: 3,
    color: '#fff', background: '#20B2AA',
    border: 'none', borderRadius: 6,
    boxShadow: '0 4px 20px rgba(32,178,170,0.3)',
  },
  successCard: {
    background: '#fff', borderRadius: 10, padding: '48px 32px',
    textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },
  backLink: {
    display: 'inline-block', marginTop: 24,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 16, letterSpacing: 2, color: '#20B2AA', textDecoration: 'none',
  },
  footer: {
    textAlign: 'center', padding: '40px 0 0',
    fontSize: 11, color: '#555', letterSpacing: 1,
    fontFamily: "'Bebas Neue', sans-serif",
  },
}
