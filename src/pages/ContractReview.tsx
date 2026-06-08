import { useRef, useState } from 'react'
import Page from '../components/Page'
import { streamChat } from '../lib/claude'

const SYSTEM_PROMPT =
  'You are a contract review assistant. Given the full text of a contract, ' +
  'lease, or terms-of-service document, produce a plain-English review. ' +
  'Structure your answer as: (1) a one-paragraph summary of what the ' +
  'document is and who the parties are; (2) "Risk flags" — a bulleted list ' +
  'of clauses that are unusual, one-sided, or worth scrutinising (use ⚠️), ' +
  'each with a short explanation; (3) "Looks standard" — a short bulleted ' +
  'list of clauses that appear normal (use ✅). Be concise and practical. ' +
  'You are not a lawyer and this is not legal advice — note that briefly at ' +
  'the end.'

// Extensions we can read as plain text in the browser. Binary formats like
// PDF and Word need a parser library, which this app doesn't bundle yet.
const ACCEPT = '.txt,.md,.markdown,.text,.rtf,text/plain'

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ContractReview() {
  const [fileName, setFileName] = useState('')
  const [docText, setDocText] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function loadFile(file: File) {
    setError('')
    setOutput('')
    try {
      const text = await file.text()
      if (!text.trim()) {
        throw new Error('That file appears to be empty.')
      }
      // Reject binary content read as text (e.g. a renamed PDF): the null byte
      // is a reliable signal that this isn't a plain-text document.
      if (text.includes(String.fromCharCode(0))) {
        throw new Error(
          "Couldn't read that file as text. Please upload a plain-text file " +
            '(.txt or .md). PDF and Word documents are not supported yet.',
        )
      }
      setFileName(file.name)
      setDocText(text)
    } catch (e) {
      setFileName('')
      setDocText('')
      setError(e instanceof Error ? e.message : 'Could not read that file.')
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) loadFile(file)
  }

  async function review() {
    if (!docText.trim() || loading) return
    setError('')
    setOutput('')
    setLoading(true)
    try {
      await streamChat(
        [{ role: 'user', content: docText }],
        (delta) => setOutput((o) => o + delta),
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
    <Page
      title="Contract Review"
      subtitle="Upload a contract for a plain-English summary and risk flags."
    >
      <div className="tool-form">
        <div
          className={`dropzone${dragging ? ' dragging' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()
          }
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) loadFile(file)
              e.target.value = ''
            }}
          />
          {fileName ? (
            <>
              <span className="dropzone-icon">📄</span>
              <span className="dropzone-name">{fileName}</span>
              <span className="dropzone-meta">
                {formatSize(docText.length)} of text · click to choose another
              </span>
            </>
          ) : (
            <>
              <span className="dropzone-icon">📎</span>
              <span className="dropzone-name">
                Drop a document here, or click to browse
              </span>
              <span className="dropzone-meta">
                Plain-text files (.txt, .md) read from your computer
              </span>
            </>
          )}
        </div>

        <button
          className="btn"
          onClick={review}
          disabled={loading || !docText.trim()}
        >
          {loading ? 'Reviewing…' : 'Review'}
        </button>

        {output && <pre className="tool-output">{output}</pre>}
        {error && <p className="hint">⚠️ {error}</p>}
      </div>
    </Page>
  )
}
