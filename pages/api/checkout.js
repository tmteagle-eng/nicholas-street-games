// Checkout endpoint — creates a Stripe Checkout Session from the cart.
//
// Prices come from data/products.js (inline price_data), so the catalog in
// this repo stays the single source of truth — no product sync with the
// Stripe dashboard. Requires STRIPE_SECRET_KEY; while it's unset this route
// returns 501 and the cart UI shows its "coming soon" fallback.

import Stripe from 'stripe'
import { products } from '../../data/products'

const SHIPPING_FLAT_CENTS = 500 // flat US shipping & handling
const FREE_SHIPPING_MIN_QTY = 2 // free shipping when ordering 2+ items

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
    if (!product || !product.inStock || !Number.isInteger(qty) || qty < 1 || qty > 50) {
      return res.status(400).json({ error: `Invalid item: ${item?.id}` })
    }
    lineItems.push({ product, qty })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(501).json({
      error: 'not_implemented',
      message: 'Online checkout is not live yet.',
    })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const origin = `${proto}://${host}`

  const totalQty = lineItems.reduce((sum, { qty }) => sum + qty, 0)
  const shippingCents = totalQty >= FREE_SHIPPING_MIN_QTY ? 0 : SHIPPING_FLAT_CENTS

  const params = {
    mode: 'payment',
    line_items: lineItems.map(({ product, qty }) => ({
      quantity: qty,
      price_data: {
        currency: 'usd',
        unit_amount: product.price,
        tax_behavior: 'exclusive',
        product_data: {
          name: product.name,
          description: product.tagline,
          metadata: { productId: product.id },
        },
      },
    })),
    shipping_address_collection: { allowed_countries: ['US'] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          display_name: shippingCents === 0 ? 'Free shipping' : 'Standard shipping',
          fixed_amount: { amount: shippingCents, currency: 'usd' },
          tax_behavior: 'exclusive',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ],
    automatic_tax: { enabled: true },
    success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  }

  try {
    let session
    try {
      session = await stripe.checkout.sessions.create(params)
    } catch (err) {
      // Stripe Tax not activated yet → retry without automatic tax rather than
      // blocking checkout. Activate Stripe Tax in the dashboard to remove this.
      if (err?.message?.toLowerCase().includes('tax')) {
        console.warn('Stripe Tax unavailable, creating session without it:', err.message)
        session = await stripe.checkout.sessions.create({
          ...params,
          automatic_tax: { enabled: false },
        })
      } else {
        throw err
      }
    }
    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Checkout session failed:', err)
    return res.status(500).json({ error: 'Could not start checkout. Please try again.' })
  }
}
