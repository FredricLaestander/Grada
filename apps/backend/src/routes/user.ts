import Elysia from 'elysia'
import { prisma } from '../../prisma/prisma'
import { authPlugin } from '../middleware/auth'

export const userRouter = (app: Elysia) => {
  app.use(authPlugin).get('/users/:id', async ({ params, status }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: params.id },
        omit: { password: true },
      })

      if (!user) {
        return status(404, 'User Not Found')
      }

      return status(200, { user })
    } catch (error) {
      console.log('users id', error)
      return status(500, 'Internal Server Error')
    }
  })
  app.use(authPlugin).get('/users/me', async ({ userId, status }) => {
    try {
      if (typeof userId !== 'string') {
        return status(400, 'Invalid Token')
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        omit: { password: true },
      })

      if (!user) {
        return status(404, 'User Not Found')
      }

      return status(200, { user })
    } catch (error) {
      console.log('users me', error)
      return status(500, 'Internal Server Error')
    }
  })

  return app
}
