import { useState } from 'react'
import Page from '../components/Page'

const LANGS = ['Spanish', 'French', 'German', 'Japanese', 'Mandarin', 'Arabic']

export default function Translate() {
  const [input, setInput] = useState('')
  const [lang, setLang] = useState(LANGS[0])
  const [output, setOutput] = useState('')

  function run() {
    if (!input.trim()) return
    // Placeholder for a real translation call.
    setOutput(`[${lang} translation of ${input.trim().length} chars goes here once the API is wired up.]`)
  }

  return (
    <Page title="Translate" subtitle="Translate text into another language.">
      <div className="tool-form">
        <textarea
          className="tool-input"
          rows={6}
          placeholder="Enter text to translate…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="row">
          <select className="select" value={lang} onChange={(e) => setLang(e.target.value)}>
            {LANGS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <button className="btn" onClick={run} disabled={!input.trim()}>
            Translate
          </button>
        </div>
        {output && <pre className="tool-output">{output}</pre>}
      </div>
    </Page>
  )
}
