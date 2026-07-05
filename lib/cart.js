// Lightweight client-side cart, persisted to localStorage.
// Stored as { [productId]: quantity }. Emits a window event on change so the
// nav badge and cart page stay in sync. This is intentionally simple — when
// the payment integration lands, the cart contents are POSTed to /api/checkout.

import { useEffect, useState } from 'react'
import { products, productById } from '../data/products'

const KEY = 'nsg_cart'
const EVENT = 'nsg_cart_change'

const isBrowser = () => typeof window !== 'undefined'

export function getCart() {
  if (!isBrowser()) return {}
  try {
    return JSON.parse(window.localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

function save(cart) {
  if (!isBrowser()) return
  window.localStorage.setItem(KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event(EVENT))
}

export function addToCart(id, qty = 1) {
  const cart = getCart()
  cart[id] = (cart[id] || 0) + qty
  if (cart[id] < 1) delete cart[id]
  save(cart)
}

export function setQty(id, qty) {
  const cart = getCart()
  if (qty < 1) delete cart[id]
  else cart[id] = qty
  save(cart)
}

export function removeFromCart(id) {
  const cart = getCart()
  delete cart[id]
  save(cart)
}

export function clearCart() {
  save({})
}

export function cartCount(cart = getCart()) {
  return Object.values(cart).reduce((n, q) => n + q, 0)
}

export function cartLines(cart = getCart()) {
  return Object.entries(cart)
    .map(([id, qty]) => {
      const product = productById(id)
      return product ? { product, qty, lineTotal: product.price * qty } : null
    })
    .filter(Boolean)
}

export function cartSubtotal(cart = getCart()) {
  return cartLines(cart).reduce((sum, line) => sum + line.lineTotal, 0)
}

// React hook — re-renders on any cart change, in this tab or another.
export function useCart() {
  const [cart, setCart] = useState({})

  useEffect(() => {
    const sync = () => setCart(getCart())
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return {
    cart,
    count: cartCount(cart),
    lines: cartLines(cart),
    subtotal: cartSubtotal(cart),
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
  }
}

export { products }
