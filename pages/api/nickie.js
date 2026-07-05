// Nickie — AI Game Master endpoint.
//
// Handles identity + usage metering and returns an answer. The actual LLM call
// is STUBBED (canned game-master responses) until an AI provider is wired.
//
// To go live: replace `nickieAnswer()` with a call to your LLM of choice,
// keeping the metering/gating logic above it intact.

import {
  sessionFromReq, getUser, incrementUserNickie, userLimit,
  unsign, sign, buildCookie, NICKIE_COOKIE, LIMITS,
} from '../../lib/auth'

const TIPS = [
  'Remember: only unique approved words score. If two players write the same word, it cancels out — so think about what everyone else will obviously pick, and avoid it.',
  'Stuck for words on a tough letter? Describe how The Subject makes you feel, not just what they are. Emotions unlock adjectives.',
  'Playing with a big group? Try Challenge Mode — drop the timer to 30 seconds and watch the chaos.',
  'A word only needs to be real and truly describe The Subject. Minor misspellings still count — it is a party game, not a spelling bee.',
  'For a birthday, run Birthday Bash Mode: make The Subject the guest of honor for a set number of rounds.',
  'Savage Mode is a crowd favorite — award bonus points for the most brutally accurate word of the round.',
]

function nickieAnswer(question) {
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)]
  return `Great question! (Nickie's full AI brain is still warming up — here's a game-master tip in the meantime.) ${tip}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const question = String(req.body?.question || '').trim()
  if (!question) return res.status(400).json({ error: 'Ask Nickie a question first.' })
  if (question.length > 500) return res.status(400).json({ error: 'That question is a bit long — keep it under 500 characters.' })

  const session = sessionFromReq(req)

  // ── Registered user path ──
  if (session) {
    let user
    try {
      user = await getUser(session.email)
    } catch (error) {
      console.error('[nickie] user load error:', JSON.stringify(error))
      return res.status(500).json({ error: 'Could not reach your account. Try again.' })
    }
    const limit = userLimit(user)
    if ((user?.nickieUsed || 0) >= limit) {
      return res.status(200).json({
        gated: true,
        reason: 'limit',
        message: `You've used all ${limit} of your Nickie questions on the free plan. Paid plans are coming soon.`,
      })
    }
    try {
      user = await incrementUserNickie(session.email)
    } catch (error) {
      console.error('[nickie] increment error:', JSON.stringify(error))
      return res.status(500).json({ error: 'Something went wrong. Try again.' })
    }
    return res.status(200).json({
      answer: nickieAnswer(question),
      usage: { used: user.nickieUsed, limit, remaining: Math.max(0, limit - user.nickieUsed) },
      authed: true,
    })
  }

  // ── Anonymous path (signed cookie counter) ──
  const prior = unsign(req.cookies?.[NICKIE_COOKIE])
  const used = prior && Number.isInteger(prior.n) ? prior.n : 0

  if (used >= LIMITS.anon) {
    return res.status(200).json({
      gated: true,
      reason: 'register',
      message: `You've used your ${LIMITS.anon} free questions. Register (free) to keep playing with Nickie.`,
    })
  }

  const nextCount = used + 1
  res.setHeader('Set-Cookie', buildCookie(NICKIE_COOKIE, sign({ n: nextCount }), { maxAge: 60 * 60 * 24 * 365 }))

  return res.status(200).json({
    answer: nickieAnswer(question),
    usage: { used: nextCount, limit: LIMITS.anon, remaining: Math.max(0, LIMITS.anon - nextCount) },
    authed: false,
  })
}
