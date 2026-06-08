import Page from '../components/Page'
import ToolForm from '../components/ToolForm'

export default function Tutor() {
  return (
    <Page title="Tutor" subtitle="Learn any topic with a guided curriculum and quizzes.">
      <ToolForm
        placeholder="What do you want to learn? (e.g. 'React hooks, beginner level')"
        buttonLabel="Build my plan"
        mock={(input) =>
          `Learning plan for "${input}" (mock):\n\n1. Core concepts overview\n2. Hands-on example\n3. Quick quiz (5 questions)\n4. Spaced-repetition review\n\nWire up the API to generate real lessons and track what you miss.`
        }
      />
    </Page>
  )
}
