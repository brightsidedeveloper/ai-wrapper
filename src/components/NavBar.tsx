import { NavLink } from 'react-router-dom'
import { routes } from '../routes'
import { PRIMARY_COLORS, useTheme } from '../useTheme'

export default function NavBar() {
  const { mode, toggleMode, primary, setPrimary } = useTheme()

  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="nav-logo">✦</span>
        <span>AI Toolkit</span>
      </div>
      <ul className="nav-links">
        {routes.map((r) => (
          <li key={r.path}>
            <NavLink
              to={r.path}
              end={r.path === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <span className="nav-icon">{r.icon}</span>
              <span className="nav-label">{r.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-theme">
        <button
          className="mode-toggle"
          onClick={toggleMode}
          aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
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
    </nav>
  )
}
