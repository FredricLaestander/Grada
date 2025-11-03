export const LessonCard = ({
  // state,
  title,
  id,
}: {
  // state: 'done' | 'active' | 'locked'
  title: string
  id: string
}) => {
  return (
    <a
      href={`/lessons/${id}`}
      className="border-grada-blue-500 hover:border-grada-blue-300 flex min-h-20 w-full max-w-xl items-center gap-4 rounded-2xl border-2 bg-gray-800 px-4 py-3"
    >
      <h4>{title}</h4>
    </a>
  )
}
