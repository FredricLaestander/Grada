import type { ReactNode } from 'react'

export const Tab = ({
  active = false,
  children,
  onClick,
}: {
  active?: boolean
  children: ReactNode
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer justify-between px-6 py-2 font-bold ${active === true ? 'bg-grada-blue-500' : 'hover:bg-grada-blue-950 bg-gray-950'}`}
    >
      {children}
    </button>
  )
}
