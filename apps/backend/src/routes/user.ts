import Elysia from 'elysia'
import { prisma } from '../../prisma/prisma'
import { authPlugin } from '../middleware/auth'

export const userRouter = (app: Elysia) => {
  return app.use(authPlugin).get('/users/:id', async ({ params, status }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: params.id },
        omit: { password: true },
      })

      if (!user) {
        return status(404, 'User not found')
      }

      return status(200, { user })
    } catch (error) {
      console.log('users id', error)
      return status(500, 'Internal Server Error')
    }
  })
}
