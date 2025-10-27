import { z } from 'zod'

export const usernameSchema = z
  .string()
  .min(3, 'Username needs to be at least 3 characters')
  .max(32, 'Username can not be long than 32 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only include letters and numbers')
  .trim()

export const emailSchema = z.email('Please enter a valid email').trim()

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
