import { Resend } from 'resend'
import { Redis } from '@upstash/redis'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, attending, guests, dietary } = req.body

  if (!name || !email || !phone || !attending) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const rsvp = {
    name,
    email,
    phone,
    attending,
    guests: attending === 'yes' ? (guests || '1') : '0',
    dietary: dietary || '',
    submittedAt: new Date().toISOString(),
  }

  const attendingText = attending === 'yes' ? 'Yes, I\'ll be there!' : 'Sorry, I can\'t make it'

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #1a1a1a; border-bottom: 3px solid #E85D3D; padding-bottom: 12px;">
        New RSVP Received
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888; width: 120px;">Name</td>
          <td style="padding: 10px 0; font-weight: bold;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888;">Email</td>
          <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888;">Phone</td>
          <td style="padding: 10px 0;"><a href="tel:${phone}">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888;">Attending</td>
          <td style="padding: 10px 0; font-weight: bold; color: ${attending === 'yes' ? '#3a7d44' : '#E85D3D'};">
            ${attendingText}
          </td>
        </tr>
        ${attending === 'yes' ? `
        <tr>
          <td style="padding: 10px 0; color: #888;">Guests</td>
          <td style="padding: 10px 0;">${guests || '1'}</td>
        </tr>
        ` : ''}
        ${dietary ? `
        <tr>
          <td style="padding: 10px 0; color: #888;">Dietary Needs</td>
          <td style="padding: 10px 0;">${dietary}</td>
        </tr>
        ` : ''}
      </table>
    </div>
  `

  // Store in Redis
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    await redis.lpush('rsvps', JSON.stringify(rsvp))
  } catch (error) {
    console.error('Redis error:', JSON.stringify(error))
    return res.status(500).json({ error: 'Failed to save RSVP' })
  }

  // Send email notification (don't fail the request if email fails)
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const emailResult = await resend.emails.send({
      from: 'Letter Me This! RSVP <rsvp@nicholasstreetgames.com>',
      to: 'tim@nicholasstreetgames.com',
      replyTo: email,
      subject: `RSVP: ${name} — ${attendingText}`,
      html: htmlBody,
    })
    console.log('Email result:', JSON.stringify(emailResult))
  } catch (error) {
    console.error('Email error:', JSON.stringify(error))
  }

  return res.status(200).json({ success: true })
}
