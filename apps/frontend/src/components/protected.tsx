import type { ReactNode } from 'react'
import { AuthProvider } from '../hooks/useUser'

export const Protected = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider
      check={(user) => {
        if (!user) {
          return '/personalize-account'
        }
      }}
    >
      {children}
    </AuthProvider>
  )
}
