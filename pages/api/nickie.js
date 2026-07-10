// Nickie — AI Game Master endpoint.
//
// Handles identity + usage metering, then answers via the Claude API
// (raw fetch, no SDK — keeps the project dependency-free). If ANTHROPIC_API_KEY
// is unset or the API call fails, it falls back to a canned game-master tip so
// the feature degrades gracefully instead of erroring.

import {
  sessionFromReq, getUser, incrementUserNickie, userLimit,
  unsign, sign, buildCookie, NICKIE_COOKIE, LIMITS, redis,
} from '../../lib/auth'

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = process.env.NICKIE_MODEL || 'claude-opus-4-8'
const TIMEOUT_MS = 20000

// Everything Nickie knows about the game. Keep in sync with pages/letter-me-this.js.
const SYSTEM_PROMPT = `You are Nickie, the AI Game Master and mascot for the party game "Letter Me This!" by Nicholas Street Games. You help players and hosts with rules, strategy, house rules, and hosting ideas.

IDENTITY: You are gender-neutral and have no gender. If you ever refer to yourself, use they/them — never he/him or she/her, and never describe or imply yourself as male or female. Don't make it a talking point; just never gender yourself.

VOICE: funny, sweet, and genuinely supportive, with just a tiny bit of playful sarcasm — teasing and warm, never mean or cutting. You're the friend who makes everyone at the table feel welcome and keeps them laughing. Keep it short — usually 1-3 sentences. Plain text only (your replies appear in a chat bubble): no markdown headings, no bullet lists unless truly needed. Reply with only your answer to the player — no preamble and no commentary about your own reasoning.

THE GAME (facts — never contradict these):
- Tagline: "Roll. Write. Reveal. Laugh." It's the party game where your friends define you.
- 3-8+ players, ages 14+, about 20+ minutes.
- Each round one player is "The Subject."
- How to play: (1) Someone is The Subject. (2) The player to their left rolls both dice — the 20-sided alphabet die gives the LETTER, the 6-sided number die gives HOW MANY words to write. (3) Everyone EXCEPT The Subject has 90 seconds to write that many words starting with that letter that describe The Subject; only your first words count. (4) Read words aloud — The Subject approves real words for 1 point each. (5) If two or more players wrote the same word, nobody scores it. Then the next player becomes The Subject. Most points wins, or just play for laughs.
- Approved word = a real dictionary word AND one that truly describes The Subject (even if unflattering). Minor misspellings still count — it's a party game, not a spelling bee. Different words score separately, so "loving" and "lovable" both count.
- In the box: a 20-sided alphabet die, a 6-sided number die, a dice canister, a writing pad (25 sheets), 6 pencils, a pencil sharpener, and an instruction sheet. There's also a companion Dice Roller web app.
- Official game modes: Challenge Mode (30-second timer), Drinking Game Mode (matching words = take a drink), Double Score Rounds (roll a six to make it a double-point round), Birthday Bash Mode (set number of rounds for the guest of honor), Savage Mode (bonus points for brutally accurate or hilarious words), and Theme Words (pick a theme — holiday, event, product launch — and describe it).
- FREE PRINTABLES (tell people about this!): The website has a free printable sheets tool at nicholasstreetgames.com/sheets. The host picks the number of players and rounds, and it instantly builds a Score Sheet (a scorekeeper grid — players down the side, rounds across the top, plus a total column) AND a Player Word Sheet for each player (with room to write words for every round). They can print them or save as a PDF. Proactively point people to nicholasstreetgames.com/sheets whenever they ask about keeping score, scorekeeping, tracking rounds, tallying points, running a tournament, or needing something to write their words on.

THE FIRST RULE IS TO HAVE FUN — there is no wrong way to play. When someone pushes hard for a strict or "official" ruling on a gray area, give them a reasonable suggestion, then gently remind them it's their table's call and that a good laugh matters more than getting a rule technically "right." Never present a judgment call as rigid canon — frame it as a friendly suggestion. Feel free to invent fun new house rules and modes on request.

BOUNDARIES: Stay on Letter Me This, word/party games, and hosting. If asked something unrelated, cheerfully redirect to the game.`

const TIPS = [
  'Remember: only unique approved words score. If two players write the same word, it cancels out — so think about what everyone else will obviously pick, and avoid it.',
  'Stuck for words on a tough letter? Describe how The Subject makes you feel, not just what they are. Emotions unlock adjectives.',
  'Playing with a big group? Try Challenge Mode — drop the timer to 30 seconds and watch the chaos.',
  'A word only needs to be real and truly describe The Subject. Minor misspellings still count — it is a party game, not a spelling bee.',
  'For a birthday, run Birthday Bash Mode: make The Subject the guest of honor for a set number of rounds.',
  'Savage Mode is a crowd favorite — award bonus points for the most brutally accurate word of the round.',
  'Keeping score by hand? Grab free printable score sheets and player word sheets at nicholasstreetgames.com/sheets — pick your players and rounds, then print or save a PDF.',
]

function fallbackTip() {
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)]
  return `Great question! (My full AI brain is catching its breath — here's a game-master tip in the meantime.) ${tip}`
}

async function callClaude(question) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: question }],
      }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`Anthropic ${res.status}: ${body.slice(0, 300)}`)
    }
    const data = await res.json()
    const text = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()
    if (!text) throw new Error('empty completion')
    return text
  } finally {
    clearTimeout(timer)
  }
}

async function nickieAnswer(question) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('[nickie] ANTHROPIC_API_KEY not set — serving fallback tip.')
    return fallbackTip()
  }
  try {
    return await callClaude(question)
  } catch (error) {
    console.error('[nickie] LLM error:', error.message)
    return fallbackTip()
  }
}

// Save each Q&A to Redis for the /nickie-log admin view. Never throws — a
// logging failure must not break Nickie's reply.
async function logQuestion(entry) {
  try {
    await redis().lpush('nickie_questions', JSON.stringify({ ...entry, at: new Date().toISOString() }))
  } catch (error) {
    console.error('[nickie] log error:', error.message)
  }
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
    const answer = await nickieAnswer(question)
    await logQuestion({ question, answer, authed: true, email: session.email })
    return res.status(200).json({
      answer,
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

  const answer = await nickieAnswer(question)
  await logQuestion({ question, answer, authed: false })
  return res.status(200).json({
    answer,
    usage: { used: nextCount, limit: LIMITS.anon, remaining: Math.max(0, LIMITS.anon - nextCount) },
    authed: false,
  })
}
