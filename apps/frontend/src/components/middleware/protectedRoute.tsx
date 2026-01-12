import type { ReactNode } from 'react'
import { useUser } from '../../hooks/useUser'
import { Navigate } from 'react-router'
import type { Role } from '../../types/data'

export const ProtectedRoute = ({
  children,
  role = 'USER',
  path = '/auth/log-in',
}: {
  children: ReactNode
  role?: Role
  path?: string
}) => {
  const { data: user, isPending } = useUser()

  if (isPending) {
    return // TODO: loading state
  }

  if (!user) {
    return <Navigate to={path} />
  }

  if (role === 'ADMIN' && !user.roles.includes('ADMIN')) {
    return <Navigate to="/404" replace />
  }

  return children
}
