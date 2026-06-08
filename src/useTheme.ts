import { useEffect, useState } from 'react'

export type Mode = 'light' | 'dark'

export const PRIMARY_COLORS = [
  { name: 'Indigo', value: '#646cff' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Violet', value: '#8b5cf6' },
] as const

const MODE_KEY = 'theme-mode'
const PRIMARY_KEY = 'theme-primary'

function getInitialMode(): Mode {
  const stored = localStorage.getItem(MODE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialPrimary(): string {
  return localStorage.getItem(PRIMARY_KEY) ?? PRIMARY_COLORS[0].value
}

export function useTheme() {
  const [mode, setMode] = useState<Mode>(getInitialMode)
  const [primary, setPrimary] = useState<string>(getInitialPrimary)

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    localStorage.setItem(MODE_KEY, mode)
  }, [mode])

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', primary)
    localStorage.setItem(PRIMARY_KEY, primary)
  }, [primary])

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'))

  return { mode, toggleMode, primary, setPrimary }
}
