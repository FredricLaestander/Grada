import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Base = {
  icon?: LucideIcon
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

type ButtonProps = { as: 'button'; onClick: () => void; href?: never }
type LinkProps = { as: 'a'; href: string; onClick?: never }
type Props = Base & (ButtonProps | LinkProps)

export const Button = ({
  icon: Icon,
  variant = 'primary',
  children,
  as: Element,
  href,
  onClick,
}: Props) => {
  return (
    <Element
      href={href}
      onClick={onClick}
      className={`flex cursor-pointer gap-3 rounded-full px-8 py-3 text-base font-bold transition ${variant === 'secondary' ? 'hover:bg-grada-blue-950 bg-gray-950 text-gray-100' : 'bg-grada-blue-500 hover:bg-grada-blue-600 text-gray-950'}`}
    >
      {Icon && <Icon size={24} />}
      {children}
    </Element>
  )
}
