import { Resend } from 'resend'
import { Redis } from '@upstash/redis'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, guestCount, reason, timestamp } = req.body

  if (!name || !email || !guestCount) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const cancellation = {
    name,
    email,
    guestCount: guestCount || '1',
    reason: reason || '',
    submittedAt: timestamp || new Date().toISOString(),
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #1a1a1a; border-bottom: 3px solid #E85D3D; padding-bottom: 12px;">
        RSVP Cancellation
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888; width: 140px;">Name</td>
          <td style="padding: 10px 0; font-weight: bold;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888;">Email</td>
          <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888;"># Cancelling</td>
          <td style="padding: 10px 0; font-weight: bold; color: #E85D3D;">${guestCount}</td>
        </tr>
        ${reason ? `
        <tr>
          <td style="padding: 10px 0; color: #888;">Reason</td>
          <td style="padding: 10px 0;">${reason}</td>
        </tr>
        ` : ''}
      </table>
    </div>
  `

  // Store in Redis
  try {
    const redis = new Redis({
      url: (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL),
      token: (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN),
    })
    await redis.lpush('cancellations', JSON.stringify(cancellation))
  } catch (error) {
    console.error('Redis error:', JSON.stringify(error))
    return res.status(500).json({ error: 'Failed to save cancellation' })
  }

  // Send email notification (don't fail the request if email fails)
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const emailResult = await resend.emails.send({
      from: 'Letter Me This! RSVP <rsvp@nicholasstreetgames.com>',
      to: 'tim@nicholasstreetgames.com',
      replyTo: email,
      subject: `Cancellation: ${name} — ${guestCount} guest${parseInt(guestCount) !== 1 ? 's' : ''}`,
      html: htmlBody,
    })
    console.log('Email result:', JSON.stringify(emailResult))
  } catch (error) {
    console.error('Email error:', JSON.stringify(error))
  }

  return res.status(200).json({ success: true })
}
