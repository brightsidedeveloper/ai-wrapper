import { useState } from 'react'

export default function ToolForm({
  placeholder,
  buttonLabel = 'Run',
  mock,
}: {
  placeholder: string
  buttonLabel?: string
  mock: (input: string) => string
}) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  function run() {
    if (!input.trim()) return
    setLoading(true)
    setOutput('')
    // Placeholder for a real API call (e.g. Claude). Mocked for now.
    setTimeout(() => {
      setOutput(mock(input))
      setLoading(false)
    }, 500)
  }

  return (
    <div className="tool-form">
      <textarea
        className="tool-input"
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
      />
      <button className="btn" onClick={run} disabled={loading || !input.trim()}>
        {loading ? 'Working…' : buttonLabel}
      </button>
      {output && <pre className="tool-output">{output}</pre>}
    </div>
  )
}
