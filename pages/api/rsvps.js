import { Redis } from '@upstash/redis'

export default async function handler(req, res) {
  const auth = req.headers.authorization
  if (!auth || auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  // GET — fetch all RSVPs and releases
  if (req.method === 'GET') {
    try {
      const [rawRsvps, rawReleases, rawCancellations] = await Promise.all([
        redis.lrange('rsvps', 0, -1),
        redis.lrange('releases', 0, -1),
        redis.lrange('cancellations', 0, -1),
      ])

      const rsvps = rawRsvps
        .map((item) => {
          try { return typeof item === 'string' ? JSON.parse(item) : item }
          catch { return null }
        })
        .filter((item) => item && item.name)

      const releases = rawReleases
        .map((item) => {
          try {
            const parsed = typeof item === 'string' ? JSON.parse(item) : item
            if (parsed) { delete parsed.signatureImage }
            return parsed
          } catch { return null }
        })
        .filter((item) => item && item.names)

      const cancellations = rawCancellations
        .map((item) => {
          try { return typeof item === 'string' ? JSON.parse(item) : item }
          catch { return null }
        })
        .filter((item) => item && item.name)

      return res.status(200).json({ rsvps, releases, cancellations })
    } catch (error) {
      console.error('Fetch data error:', JSON.stringify(error))
      return res.status(500).json({ error: 'Failed to fetch data' })
    }
  }

  // PUT — update an RSVP (change attending status, guest count, etc.)
  if (req.method === 'PUT') {
    try {
      const { submittedAt, updates } = req.body
      if (!submittedAt || !updates) {
        return res.status(400).json({ error: 'Missing submittedAt or updates' })
      }

      const rawRsvps = await redis.lrange('rsvps', 0, -1)
      const rsvps = rawRsvps.map((item) => {
        try { return typeof item === 'string' ? JSON.parse(item) : item }
        catch { return null }
      })

      const index = rsvps.findIndex((r) => r && r.submittedAt === submittedAt)
      if (index === -1) {
        return res.status(404).json({ error: 'RSVP not found' })
      }

      const updated = { ...rsvps[index], ...updates }

      // Redis LSET to update in place
      await redis.lset('rsvps', index, JSON.stringify(updated))

      return res.status(200).json({ success: true, rsvp: updated })
    } catch (error) {
      console.error('Update RSVP error:', JSON.stringify(error))
      return res.status(500).json({ error: 'Failed to update RSVP' })
    }
  }

  // DELETE — remove an RSVP
  if (req.method === 'DELETE') {
    try {
      const { submittedAt } = req.body
      if (!submittedAt) {
        return res.status(400).json({ error: 'Missing submittedAt' })
      }

      const rawRsvps = await redis.lrange('rsvps', 0, -1)
      const rsvps = rawRsvps.map((item) => {
        try { return typeof item === 'string' ? JSON.parse(item) : item }
        catch { return null }
      })

      const target = rsvps.find((r) => r && r.submittedAt === submittedAt)
      if (!target) {
        return res.status(404).json({ error: 'RSVP not found' })
      }

      // Find the raw string that matches this entry
      const rawTarget = rawRsvps.find((raw) => {
        try {
          const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
          return parsed && parsed.submittedAt === submittedAt
        } catch { return false }
      })

      if (rawTarget) {
        await redis.lrem('rsvps', 1, typeof rawTarget === 'string' ? rawTarget : JSON.stringify(rawTarget))
      }

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Delete RSVP error:', JSON.stringify(error))
      return res.status(500).json({ error: 'Failed to delete RSVP' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
