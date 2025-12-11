import { Elysia } from 'elysia'
import { authPlugin } from './auth'

export const adminPlugin = new Elysia()
  .use(authPlugin)
  .derive({ as: 'global' }, async ({ status, currentUser }) => {
    try {
      if (!currentUser.roles.includes('ADMIN')) {
        return status(403, 'admin header missing')
      }
    } catch (error) {
      console.error('adminPlugin: ', error)
      return status(
        500,
        'something went wrong when passing through admin middleware',
      )
    }
  })
