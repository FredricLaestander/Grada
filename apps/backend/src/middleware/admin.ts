import Elysia from 'elysia'
import { authPlugin } from './auth'

export const adminPlugin = (app: Elysia) => {
  return app.use(authPlugin).derive(async ({ status, currentUser }) => {
    try {
      if (!currentUser.roles.includes('ADMIN')) {
        return status(401, 'Unautherized')
      }
    } catch (error) {
      console.log('adminPlugin: ', error)
      return status(500, 'Internal Server Error')
    }
  })
}
