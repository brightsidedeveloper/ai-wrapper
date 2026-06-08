import Page from '../components/Page'
import ToolForm from '../components/ToolForm'

export default function Summarizer() {
  return (
    <Page title="Summarizer" subtitle="Turn long text into a tight summary.">
      <ToolForm
        placeholder="Paste an article, transcript, or any long text…"
        buttonLabel="Summarize"
        mock={(input) => {
          const words = input.trim().split(/\s+/).length
          return `Summary (mock):\n\n• Input was ~${words} words.\n• Connect the API to get a real 3-bullet summary.\n• Key points and action items will appear here.`
        }}
      />
    </Page>
  )
}
