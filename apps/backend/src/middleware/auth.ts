import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { prisma } from '../../prisma/prisma'

export const authPlugin = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.ACCESS_TOKEN_SECRET!,
    }),
  )
  .derive({ as: 'global' }, async ({ jwt, status, cookie }) => {
    try {
      const token = cookie.accessToken?.value
      if (!token) {
        return status(401, 'access token not provided')
      }

      if (typeof token !== 'string') {
        return status(400, 'malformed access token')
      }

      const payload = await jwt.verify(token)
      if (!payload) {
        return status(401, 'invalid or expired access token')
      }

      if (typeof payload.userId !== 'string') {
        return status(400, 'malformed token payload')
      }

      const currentUser = await prisma.user.findUnique({
        where: { id: payload.userId },
        omit: { password: true },
      })

      if (!currentUser) {
        return status(404, 'user not found')
      }

      return { currentUser }
    } catch (error) {
      console.error('authPlugin: ', error)
      return status(
        500,
        'something went wrong when passing through the auth middleware',
      )
    }
  })
