import { z } from 'zod'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Header } from '../components/header'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { emailSchema, passwordSchema, usernameSchema } from '../validate'

const signUpSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['password'],
  })

export const SignUp = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [serverError, setServerError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    username: string | null
    email: string | null
    password: string | null
  }>({
    username: null,
    email: null,
    password: null,
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const {
      success,
      data: inputData,
      error,
    } = signUpSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
    })

    if (!success) {
      const formattedErrors = z.treeifyError(error)
      setErrors({
        username: formattedErrors.properties?.username?.errors[0] || null,
        email: formattedErrors.properties?.email?.errors[0] || null,
        password: formattedErrors.properties?.password?.errors[0] || null,
      })
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputData),
        },
      )
      const responseData = await response.json()

      if (!response.ok) {
        setServerError(responseData.error)
        return
      }
      navigate('/auth/log-in')
    } catch (error) {
      console.error(error)
      setServerError('Something went wrong when creating the user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="flex w-full max-w-sm flex-col items-center gap-6 px-4 pt-28">
        <div className="flex w-full flex-col items-center gap-2">
          <h2 className="text-4xl font-bold">
            Welcome to <span className="text-grada-blue-300">Grada</span>!
          </h2>
          <p className="text-sm text-gray-400">
            No need to remember a password!
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
          <Input
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            error={errors.username}
            id="username"
          />

          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={errors.email}
            id="email"
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
            id="password"
          />

          <Input
            type="password"
            label="Confirm password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            id="confirm-password"
            error={null}
          />
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row-reverse sm:justify-between">
            <Button
              as="button"
              type="submit"
              isLoading={isLoading}
              classname="w-full sm:w-auto"
            >
              Sign up
            </Button>
            <a
              href="/auth/log-in"
              className="text-sm text-gray-400 hover:text-gray-100 hover:underline"
            >
              Already have an account? Log in
            </a>
          </div>
          {serverError && (
            <span className="text-grada-red text-sm">{serverError}</span>
          )}
        </form>
      </div>
    </>
  )
}
