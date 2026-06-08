import { useState } from 'react'
import Page from '../components/Page'

type Msg = { role: 'user' | 'assistant'; text: string }

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', text: 'Hi! Ask me anything.' },
  ])
  const [input, setInput] = useState('')

  function send() {
    if (!input.trim()) return
    const text = input.trim()
    setInput('')
    setMessages((m) => [...m, { role: 'user', text }])
    // Placeholder for a real model call.
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: 'assistant', text: `You said: "${text}". (Wire up the API to get a real reply.)` },
      ])
    }, 400)
  }

  return (
    <Page title="Chat" subtitle="A simple conversational assistant.">
      <div className="chat">
        <div className="chat-log">
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            placeholder="Type a message…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button className="btn" onClick={send}>
            Send
          </button>
        </div>
      </div>
    </Page>
  )
}
