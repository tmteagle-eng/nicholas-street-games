// Stripe webhook — records completed orders, mirrors them into Shippo,
// and emails a notification.
//
// Stripe POSTs signed events here; we verify the signature with
// STRIPE_WEBHOOK_SECRET (from the webhook endpoint config in the Stripe
// dashboard) and act on checkout.session.completed: save the order to the
// `orders` Redis list (source of truth), create a matching Shippo order so
// fulfillment happens from the Shippo dashboard, and email orders@. Shippo
// and email are both best-effort — only a Redis failure makes Stripe retry.
// The customer's receipt comes from Stripe directly.

import Stripe from 'stripe'
import { Resend } from 'resend'
import { Redis } from '@upstash/redis'

// Signature verification needs the raw request body, not Next's parsed JSON.
export const config = { api: { bodyParser: false } }

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

// Mirror the order into Shippo so it appears in the fulfillment queue with
// the address pre-filled. A test token creates test orders; live token, live
// orders. Failures are logged and swallowed — the Redis record is the truth.
async function createShippoOrder(order) {
  if (!process.env.SHIPPO_API_TOKEN || !order.shippingAddress) return
  const addr = order.shippingAddress
  const dollars = (cents) => ((cents || 0) / 100).toFixed(2)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10000)
  try {
    const res = await fetch('https://api.goshippo.com/orders/', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        authorization: `ShippoToken ${process.env.SHIPPO_API_TOKEN}`,
      },
      body: JSON.stringify({
        order_number: `NSG-${order.stripeSessionId.slice(-8).toUpperCase()}`,
        order_status: 'PAID',
        placed_at: order.createdAt,
        to_address: {
          name: order.shippingName || order.name,
          street1: addr.line1,
          street2: addr.line2 || '',
          city: addr.city,
          state: addr.state,
          zip: addr.postal_code,
          country: addr.country || 'US',
          email: order.email || undefined,
        },
        line_items: order.items.map((i) => ({
          title: i.description,
          quantity: i.quantity,
          total_price: dollars(i.amountTotal),
          currency: 'USD',
        })),
        subtotal_price: dollars(order.amountSubtotal),
        total_price: dollars(order.amountTotal),
        currency: 'USD',
        // Shippo requires an order weight. Estimate from quantity; the real
        // parcel weight comes from the saved preset at label time.
        weight: Math.max(
          0.5,
          order.items.reduce((n, i) => n + (i.quantity || 1), 0) *
            parseFloat(process.env.SHIPPO_ITEM_WEIGHT_LB || '1.5')
        ),
        weight_unit: 'lb',
      }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`Shippo ${res.status}: ${body.slice(0, 300)}`)
    }
  } finally {
    clearTimeout(timer)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(501).json({ error: 'Webhook not configured' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let event
  try {
    const rawBody = await readRawBody(req)
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: 'Invalid signature' })
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true })
  }

  const session = event.data.object

  // Pull line items so the order record and email show what was bought.
  let itemsSummary = []
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })
    itemsSummary = lineItems.data.map((li) => ({
      description: li.description,
      quantity: li.quantity,
      amountTotal: li.amount_total,
    }))
  } catch (err) {
    console.error('Could not fetch line items:', err.message)
  }

  const ship = session.collected_information?.shipping_details || session.shipping_details
  const order = {
    stripeSessionId: session.id,
    paymentIntent: session.payment_intent,
    livemode: session.livemode,
    email: session.customer_details?.email || '',
    name: session.customer_details?.name || '',
    shippingAddress: ship?.address || null,
    shippingName: ship?.name || '',
    items: itemsSummary,
    amountSubtotal: session.amount_subtotal,
    amountTotal: session.amount_total,
    currency: session.currency,
    createdAt: new Date().toISOString(),
    status: 'paid',
  }

  // Record first, notify second — a mail failure must not lose the order.
  try {
    const redis = new Redis({
      url: (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL),
      token: (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN),
    })
    await redis.lpush('orders', JSON.stringify(order))
  } catch (err) {
    console.error('Failed to save order to Redis:', err)
    // 500 so Stripe retries the event and the order isn't lost.
    return res.status(500).json({ error: 'Failed to record order' })
  }

  try {
    await createShippoOrder(order)
  } catch (err) {
    // Order is safely in Redis; Rochelle/Tim can add it to Shippo by hand.
    console.error('Shippo order creation failed:', err.message)
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const money = (cents) => `$${((cents || 0) / 100).toFixed(2)}`
    const rows = itemsSummary
      .map(
        (i) =>
          `<tr><td style="padding:8px 0;">${i.quantity}× ${i.description}</td>` +
          `<td style="padding:8px 0; text-align:right;">${money(i.amountTotal)}</td></tr>`
      )
      .join('')
    const addr = order.shippingAddress
    const addrHtml = addr
      ? `${order.shippingName || order.name}<br>${addr.line1}${addr.line2 ? '<br>' + addr.line2 : ''}<br>${addr.city}, ${addr.state} ${addr.postal_code}`
      : '—'

    await resend.emails.send({
      from: 'Letter Me This! Shop <rsvp@nicholasstreetgames.com>',
      to: 'orders@nicholasstreetgames.com',
      replyTo: order.email || undefined,
      subject: `${order.livemode ? '' : '[TEST] '}New order — ${money(order.amountTotal)} from ${order.name || order.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1a1a1a; border-bottom: 3px solid #20B2AA; padding-bottom: 12px;">
            New Order${order.livemode ? '' : ' (TEST MODE)'}
          </h2>
          <table style="width: 100%; border-collapse: collapse;">${rows}</table>
          <p style="border-top: 1px solid #ddd; padding-top: 12px; font-weight: bold;">
            Total: ${money(order.amountTotal)}
          </p>
          <p style="color: #888; margin-bottom: 4px;">Ship to</p>
          <p style="margin-top: 0;">${addrHtml}</p>
          <p style="color: #888; margin-bottom: 4px;">Buyer</p>
          <p style="margin-top: 0;">${order.name} &lt;${order.email}&gt;</p>
          <p style="color: #aaa; font-size: 12px;">Stripe session: ${order.stripeSessionId}</p>
        </div>`,
    })
  } catch (err) {
    // Order is safely in Redis; log and move on.
    console.error('Order notification email failed:', err)
  }

  return res.status(200).json({ received: true })
}
