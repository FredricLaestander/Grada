import z from 'zod'
import type { User } from '../../types/data'
import { emailSchema, usernameSchema } from '../../validate'
import { Input } from '../input'
import { useState, type FormEvent } from 'react'
import { backend } from '../../lib/clients/backend'
import { Button } from '../button'
import { UserX } from 'lucide-react'
import { deleteUserById } from '../../lib/request'
import { useNavigate } from 'react-router'

const EditSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
})

export const Edit = ({
  user,
  onSuccess,
  onCancel,
}: {
  user: User
  onSuccess: () => void
  onCancel: () => void
}) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState<{
    username: string | null
    email: string | null
  }>({
    username: null,
    email: null,
  })
  const [serverError, setServerError] = useState<string | null>(null)

  const handleCancel = () => {
    onCancel()
  }

  const handleDelete = async () => {
    await deleteUserById(user.id)
    navigate('/admin/users')
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const {
      success,
      data: inputData,
      error,
    } = EditSchema.safeParse({
      username,
      email,
    })

    if (!success) {
      const formattedErrors = z.treeifyError(error)
      setErrors({
        username: formattedErrors.properties?.username?.errors[0] || null,
        email: formattedErrors.properties?.email?.errors[0] || null,
      })
      return
    }

    try {
      setIsLoading(true)
      await backend.patch(`/users/${user.id}`, inputData)
      onSuccess()
    } catch (error) {
      console.error(error)
      setServerError('Something went wrong when trying to update the user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-3xl flex-col">
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          value={username}
          error={errors.username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          label="Email"
          value={email}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {serverError && (
          <span className="text-grada-red text-sm">{serverError}</span>
        )}
      </div>
      <div className="flex justify-between">
        <Button
          as="button"
          type="button"
          icon={UserX}
          onClick={handleDelete}
          variant="secondary"
        >
          Delete user
        </Button>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            as="button"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button as="button" type="submit" isLoading={isLoading}>
            Update user
          </Button>
        </div>
      </div>
    </form>
  )
}
