import { z } from 'zod/v4'
import { Input } from '../components/input'

const usernameSchema = z
  .string()
  .min(3)
  .max(32)
  .regex(/^[a-zA-Z0-9_]{3,32}$/)
  .trim()

export const SignUp = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex w-full flex-col gap-2">
        <h2>
          Welcome to <span className="text-grada-blue-300">Grada</span>!
        </h2>
        <p className="text-gray-400">No need to remember a password!</p>
      </div>
      <form
        action="submit"
        onSubmit={async (event) => {
          event.preventDefault()
        }}
      >
        <Input
      </form>
    </div>
  )
}
