import { useQuery } from '@tanstack/react-query'
import { createContext, use, type ReactNode } from 'react'
import { Navigate } from 'react-router'
import type { User } from '../types/data'
import { getUser } from '../lib/request'

const AuthContext = createContext<{ user: User } | null>(null)

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
}

export const AuthProvider = ({
  children,
  check,
}: {
  children: ReactNode
  check: (user: User) => string | undefined
}) => {
  const { data: user, isPending } = useUser()

  if (isPending) {
    return // loading?
  }

  if (!user) {
    return <Navigate to="/landing" />
  }

  const redirectPath = check(user)
  if (redirectPath) {
    return <Navigate to={redirectPath} />
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = use(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return {
    user: context.user,
  }
}
