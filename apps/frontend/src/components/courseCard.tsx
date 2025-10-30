import { Tag } from './tag'

export const CourseCard = ({
  title,
  description,
  progress = 'none',
  tags,
}: {
  title: string
  description: string
  progress?: 'none' | 'finished'
  tags: string[]
}) => {
  const href = ''

  return (
    <a
      href={href}
      className={`border-grada-blue-500 hover:border-grada-blue-300 flex min-h-32 w-full max-w-xl flex-col gap-4 rounded-2xl border-2 p-4 sm:flex-row ${progress === 'finished' ? 'bg-grada-blue-500' : 'bg-gray-800'} `}
    >
      <div className="flex w-full flex-col gap-0.5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="size-12 rounded-full bg-transparent"></div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Tag>{tag}</Tag>
          ))}
        </div>
      </div>
    </a>
  )
}
