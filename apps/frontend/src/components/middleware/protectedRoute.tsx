import type { ReactNode } from 'react'
import { useUser } from '../../hooks/useUser'
import { Navigate } from 'react-router'
import type { Role } from '../../types/data'

export const ProtectedRoute = ({
  children,
  role = 'USER',
}: {
  children: ReactNode
  role?: Role
}) => {
  const { data: user, isPending } = useUser()

  if (isPending) {
    return // TODO: loading state
  }

  if (!user) {
    return <Navigate to="/auth/log-in" />
  }

  if (role === 'ADMIN' && !user.roles.includes('ADMIN')) {
    return <Navigate to="/404" replace />
  }

  return children
}
