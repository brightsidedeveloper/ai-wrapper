import { useEffect, useRef, useState } from 'react'
import Page from '../components/Page'
import { streamDocQA, type ChatMessage } from '../lib/claude'

type Msg = { role: 'user' | 'assistant'; text: string }

export default function DocQA() {
  const [doc, setDoc] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const logRef = useRef<HTMLDivElement>(null)

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [messages])

  function loadDoc() {
    if (!doc.trim()) return
    setLoaded(true)
    setError('')
  }

  function reset() {
    setLoaded(false)
    setMessages([])
    setInput('')
    setError('')
  }

  async function ask() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setError('')

    // The API history is the prior turns plus this question; it starts with a
    // user turn, which the API requires. The document rides in the system prompt.
    const userMsg: Msg = { role: 'user', text }
    const history: ChatMessage[] = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.text,
    }))

    // Show the question and an empty answer bubble to stream into.
    setMessages((m) => [...m, { role: 'user', text }, { role: 'assistant', text: '' }])
    setLoading(true)

    try {
      await streamDocQA(doc, history, (delta) => {
        setMessages((m) => {
          const next = [...m]
          next[next.length - 1] = {
            role: 'assistant',
            text: next[next.length - 1].text + delta,
          }
          return next
        })
      })
    } catch (e) {
      // Drop the empty answer placeholder and surface the error.
      setMessages((m) => m.slice(0, -1))
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (!loaded) {
    return (
      <Page title="Doc Q&A" subtitle="Paste a document, then ask questions about it with citations.">
        <div className="tool-form">
          <textarea
            className="tool-input"
            value={doc}
            placeholder="Paste your document text here…"
            onChange={(e) => setDoc(e.target.value)}
            rows={12}
          />
          <button className="btn" onClick={loadDoc} disabled={!doc.trim()}>
            Load document
          </button>
        </div>
      </Page>
    )
  }

  return (
    <Page title="Doc Q&A" subtitle="Ask questions about your document. Answers cite the source.">
      <div className="doc-meta">
        <span className="hint">
          Document loaded — {doc.length.toLocaleString()} characters
        </span>
        <button className="link-btn" onClick={reset}>
          Use a different document
        </button>
      </div>
      <div className="chat">
        <div className="chat-log" ref={logRef}>
          {messages.length === 0 && (
            <div className="bubble assistant">
              Ask a question about the document and I'll answer with citations.
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              {m.text || (loading && i === messages.length - 1 ? '…' : '')}
            </div>
          ))}
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            placeholder="Ask a question about the document…"
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ask()}
          />
          <button className="btn" onClick={ask} disabled={loading || !input.trim()}>
            {loading ? '…' : 'Ask'}
          </button>
        </div>
      </div>
      {error && <p className="hint">⚠️ {error}</p>}
    </Page>
  )
}
