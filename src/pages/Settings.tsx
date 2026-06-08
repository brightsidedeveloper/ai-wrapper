import { useState } from 'react'
import Page from '../components/Page'
import { getApiKey, getModel, saveSettings } from '../lib/settings'

export default function Settings() {
  const [apiKey, setApiKey] = useState(getApiKey)
  const [model, setModel] = useState(getModel)
  const [saved, setSaved] = useState(false)

  function save() {
    saveSettings(apiKey.trim(), model)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Page title="Settings" subtitle="Configure your model and API access.">
      <div className="tool-form">
        <label className="field">
          <span>API Key</span>
          <input
            className="text-input"
            type="password"
            placeholder="sk-ant-…"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value)
              setSaved(false)
            }}
          />
        </label>
        <label className="field">
          <span>Model</span>
          <select
            className="select"
            value={model}
            onChange={(e) => {
              setModel(e.target.value)
              setSaved(false)
            }}
          >
            <option value="claude-opus-4-8">Claude Opus 4.8</option>
            <option value="claude-sonnet-4-6">Claude Sonnet 4.6</option>
            <option value="claude-haiku-4-5-20251001">Claude Haiku 4.5</option>
          </select>
        </label>
        <button className="btn" onClick={save}>
          Save
        </button>
        {saved && <p className="hint">Settings saved.</p>}
        <p className="hint">
          Your key is stored only in this browser and sent directly to Anthropic.
        </p>
      </div>
    </Page>
  )
}
