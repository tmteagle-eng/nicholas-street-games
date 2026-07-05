// Server-side auth + usage helpers (magic-link login, sessions, Nickie metering).
//
// Identity model:
//   • Registered users log in passwordlessly via a one-time email link.
//   • A session is a stateless HMAC-signed cookie (no per-request Redis read).
//   • User records + usage counters live in Upstash Redis.
//   • Anonymous Nickie usage is tracked in a signed cookie until the free
//     allowance runs out, at which point the UI prompts registration.
//
// Required env var: AUTH_SECRET (used to sign cookies + tokens).
// Falls back to an insecure dev key with a warning so previews still work.

import crypto from 'crypto'
import { Redis } from '@upstash/redis'

const SECRET = process.env.AUTH_SECRET || 'dev-insecure-secret-change-me'
if (!process.env.AUTH_SECRET) {
  console.warn('[auth] AUTH_SECRET is not set — using an insecure dev key. Set AUTH_SECRET in production.')
}

// Usage allowances — tune these as token costs dictate.
export const LIMITS = {
  anon: 3,   // free Nickie questions before we ask an anonymous visitor to register
  free: 25,  // Nickie questions for a registered free-tier account
}

export const SESSION_COOKIE = 'nsg_session'
export const NICKIE_COOKIE = 'nsg_nickie'
const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const MAGIC_TTL = 60 * 15 // 15 minutes

export function redis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
}

/* ---------- HMAC-signed tokens (cookies) ---------- */

export function sign(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url')
  return `${data}.${sig}`
}

export function unsign(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null
  const [data, sig] = token.split('.')
  if (!data || !sig) return null
  const expected = crypto.createHmac('sha256', SECRET).update(data).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString())
  } catch {
    return null
  }
}

/* ---------- Cookies ---------- */

export function buildCookie(name, value, { maxAge = SESSION_MAX_AGE } = {}) {
  const parts = [
    `${name}=${value}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ]
  if (process.env.NODE_ENV === 'production') parts.push('Secure')
  return parts.join('; ')
}

export function clearCookie(name) {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}

/* ---------- Email normalization ---------- */

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* ---------- Sessions ---------- */

export function createSessionToken(email) {
  return sign({ email, exp: Date.now() + SESSION_MAX_AGE * 1000 })
}

export function sessionFromReq(req) {
  const token = req.cookies?.[SESSION_COOKIE]
  const data = unsign(token)
  if (!data || !data.email || !data.exp || data.exp < Date.now()) return null
  return { email: data.email }
}

/* ---------- Magic links ---------- */

export async function createMagicToken(email) {
  const token = crypto.randomBytes(32).toString('hex')
  await redis().set(`magiclink:${token}`, email, { ex: MAGIC_TTL })
  return token
}

// Single-use: consumes the token and returns the email (or null).
export async function consumeMagicToken(token) {
  if (!token || typeof token !== 'string') return null
  const email = await redis().getdel(`magiclink:${token}`)
  return email || null
}

/* ---------- Users ---------- */

export async function getUser(email) {
  const raw = await redis().get(`user:${email}`)
  if (!raw) return null
  return typeof raw === 'string' ? JSON.parse(raw) : raw
}

export async function upsertUser(email) {
  const existing = await getUser(email)
  if (existing) return existing
  const user = {
    email,
    plan: 'free',
    nickieUsed: 0,
    createdAt: new Date().toISOString(),
  }
  await redis().set(`user:${email}`, JSON.stringify(user))
  return user
}

export async function incrementUserNickie(email) {
  const user = (await getUser(email)) || (await upsertUser(email))
  user.nickieUsed = (user.nickieUsed || 0) + 1
  await redis().set(`user:${email}`, JSON.stringify(user))
  return user
}

export function userLimit(user) {
  return LIMITS[user?.plan] ?? LIMITS.free
}
