import { Tag } from './tag'

export const CourseCard = ({
  title,
  description,
  progress = 'none',
}: {
  title: string
  description: string
  progress?: 'none' | 'finished'
}) => {
  const href = ''

  return (
    <a
      href={href}
      className={`border-grada-blue-500 flex min-h-32 w-full max-w-2xl flex-col items-end justify-end gap-4 rounded-2xl border-2 p-4 sm:flex-row ${progress === 'finished' ? 'bg-grada-blue-500' : 'bg-gray-800'} `}
    >
      <div className="flex w-full flex-col gap-0.5">
        <h3 className="font-bold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex gap-2">
          <Tag>HTML</Tag>
          <Tag variant="secondary">Beginner</Tag>
        </div>
      </div>
    </a>
  )
}
