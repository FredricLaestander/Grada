import { Input } from '../../components/input'

export const AdminUsers = () => {
  const onSubmit = () => {
    ''
  }

  const error = 'error'
  return (
    <main className="flex h-dvh w-full items-end px-8 pt-20 pb-8">
      <form>
        <Input label="Search" error={error} />
      </form>
    </main>
  )
}
