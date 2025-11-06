import z from 'zod'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { signUpSchema } from '../../validate'
import { useNavigate } from 'react-router'
import { useState, type FormEvent } from 'react'
import { backend } from '../../lib/clients/backend'

const roleSchema = z.array(z.string())
const createSchema = signUpSchema.safeExtend({ roles: roleSchema })

export const CreateUser = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [roles, setRoles] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState<{
    username: string | null
    email: string | null
    password: string | null
    roles: string | null
  }>({
    username: null,
    email: null,
    password: null,
    roles: null,
  })
  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const {
      success,
      data: inputData,
      error,
    } = createSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
      roles,
    })

    console.log(success, error)

    if (!success) {
      const formattedErrors = z.treeifyError(error)
      setErrors({
        username: formattedErrors.properties?.username?.errors[0] || null,
        email: formattedErrors.properties?.email?.errors[0] || null,
        password: formattedErrors.properties?.password?.errors[0] || null,
        roles: formattedErrors.properties?.roles?.errors[0] || null,
      })
      return
    }

    try {
      setIsLoading(true)
      const userId = await backend.post(`/auth/sign-up`, inputData)
      navigate(`/admin/users/${userId}`)
    } catch (error) {
      console.error(error)
      setServerError('Something went wrong when trying to create a user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-dvh w-full flex-col items-center justify-between px-8 pt-20 pb-8"
    >
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <Input
          label="Username"
          error={errors.username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          label="Email"
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Password"
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          label="Confirm password"
          error={null}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <div className="flex flex-col gap-3 bg-white">
          <h4>Roles</h4>
        </div>
        {serverError && (
          <span className="text-grada-red text-sm">{serverError}</span>
        )}
      </div>

      <div className="flex w-full items-center justify-end gap-3">
        {/* <Button as="button" variant="secondary" type="button">
          Cancel
        </Button> */}
        <Button as="button" isLoading={isLoading}>
          Create user
        </Button>
      </div>
    </form>
  )
}
