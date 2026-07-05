import { Resend } from 'resend'
import { createMagicToken, normalizeEmail, isValidEmail } from '../../../lib/auth'

function originFromReq(req) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  const proto = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `${proto}://${host}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = normalizeEmail(req.body?.email)
  const next = typeof req.body?.next === 'string' && req.body.next.startsWith('/') ? req.body.next : '/account'

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  let link
  try {
    const token = await createMagicToken(email)
    const origin = originFromReq(req)
    link = `${origin}/api/auth/verify?token=${token}&next=${encodeURIComponent(next)}`
  } catch (error) {
    console.error('[auth] token error:', JSON.stringify(error))
    return res.status(500).json({ error: 'Could not start sign-in. Please try again.' })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Nicholas Street Games <login@nicholasstreetgames.com>',
      to: email,
      subject: 'Your sign-in link for Nicholas Street Games',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color:#1D2624;">Sign in to Nicholas Street Games</h2>
          <p style="color:#52605C; line-height:1.6;">Click the button below to sign in. This link works once and expires in 15 minutes.</p>
          <p style="margin:28px 0;">
            <a href="${link}" style="background:#E85D3D; color:#fff; text-decoration:none; font-weight:bold; padding:14px 28px; border-radius:999px; display:inline-block;">Sign in →</a>
          </p>
          <p style="color:#8A968F; font-size:13px; line-height:1.6;">If you didn't request this, you can safely ignore it. The link only works from this email.</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('[auth] email error:', JSON.stringify(error))
    return res.status(500).json({ error: 'Could not send the sign-in email. Please try again.' })
  }

  // Always return success (don't leak whether an account already exists).
  return res.status(200).json({ ok: true })
}
