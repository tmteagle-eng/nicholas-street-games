import { sessionFromReq, getUser, userLimit, LIMITS } from '../../../lib/auth'

export default async function handler(req, res) {
  const session = sessionFromReq(req)
  if (!session) {
    return res.status(200).json({ user: null, limits: LIMITS })
  }

  let user
  try {
    user = await getUser(session.email)
  } catch (error) {
    console.error('[auth] me error:', JSON.stringify(error))
    return res.status(500).json({ error: 'Could not load your account.' })
  }

  if (!user) return res.status(200).json({ user: null, limits: LIMITS })

  const limit = userLimit(user)
  return res.status(200).json({
    user: {
      email: user.email,
      plan: user.plan,
      nickieUsed: user.nickieUsed || 0,
      nickieLimit: limit,
      nickieRemaining: Math.max(0, limit - (user.nickieUsed || 0)),
    },
    limits: LIMITS,
  })
}
