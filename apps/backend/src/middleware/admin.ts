import Elysia from 'elysia'
import { authPlugin } from './auth'

export const adminPlugin = new Elysia()
  .use(authPlugin)
  .derive({ as: 'global' }, async ({ status, currentUser }) => {
    try {
      if (!currentUser.roles.includes('ADMIN')) {
        return status(401, 'Unauthorized')
      }
    } catch (error) {
      console.log('adminPlugin: ', error)
      return status(500, 'Internal Server Error')
    }
  })
