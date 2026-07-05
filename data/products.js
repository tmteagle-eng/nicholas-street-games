// Product catalog — single source of truth for the /shop store.
//
// Prices are in whole US cents and are PLACEHOLDERS pending confirmation.
// `stripePriceId` is left null; wire it when the payment integration lands.
// Product art is rendered as branded color tiles until real photography exists.

import { colors } from '../styles/tokens'

export const products = [
  {
    id: 'lmt-game',
    slug: 'letter-me-this',
    name: 'Letter Me This!',
    tagline: 'The party game where your friends define you.',
    type: 'game',
    price: 2999, // $29.99 — PLACEHOLDER
    color: colors.teal,
    emoji: '🎲',
    badge: 'Flagship',
    inStock: true,
    stripePriceId: null,
    description:
      'The complete boxed game: 20-sided alphabet die, 6-sided number die, dice canister, 25-sheet writing pad, 6 pencils, sharpener, and instructions. 3–8 players, ages 14+.',
  },
  {
    id: 'lmt-tee',
    slug: 'letter-me-this-tee',
    name: 'Letter Me This! Tee',
    tagline: 'Roll. Write. Reveal. Laugh. — now on a shirt.',
    type: 'merch',
    price: 2400, // $24.00 — PLACEHOLDER
    color: colors.coral,
    emoji: '👕',
    badge: null,
    inStock: true,
    stripePriceId: null,
    description: 'Soft cotton tee with the four-color slogan. Unisex fit.',
  },
  {
    id: 'nsg-cap',
    slug: 'nsg-cap',
    name: 'Nicholas St. Cap',
    tagline: 'Wear the cul-de-sac.',
    type: 'merch',
    price: 2200, // $22.00 — PLACEHOLDER
    color: colors.green,
    emoji: '🧢',
    badge: null,
    inStock: true,
    stripePriceId: null,
    description: 'Embroidered street-sign logo on a classic dad cap.',
  },
  {
    id: 'lmt-stickers',
    slug: 'sticker-pack',
    name: 'Sticker Pack',
    tagline: 'Six colorful die-cut stickers.',
    type: 'merch',
    price: 600, // $6.00 — PLACEHOLDER
    color: colors.yellow,
    emoji: '✨',
    badge: null,
    inStock: true,
    stripePriceId: null,
    description: 'A pack of six vinyl stickers featuring the logo, dice, and slogan.',
  },
  {
    id: 'lmt-refill',
    slug: 'writing-pad-refill',
    name: 'Writing Pad Refill',
    tagline: 'Never run out mid-game.',
    type: 'accessory',
    price: 800, // $8.00 — PLACEHOLDER
    color: colors.blue,
    emoji: '📝',
    badge: null,
    inStock: true,
    stripePriceId: null,
    description: 'Two replacement 25-sheet writing pads for Letter Me This!',
  },
]

export const productById = (id) => products.find((p) => p.id === id) || null

export const formatPrice = (cents) =>
  `$${(cents / 100).toFixed(2).replace(/\.00$/, '')}`
