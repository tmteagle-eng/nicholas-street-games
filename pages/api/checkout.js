// Checkout endpoint — STUB.
//
// Payment integration is intentionally deferred. This route validates the
// incoming cart and returns 501 so the UI shows its "coming soon" fallback.
//
// To go live with Stripe, install `stripe`, set STRIPE_SECRET_KEY, give each
// product a real `stripePriceId` in data/products.js, and replace the body of
// the TODO block below with a Stripe Checkout Session (see notes at bottom).

import { products } from '../../data/products'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { items } = req.body || {}
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' })
  }

  // Validate every line against the server-side catalog (never trust client prices).
  const lineItems = []
  for (const item of items) {
    const product = products.find((p) => p.id === item?.id)
    const qty = Number(item?.qty)
    if (!product || !Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({ error: `Invalid item: ${item?.id}` })
    }
    lineItems.push({ product, qty })
  }

  // TODO(payments): create and return a real checkout session.
  //
  //   import Stripe from 'stripe'
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  //   const session = await stripe.checkout.sessions.create({
  //     mode: 'payment',
  //     line_items: lineItems.map(({ product, qty }) => ({
  //       price: product.stripePriceId, quantity: qty,
  //     })),
  //     shipping_address_collection: { allowed_countries: ['US'] },
  //     automatic_tax: { enabled: true },
  //     success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `${origin}/cart`,
  //   })
  //   return res.status(200).json({ url: session.url })

  return res.status(501).json({
    error: 'not_implemented',
    message: 'Online checkout is not live yet.',
  })
}
