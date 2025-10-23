export const Logo = ({
  icon = true,
  text = true,
}: {
  icon?: boolean
  text?: boolean
}) => {
  return (
    <a href="/" className="flex items-center gap-1.5 px-1">
      {icon && <img src="/favicon.svg" />}
      {text && <p className="text-3xl leading-8 font-bold">Grada</p>}
    </a>
  )
}
