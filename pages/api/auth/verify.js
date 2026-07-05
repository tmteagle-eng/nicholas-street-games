import {
  consumeMagicToken, upsertUser, createSessionToken,
  buildCookie, SESSION_COOKIE,
} from '../../../lib/auth'

export default async function handler(req, res) {
  const { token, next } = req.query
  const dest = typeof next === 'string' && next.startsWith('/') ? next : '/account'

  let email
  try {
    email = await consumeMagicToken(token)
  } catch (error) {
    console.error('[auth] verify error:', JSON.stringify(error))
    return res.redirect(302, '/login?error=server')
  }

  if (!email) {
    // Token missing, already used, or expired.
    return res.redirect(302, '/login?error=expired')
  }

  try {
    await upsertUser(email)
  } catch (error) {
    console.error('[auth] upsert error:', JSON.stringify(error))
    return res.redirect(302, '/login?error=server')
  }

  const session = createSessionToken(email)
  res.setHeader('Set-Cookie', buildCookie(SESSION_COOKIE, session))
  return res.redirect(302, dest)
}
