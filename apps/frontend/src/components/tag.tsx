import type { ReactNode } from 'react'

export const Tag = ({
  children,
  variant = 'primary',
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}) => {
  return (
    <div
      className={`rounded-full border-2 px-4 py-1 font-bold text-gray-300 ${variant === 'secondary' ? 'border-gray-600' : 'border-grada-blue-600'}`}
    >
      {children}
    </div>
  )
}
