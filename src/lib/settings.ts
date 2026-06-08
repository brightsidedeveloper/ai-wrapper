// Persisted app settings (API key + model), stored in localStorage so the
// Chat page can read what the Settings page saved.

const KEY_API = 'ai-wrapper.apiKey'
const KEY_MODEL = 'ai-wrapper.model'

export const DEFAULT_MODEL = 'claude-opus-4-8'

export function getApiKey(): string {
  return localStorage.getItem(KEY_API) ?? ''
}

export function getModel(): string {
  return localStorage.getItem(KEY_MODEL) || DEFAULT_MODEL
}

export function saveSettings(apiKey: string, model: string): void {
  localStorage.setItem(KEY_API, apiKey)
  localStorage.setItem(KEY_MODEL, model)
}
