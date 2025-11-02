import type { ReactNode } from 'react'

export const SidebarLink = ({
  state = false,
  children,
  href,
}: {
  state?: boolean
  children: ReactNode
  href: string
}) => {
  return (
    <a
      href={href}
      className={`text-grada-blue-200 flex w-full gap-2 rounded-2xl px-8 py-3 hover:bg-gray-700 ${state === true ? 'bg-gray-800' : 'bg-gray-950'}`}
    >
      {children}
    </a>
  )
}
