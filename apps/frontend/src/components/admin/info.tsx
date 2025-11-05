export const Info = ({ title, value }: { title: string; value: string }) => {
  return (
    <div>
      <h4 className="font-bold text-gray-400">{title}</h4>
      <p>{value}</p>
    </div>
  )
}
