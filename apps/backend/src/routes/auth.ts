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
  .post(
    '/auth/log-in',
    async ({ body, status, jwt }) => {
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

        return status(200, { accessToken })
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

export const authRouter = new Elysia().use(auth)
