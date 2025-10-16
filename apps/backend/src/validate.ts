import { t } from 'elysia'

export const usernameValidation = t.String({
  pattern: /^[a-zA-Z0-9_]{3,20}$/.source,
  error: 'username must be 3-20 characters, letters/numbers/underscores only',
})

export const emailValidation = t.String({
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.source,
  error: 'the provided email is not invalid.',
})
