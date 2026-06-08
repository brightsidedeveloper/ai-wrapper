import Page from '../components/Page'
import ToolForm from '../components/ToolForm'

export default function Repurpose() {
  return (
    <Page
      title="Repurpose"
      subtitle="Turn one piece of content into a thread, post, and newsletter."
    >
      <ToolForm
        placeholder="Paste a blog post, transcript, or rough notes…"
        buttonLabel="Repurpose"
        mock={() =>
          `Outputs (mock):\n\n🐦 X thread: 5 punchy tweets\n💼 LinkedIn post: 1 narrative post\n📧 Newsletter: intro + 3 sections\n\nConnect the API to generate these in your saved voice.`
        }
      />
    </Page>
  )
}
