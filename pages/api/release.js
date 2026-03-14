import { Resend } from 'resend'
import { Redis } from '@upstash/redis'

export const config = {
  api: { bodyParser: { sizeLimit: '4mb' } },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { names, email, agreed, signatureImage, timestamp } = req.body

  if (!names || !names.length || !names.some(n => n.trim()) || !agreed || !signatureImage) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const release = {
    names: names.filter(n => n.trim()),
    email: email || '',
    agreed,
    signatureImage,
    submittedAt: timestamp || new Date().toISOString(),
  }

  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    await redis.lpush('releases', JSON.stringify(release))
  } catch (error) {
    console.error('Redis error:', JSON.stringify(error))
    return res.status(500).json({ error: 'Failed to save release' })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const nameList = release.names.map((n, i) => `${i + 1}. ${n}`).join('<br/>')
    await resend.emails.send({
      from: 'Letter Me This! Release <rsvp@nicholasstreetgames.com>',
      to: 'tim@nicholasstreetgames.com',
      subject: `Release Signed: ${release.names.join(', ')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1a1a1a; border-bottom: 3px solid #20B2AA; padding-bottom: 12px;">
            Photo/Video Release Signed
          </h2>
          <p style="color: #888; margin-bottom: 16px;">The following people signed the release:</p>
          <div style="padding: 16px; background: #f5f5f5; border-radius: 6px; margin-bottom: 16px;">
            <strong>${nameList}</strong>
          </div>
          ${email ? `<p style="color: #888;">Email: <a href="mailto:${email}">${email}</a></p>` : ''}
          <p style="color: #888; font-size: 12px;">Signed at ${release.submittedAt}</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Email error:', JSON.stringify(error))
  }

  return res.status(200).json({ success: true })
}
