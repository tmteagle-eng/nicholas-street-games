import { Redis } from '@upstash/redis'

// Admin: fetch the Nickie question log (newest first). Auth via ADMIN_PASSWORD,
// same as /api/releases and /api/rsvps.
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
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })

    // lpush prepends, so lrange 0..-1 is already newest → oldest.
    const raw = await redis.lrange('nickie_questions', 0, -1)
    const questions = raw
      .map((item) => {
        try { return typeof item === 'string' ? JSON.parse(item) : item }
        catch { return null }
      })
      .filter((item) => item && item.question)

    return res.status(200).json({ questions })
  } catch (error) {
    console.error('Fetch nickie log error:', JSON.stringify(error))
    return res.status(500).json({ error: 'Failed to fetch Nickie log' })
  }
}
