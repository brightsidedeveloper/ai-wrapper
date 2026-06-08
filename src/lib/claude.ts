import Anthropic from '@anthropic-ai/sdk'
import { getApiKey, getModel } from './settings'

// This is a client-only app: the user supplies their own API key in Settings,
// and we call Claude directly from the browser. dangerouslyAllowBrowser is
// required for that. Note the key lives in the user's browser/localStorage —
// fine for a personal tool, but don't ship a shared key this way.

const SYSTEM_PROMPT = 'You are a helpful, concise conversational assistant.'

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

/**
 * Stream a chat completion. Calls `onText` with each text delta as it arrives,
 * and resolves with the full assistant reply. Throws if no API key is set or
 * the request fails. Pass `system` to override the default system prompt for
 * task-specific tools (e.g. the Summarizer).
 */
export async function streamChat(
  messages: ChatMessage[],
  onText: (delta: string) => void,
  signal?: AbortSignal,
  system: string = SYSTEM_PROMPT,
): Promise<string> {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('No API key set. Add one in Settings first.')
  }

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const stream = client.messages.stream(
    {
      model: getModel(),
      max_tokens: 4096,
      system,
      messages,
    },
    { signal },
  )

  stream.on('text', onText)

  const final = await stream.finalMessage()
  return final.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')
}
