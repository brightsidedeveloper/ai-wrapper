import { Link } from 'react-router-dom'
import { routes } from '../routes'
import Page from '../components/Page'

export default function Home() {
  const tools = routes.filter((r) => !['/', '/history', '/settings'].includes(r.path))
  return (
    <Page title="AI Toolkit" subtitle="One workspace, many AI tools. Pick one to get started.">
      <div className="card-grid">
        {tools.map((t) => (
          <Link key={t.path} to={t.path} className="tool-card">
            <span className="tool-icon">{t.icon}</span>
            <span className="tool-name">{t.label}</span>
          </Link>
        ))}
      </div>
    </Page>
  )
}
