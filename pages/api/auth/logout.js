import { clearCookie, SESSION_COOKIE } from '../../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  res.setHeader('Set-Cookie', clearCookie(SESSION_COOKIE))
  return res.status(200).json({ ok: true })
}
