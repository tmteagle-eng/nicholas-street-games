import { useEffect, useState, useCallback } from 'react'

// Client hook — loads the current user from /api/auth/me.
// Returns { user, limits, loading, refresh, logout }.
export function useUser() {
  const [state, setState] = useState({ user: null, limits: null, loading: true })

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      setState({ user: data.user || null, limits: data.limits || null, loading: false })
    } catch {
      setState({ user: null, limits: null, loading: false })
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    await refresh()
  }, [refresh])

  return { ...state, refresh, logout }
}
