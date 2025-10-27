import { z } from 'zod'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Header } from '../components/header'
import { emailSchema, usernameSchema } from '../validate'
import { useNavigate } from 'react-router'
import { useState, type FormEvent } from 'react'

const identifierSchema = z
  .string()
  .refine(
    (value) =>
      usernameSchema.safeParse(value).success ||
      emailSchema.safeParse(value).success,
    {
      message: 'Must be a valid username or email address',
    },
  )

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')

const loginSchema = z.object({
  identifier: identifierSchema,
  password: passwordSchema,
})

export const LogIn = () => {
  const navigate = useNavigate()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    identifier: string | null
    password: string | null
  }>({ identifier: null, password: null })
  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError(null)

    const {
      success,
      data: inputData,
      error,
    } = loginSchema.safeParse({
      identifier,
      password,
    })

    if (!success) {
      const formattedErrors = z.treeifyError(error)

      setErrors({
        identifier:
          formattedErrors?.properties?.identifier?.errors?.[0] || null,
        password: formattedErrors?.properties?.password?.errors?.[0] || null,
      })
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/log-in`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputData),
        },
      )

      const responseData = await response.json()
      console.log(response.ok, responseData)

      if (response.ok) {
        setServerError(responseData.error)
        return
      }
      navigate('/courses')
    } catch (error) {
      console.error(error)
      setServerError('Something went wrong while logging in')
    }
  }

  return (
    <>
      <Header />
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-2">
          <h2 className="text-center text-4xl font-bold">
            Welcome back to <span className="text-grada-blue-300">Grada</span>!
          </h2>
          <p className="text-sm text-gray-400">
            Hope you remembered your password..
          </p>
        </div>
        <form
          action="submit"
          onSubmit={onSubmit}
          className="flex w-full flex-col gap-4"
        >
          <Input label="Username or email" error={errors.identifier} />
          <Input label="Password" error={errors.password} />
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row-reverse sm:justify-between">
            <Button as="button" type="submit" classname="w-full sm:w-auto">
              Log in
            </Button>
            <a
              href="/auth/sign-up"
              className="text-sm text-gray-400 hover:text-gray-100 hover:underline"
            >
              Don't have an account yet? Sign up here!
            </a>
          </div>
        </form>
      </div>
    </>
  )
}
