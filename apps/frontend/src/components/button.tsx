import { LoaderCircle, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../utils/classname'

type Base = {
  icon?: LucideIcon
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
  classname?: string
  isLoading?: boolean
}

type ButtonProps = {
  as: 'button'
  onClick?: () => void
  type?: 'button' | 'submit'
  href?: never
}
type LinkProps = { as: 'a'; href: string; onClick?: never; type?: never }
type Props = Base & (ButtonProps | LinkProps)

export const Button = ({
  icon: Icon,
  variant = 'primary',
  children,
  as: Element,
  href,
  onClick,
  type,
  classname,
  isLoading,
}: Props) => {
  return (
    <Element
      href={href}
      onClick={onClick}
      type={type}
      className={cn(
        `relative flex cursor-pointer gap-3 rounded-full px-8 py-3 text-base font-bold whitespace-nowrap transition`,
        variant === 'primary' &&
          `bg-grada-blue-500 hover:bg-grada-blue-600 text-gray-950`,
        variant === 'secondary' &&
          `hover:bg-grada-blue-950 bg-gray-950 text-gray-100`,
        variant === 'ghost' &&
          `hover:bg-grada-blue-100/10 bg-transparent px-5 py-3 text-sm font-medium text-gray-100`,
        classname,
      )}
    >
      {Icon && <Icon size={24} />}
      <span className={cn(isLoading && 'text-transparent')}>{children}</span>
      {isLoading && (
        <LoaderCircle className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
      )}
    </Element>
  )
}
