import { t, type Elysia } from 'elysia'
import { prisma } from '../../prisma/prisma'
import bcrypt from 'bcrypt'

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
        username: t.String(),
        email: t.String({ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.source }),
        password: t.String(),
      }),
    },
  )

  return app
}
