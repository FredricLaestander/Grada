import type { ReactNode } from 'react'
import { AuthProvider } from '../hooks/auth'

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
