import Page from '../components/Page'

const SAMPLE = [
  { tool: 'Summarizer', when: '2 min ago', preview: 'Summarized a 1,200-word article…' },
  { tool: 'Chat', when: '1 hr ago', preview: 'Discussed React routing patterns…' },
  { tool: 'Contract Review', when: 'Yesterday', preview: 'Flagged 2 risks in a lease…' },
]

export default function History() {
  return (
    <Page title="History" subtitle="Your recent runs across all tools.">
      <ul className="history-list">
        {SAMPLE.map((h, i) => (
          <li key={i} className="history-item">
            <div className="history-tool">{h.tool}</div>
            <div className="history-preview">{h.preview}</div>
            <div className="history-when">{h.when}</div>
          </li>
        ))}
      </ul>
      <p className="hint">Runs are mock data — persist real ones once the backend is connected.</p>
    </Page>
  )
}
