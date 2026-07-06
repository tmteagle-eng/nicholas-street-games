import { Redis } from '@upstash/redis'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const auth = req.headers.authorization
  if (!auth || auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const redis = new Redis({
      url: (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL),
      token: (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN),
    })

    const raw = await redis.lrange('releases', 0, -1)
    const releases = raw
      .map((item) => {
        try { return typeof item === 'string' ? JSON.parse(item) : item }
        catch { return null }
      })
      .filter((item) => item && item.names)

    return res.status(200).json({ releases })
  } catch (error) {
    console.error('Fetch releases error:', JSON.stringify(error))
    return res.status(500).json({ error: 'Failed to fetch releases' })
  }
}
