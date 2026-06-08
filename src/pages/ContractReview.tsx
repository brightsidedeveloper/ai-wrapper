import Page from '../components/Page'
import ToolForm from '../components/ToolForm'

export default function ContractReview() {
  return (
    <Page
      title="Contract Review"
      subtitle="Paste a contract for a plain-English summary and risk flags."
    >
      <ToolForm
        placeholder="Paste contract, lease, or terms-of-service text…"
        buttonLabel="Review"
        mock={() =>
          `Risk review (mock):\n\n⚠️  Auto-renewal clause detected — review cancellation terms.\n⚠️  Liability cap appears one-sided.\n✅  Payment terms look standard.\n\nConnect the API for a full clause-by-clause breakdown.`
        }
      />
    </Page>
  )
}
