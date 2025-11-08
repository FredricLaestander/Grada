import { useState } from 'react'
import { cn } from '../../utils/classname'

export const Switch = ({
  label,
  id,
  onToggle,
}: {
  label: string
  id: string
  onToggle: (checked: boolean) => void
}) => {
  const [checked, setChecked] = useState(false)

  const toggleChecked = () => {
    const newChecked = !checked
    onToggle(newChecked)
    setChecked(newChecked)
  }

  return (
    <div className="flex items-center gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={toggleChecked}
        className="hidden"
      />
      <button
        type="button"
        onClick={toggleChecked}
        className={cn(
          'relative h-6 w-12 rounded-full bg-gray-800 p-0.5',
          checked && 'bg-grada-blue-500 justify-end',
        )}
      >
        <div
          className={cn(
            'size-5 rounded-full bg-gray-50 transition',
            checked && 'translate-x-6',
          )}
        />
      </button>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
