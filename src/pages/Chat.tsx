import { useEffect, useRef, useState } from 'react'
import Page from '../components/Page'
import { streamChat, type ChatMessage } from '../lib/claude'

type Msg = { role: 'user' | 'assistant'; text: string }

const GREETING: Msg = { role: 'assistant', text: 'Hi! Ask me anything.' }

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const logRef = useRef<HTMLDivElement>(null)

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setError('')

    // Build the API history from the turns so far + this new user message,
    // dropping the leading assistant greeting (the API must start with a user turn).
    const userMsg: Msg = { role: 'user', text }
    const history: ChatMessage[] = [...messages, userMsg]
      .filter((m, i) => !(i === 0 && m.role === 'assistant'))
      .map((m) => ({ role: m.role, content: m.text }))

    // Show the user message and an empty assistant bubble to stream into.
    setMessages((m) => [...m, { role: 'user', text }, { role: 'assistant', text: '' }])
    setLoading(true)

    try {
      await streamChat(history, (delta) => {
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
      // Drop the empty assistant placeholder and surface the error.
      setMessages((m) => m.slice(0, -1))
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page title="Chat" subtitle="A simple conversational assistant.">
      <div className="chat">
        <div className="chat-log" ref={logRef}>
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
            placeholder="Type a message…"
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button className="btn" onClick={send} disabled={loading || !input.trim()}>
            {loading ? '…' : 'Send'}
          </button>
        </div>
      </div>
      {error && <p className="hint">⚠️ {error}</p>}
    </Page>
  )
}
