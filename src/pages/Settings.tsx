import { useState } from 'react'
import Page from '../components/Page'

export default function Settings() {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('claude-opus-4-8')

  return (
    <Page title="Settings" subtitle="Configure your model and API access.">
      <div className="tool-form">
        <label className="field">
          <span>API Key</span>
          <input
            className="text-input"
            type="password"
            placeholder="sk-…"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Model</span>
          <select className="select" value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="claude-opus-4-8">Claude Opus 4.8</option>
            <option value="claude-sonnet-4-6">Claude Sonnet 4.6</option>
            <option value="claude-haiku-4-5-20251001">Claude Haiku 4.5</option>
          </select>
        </label>
        <button className="btn" onClick={() => alert('Settings saved (mock).')}>
          Save
        </button>
      </div>
    </Page>
  )
}
