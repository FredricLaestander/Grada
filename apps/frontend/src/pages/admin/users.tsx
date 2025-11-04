import z from 'zod'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { useState, type FormEvent } from 'react'
import { backend } from '../../lib/clients/backend'
import type { User } from '../../types/data'
import { TableRow } from '../../components/admin/tableRow'
import { TableHeader } from '../../components/admin/tableHeader'

const searchSchema = z.string().min(3, 'Must contain at least 3 charcters')

export const AdminUsers = () => {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [validationError, setValidationError] = useState<string | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const [users, setUsers] = useState<User[] | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { success, data, error } = searchSchema.safeParse(search)

    if (!success) {
      const formattedErrors = z.treeifyError(error)

      setValidationError(formattedErrors.errors[0])
      return
    }

    try {
      setIsLoading(true)
      const response = await backend.get('/users/search', {
        params: { q: data },
      })
      setUsers(response.data)
    } catch (error) {
      console.error(error)
      setServerError('Something went wrong when trying to search users')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-between px-8 pt-20 pb-8">
      <section className="flex w-full grow flex-col gap-1">
        <TableHeader />
        {users?.length === 0 ? (
          <div className="flex grow flex-col items-center justify-center gap-6">
            <img src="/notFound.png" alt="not found" className="size-20" />
            <div>
              <p>Uh oh, we didn't find any users matching your search</p>
              {/* TODO: check previous search so you can display "search query" */}
            </div>
          </div>
        ) : (
          users?.map((user) => (
            <TableRow
              key={user.id}
              id={user.id}
              name={user.username}
              createdAt={user.createdAt}
              updatedAt={user.updatedAt}
            />
          ))
        )}
      </section>
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-3xl items-start gap-3 pt-4"
      >
        <Input
          label="Search"
          error={validationError}
          onChange={(event) => setSearch(event.target.value)}
          className="grow"
        />
        <Button
          variant="primary"
          as="button"
          type="submit"
          isLoading={isLoading}
        >
          Search
        </Button>
      </form>
      {serverError && (
        <span className="text-grada-red text-sm">{serverError}</span>
      )}
    </main>
  )
}
