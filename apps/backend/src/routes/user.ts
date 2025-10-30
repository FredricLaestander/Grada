import { Elysia, t } from 'elysia'
import { prisma } from '../../prisma/prisma'
import { authPlugin } from '../middleware/auth'
import { adminPlugin } from '../middleware/admin'
import { emailValidation, usernameValidation } from '../validate'

const user = new Elysia()
  .use(authPlugin)
  .get('/users/me', async ({ currentUser, status }) => {
    return status(200, currentUser)
  })
  .patch(
    '/users/me',
    async ({ currentUser, body, status }) => {
      try {
        if (body.username) {
          const username = await prisma.user.findUnique({
            where: {
              username: body.username,
            },
          })
          if (username) {
            return status(409, 'username taken')
          }
        }

        if (body.email) {
          const email = await prisma.user.findUnique({
            where: {
              email: body.email,
            },
          })
          if (email) {
            return status(409, 'email taken')
          }
        }
        const updatedUser = await prisma.user.update({
          where: { id: currentUser.id },
          data: body,
        })
        return status(200, updatedUser)
      } catch (error) {
        console.error('users me update', error)
        return status(500, 'something went wrong when trying to update user')
      }
    },
    {
      body: t.Object({
        username: t.Optional(usernameValidation),
        email: t.Optional(emailValidation),
      }),
    },
  )
  .delete('/users/me', async ({ currentUser, status }) => {
    try {
      await prisma.user.delete({
        where: { id: currentUser.id },
      })
      return status(200, 'user deleted')
    } catch (error) {
      console.error('users me: ', error)
      return status(500, 'something went wrong when trying to delete user')
    }
  })

const admin = new Elysia()
  .use(adminPlugin)
  .get('/users/:id', async ({ params, status }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: params.id },
        omit: { password: true },
      })
      if (!user) {
        return status(404, 'user not found')
      }
      return status(200, { user })
    } catch (error) {
      console.error('users id', error)
      return status(500, 'something went wrong when trying to get users by id')
    }
  })

export const userRouter = new Elysia().use(user).use(admin)
