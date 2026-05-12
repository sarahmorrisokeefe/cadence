import { useEffect, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAuthPrompt } from '../../context/AuthPromptContext'

interface RequireAuthProps {
  children: ReactNode
  /** Message to show in the auth prompt toast on redirect. */
  message?: string
}

/**
 * Route guard. If signed in, renders children. If not, fires the auth
 * prompt toast and redirects to /auth.
 */
export function RequireAuth({ children, message }: RequireAuthProps) {
  const { user } = useAuth()
  const { showAuthPrompt } = useAuthPrompt()

  useEffect(() => {
    if (!user) showAuthPrompt(message)
  }, [user, message, showAuthPrompt])

  if (!user) return <Navigate to="/auth" replace />
  return <>{children}</>
}
