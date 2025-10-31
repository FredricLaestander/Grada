import type { ReactNode } from 'react'

export const LessonCard = ({
  state,
  children,
}: {
  state: 'done' | 'active' | 'locked'
  children: ReactNode
}) => {
  return (
    <div className="border-grada-blue-500 flex min-h-20 w-full items-center gap-4 rounded-2xl border-2 bg-gray-800 px-4 py-3">
      {children}
    </div>
  )
}
