import type { ComponentType } from 'react'
import Home from './pages/Home'
import Chat from './pages/Chat'
import DocQA from './pages/DocQA'
import Summarizer from './pages/Summarizer'
import ContractReview from './pages/ContractReview'
import Tutor from './pages/Tutor'
import Repurpose from './pages/Repurpose'
import Translate from './pages/Translate'
import History from './pages/History'
import Settings from './pages/Settings'

export type RouteDef = {
  path: string
  label: string
  icon: string
  element: ComponentType
}

export const routes: RouteDef[] = [
  { path: '/', label: 'Home', icon: '🏠', element: Home },
  { path: '/chat', label: 'Chat', icon: '💬', element: Chat },
  { path: '/docs', label: 'Doc Q&A', icon: '📄', element: DocQA },
  { path: '/summarize', label: 'Summarizer', icon: '📝', element: Summarizer },
  { path: '/contract', label: 'Contract Review', icon: '⚖️', element: ContractReview },
  { path: '/tutor', label: 'Tutor', icon: '🎓', element: Tutor },
  { path: '/repurpose', label: 'Repurpose', icon: '🔁', element: Repurpose },
  { path: '/translate', label: 'Translate', icon: '🌐', element: Translate },
  { path: '/history', label: 'History', icon: '🕘', element: History },
  { path: '/settings', label: 'Settings', icon: '⚙️', element: Settings },
]
