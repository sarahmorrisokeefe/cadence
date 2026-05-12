import { useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useAuthPrompt } from '../context/AuthPromptContext'

/**
 * Wrap protected click handlers. If the user is signed in, the action runs.
 * Otherwise the auth prompt toast appears with the given message.
 */
export function useRequireAuth() {
  const { user } = useAuth()
  const { showAuthPrompt } = useAuthPrompt()

  const gate = useCallback(
    (action: () => void, message?: string) => {
      if (user) action()
      else showAuthPrompt(message)
    },
    [user, showAuthPrompt]
  )

  return { user, gate }
}
