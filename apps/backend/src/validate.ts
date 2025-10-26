import { t } from 'elysia'

export const usernameValidation = t.String({
  pattern: /^[a-zA-Z0-9_]{3,20}$/.source,
  error: 'Username must be 3-20 characters, letters/numbers/underscores only',
})

export const emailValidation = t.String({
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.source,
  error: 'The provided email is not invalid',
})

export const passwordValidation = t.String({
  pattern: /^(?=.{8,})/.source,
  error: 'Password must be at least 8 characters long',
})
