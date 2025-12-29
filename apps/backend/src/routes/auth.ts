import { Elysia, t } from 'elysia'
import { prisma } from '../../prisma/prisma'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { jwt } from '@elysiajs/jwt'
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../validate'

const auth = new Elysia()
  .post(
    '/auth/sign-up',
    async ({ body, status }) => {
      try {
        const checkUsername = await prisma.user.findUnique({
          where: {
            username: body.username,
          },
        })
        if (checkUsername) {
          return status(400, { error: 'username already taken' })
        }

        const checkEmail = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        })
        if (checkEmail) {
          return status(400, { error: 'email already taken' })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)
        await prisma.user.create({
          data: {
            username: body.username,
            email: body.email,
            password: hashedPassword,
          },
        })

        return status(201, { message: 'created' })
      } catch (error) {
        console.error('auth signup: ', error)
        return status(500, { error: 'something went wrong when creating user' })
      }
    },
    {
      body: t.Object({
        username: usernameValidation,
        email: emailValidation,
        password: passwordValidation,
      }),
    },
  )
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.ACCESS_TOKEN_SECRET!,
      exp: '15m',
    }),
  )
  .use(
    jwt({
      name: 'refresh',
      secret: process.env.ACCESS_TOKEN_SECRET!,
      exp: '7d',
    }),
  )
  .post(
    '/auth/refresh-token',
    async ({ cookie, status, jwt }) => {
      try {
        const refreshToken = cookie.refreshToken.value
        if (!refreshToken) {
          return status(401, { error: 'no refresh token' })
        }

        const validToken = await jwt.verify(refreshToken)
        if (!validToken) {
          return status(401, { error: 'invalid refresh token' })
        }

        const { userId } = (await jwt.verify(refreshToken)) as {
          userId: string
        }

        const accessToken = await jwt.sign({
          userId,
          jti: uuid(),
        })
        cookie.accessToken.value = accessToken
        cookie.accessToken.sameSite = 'none'
        cookie.accessToken.httpOnly = true
        cookie.accessToken.secure = true
        cookie.accessToken.maxAge = 60 * 15 // 15 minutes

        return status(204)
      } catch (error) {
        console.error('auth refresh-token: ', error)
        return status(500, {
          error: 'something went wrong when trying to refresh-token',
        })
      }
    },
    {
      cookie: t.Cookie({ refreshToken: t.String() }),
    },
  )
  .post(
    '/auth/log-in',
    async ({ body, status, jwt, refresh, cookie }) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: { equals: body.identifier } },
              { username: { equals: body.identifier } },
            ],
          },
        })

        if (!user || !(await bcrypt.compare(body.password, user.password))) {
          return status(400, { error: 'wrong password, email or username' })
        }

        const accessToken = await jwt.sign({
          userId: user.id,
          jti: uuid(),
        })
        cookie.accessToken.value = accessToken
        cookie.accessToken.sameSite = 'none'
        cookie.accessToken.httpOnly = true
        cookie.accessToken.secure = true
        cookie.accessToken.maxAge = 60 * 15 // 15 minutes

        const refreshToken = await refresh.sign({
          userId: user.id,
          jti: uuid(),
        })
        cookie.refreshToken.value = refreshToken
        cookie.refreshToken.sameSite = 'none'
        cookie.refreshToken.httpOnly = true
        cookie.refreshToken.secure = true
        cookie.refreshToken.maxAge = 60 * 24 * 7 // 7 days

        return status(200, { message: 'success' })
      } catch (error) {
        console.error('auth login: ', error)
        return status(500, {
          error: 'something went wrong when trying to log in',
        })
      }
    },
    {
      body: t.Object({
        identifier: t.String(),
        password: t.String(),
      }),
    },
  )
  .delete('/auth/log-out', async ({ cookie, status }) => {
    try {
      cookie.accessToken.value = ''
      cookie.accessToken.maxAge = 0

      cookie.refreshToken.value = ''
      cookie.refreshToken.maxAge = 0

      return status(200, { message: 'success' })
    } catch (error) {
      console.error('auth log out:', error)
      return status(500, {
        error: 'something went wrong when trying to log out',
      })
    }
  })

export const authRouter = new Elysia().use(auth)
