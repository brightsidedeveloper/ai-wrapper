import Page from '../components/Page'
import ToolForm from '../components/ToolForm'

export default function DocQA() {
  return (
    <Page title="Doc Q&A" subtitle="Paste a document, then ask questions about it with citations.">
      <ToolForm
        placeholder="Paste your document text here, then add your question on the last line…"
        buttonLabel="Ask"
        mock={(input) =>
          `Answer based on your document:\n\nThe document is ${input.length} characters long. ` +
          `Once connected to a retrieval pipeline, answers will cite the relevant passages here.`
        }
      />
    </Page>
  )
}
