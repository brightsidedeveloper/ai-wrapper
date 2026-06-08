import { useState } from 'react'
import Page from '../components/Page'
import { streamChat, type ChatMessage } from '../lib/claude'

const SYSTEM_PROMPT =
  'You are an expert summarizer. Condense the text the user provides into a ' +
  'clear, faithful summary. Lead with a one-sentence overview, then 3–5 bullet ' +
  'points covering the key takeaways. Be concise and never invent details.'

export default function Summarizer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function summarize() {
    const text = input.trim()
    if (!text || loading) return
    setOutput('')
    setError('')
    setLoading(true)

    const messages: ChatMessage[] = [
      { role: 'user', content: `Summarize the following text:\n\n${text}` },
    ]

    try {
      await streamChat(
        messages,
        (delta) => setOutput((prev) => prev + delta),
        undefined,
        SYSTEM_PROMPT,
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page title="Summarizer" subtitle="Turn long text into a tight summary.">
      <div className="tool-form">
        <textarea
          className="tool-input"
          value={input}
          placeholder="Paste an article, transcript, or any long text…"
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
        />
        <button
          className="btn"
          onClick={summarize}
          disabled={loading || !input.trim()}
        >
          {loading ? 'Summarizing…' : 'Summarize'}
        </button>
        {output && <pre className="tool-output">{output}</pre>}
      </div>
      {error && <p className="hint">⚠️ {error}</p>}
    </Page>
  )
}
