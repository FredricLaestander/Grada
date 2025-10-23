import type { InputHTMLAttributes } from 'react'
import { cn } from '../utils/classname'

export const Input = ({
  label,
  error,
  ...props
}: {
  label: string
  error: string | null
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          'has-focus-visible:border-grada-blue-200 border-grada-blue-500 relative flex w-full items-center gap-2 rounded-2xl border bg-gray-900 px-6 py-3 text-gray-100 outline-none',
          error && 'border-grada-red',
        )}
      >
        <input
          {...props}
          placeholder={label}
          className="peer w-full outline-0 placeholder:text-transparent"
        />

        <label
          htmlFor={props.id}
          className={cn(
            'pointer-events-none absolute -top-4 left-6 cursor-text text-xs text-gray-300 transition-all',
            'peer-focus-visible:text-blue peer-focus-visible:-top-4 peer-focus-visible:left-6 peer-focus-visible:text-xs',
            'peer-placeholder-shown:top-3 peer-placeholder-shown:left-6 peer-placeholder-shown:text-base',
          )}
        >
          {label}
        </label>
      </div>
      {error && <span className="text-red text-sm">{error}</span>}
    </div>
  )
}
