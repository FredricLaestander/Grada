import { t, type Elysia } from 'elysia'
import { prisma } from '../../prisma/prisma'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { jwt } from '@elysiajs/jwt'

const usernameValidation = t.String({
  pattern: /^[a-zA-Z0-9_]{3,20}$/.source,
  error: 'Username must be 3-20 characters, letters/numbers/underscores only',
})

const emailValidation = t.String({
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.source,
  error: 'The provided email is not invalid.',
})

export const authRouter = (app: Elysia) => {
  app.post(
    '/auth/sign-up',
    async ({ body, status }) => {
      try {
        const checkUsername = await prisma.user.findUnique({
          where: {
            username: body.username,
          },
        })
        if (checkUsername) {
          return status(400, 'Username already taken')
        }

        const checkEmail = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        })
        if (checkEmail) {
          return status(400, 'Email already taken')
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)
        await prisma.user.create({
          data: {
            username: body.username,
            email: body.email,
            password: hashedPassword,
          },
        })

        return status(201, 'Created')
      } catch (error) {
        console.log('Auth signup: ', error)
        return status(500, 'Internal Server Error')
      }
    },
    {
      body: t.Object({
        username: usernameValidation,
        email: emailValidation,
        password: t.String({
          minLength: 6,
          error: 'Password must be atleast 6 characters long',
        }),
      }),
    },
  )
  app
    .use(
      jwt({
        name: 'jwt',
        secret: process.env.ACCESS_TOKEN_SECRET!,
        exp: '15m',
      }),
    )
    .post(
      '/auth/login',
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
            return status(400, 'wrong password, email or username')
          }

          const accessToken = await jwt.sign({
            userId: user.id,
            jti: uuid(),
          })

          return status(200, { accessToken })
        } catch (error) {
          console.log('Auth login: ', error)
          return status(500, 'Internal Server Error')
        }
      },
      {
        body: t.Object({
          identifier: t.String(),
          password: t.String(),
        }),
      },
    )

  return app
}
