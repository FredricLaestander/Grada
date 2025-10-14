import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { prisma } from '../../prisma/prisma'

export const authPlugin = (app: Elysia) => {
  return app
    .use(
      jwt({
        name: 'jwt',
        secret: process.env.ACCESS_TOKEN_SECRET!,
      }),
    )
    .derive(async ({ jwt, headers, status }) => {
      try {
        const authHeader = headers.authorization

        if (!authHeader) {
          return status(401, 'Unauthorized')
        }

        const token = authHeader.split(' ')[1]
        const payload = await jwt.verify(token)

        if (!payload) {
          return status(401, 'Unauthorized')
        }

        if (typeof payload.userId !== 'string') {
          return status(400, 'Invalid Token')
        }

        const currentUser = await prisma.user.findUnique({
          where: { id: payload.userId },
          omit: { password: true },
        })

        if (!currentUser) {
          return status(404, 'User Not Found')
        }

        return { currentUser }
      } catch (error) {
        console.log('authPlugin: ', error)
        return status(500, 'Internal Server Error')
      }
    })
}
