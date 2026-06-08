import { useState } from 'react'
import './App.css'
import { PRIMARY_COLORS, useTheme } from './useTheme'

function App() {
  const [count, setCount] = useState(0)
  const { mode, toggleMode, primary, setPrimary } = useTheme()

  return (
    <main className="app">
      <h1>AI Wrapper</h1>
      <p>A basic React + TypeScript app scaffolded with Vite.</p>

      <div className="toolbar">
        <div className="toolbar-group">
          <span className="toolbar-label">Theme</span>
          <button
            className="mode-toggle"
            onClick={toggleMode}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <div className="toolbar-group">
          <span className="toolbar-label">Primary</span>
          <div className="swatches">
            {PRIMARY_COLORS.map((color) => (
              <button
                key={color.value}
                className="swatch"
                style={{ backgroundColor: color.value }}
                aria-label={color.name}
                aria-pressed={primary === color.value}
                onClick={() => setPrimary(color.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
      <p className="hint">
        Edit <code>src/App.tsx</code> and save to test HMR.
      </p>
    </main>
  )
}

export default App
