export const TableRow = ({
  id,
  name,
  createdAt,
  updatedAt,
}: {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}) => {
  return (
    <a
      href={`/admin/users/${id}`}
      className="flex w-full items-center bg-gray-800 hover:bg-gray-700"
    >
      <div className="flex-1 truncate">{id}</div>
      <div className="flex-1 truncate">{name}</div>
      <div className="flex-1 truncate">{createdAt}</div>
      <div className="flex-1 truncate">{updatedAt}</div>
    </a>
  )
}
