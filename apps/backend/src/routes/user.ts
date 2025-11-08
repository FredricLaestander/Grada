import { Elysia, t, Context } from 'elysia'
import { prisma } from '../../prisma/prisma'
import bcrypt from 'bcrypt'
import { authPlugin } from '../middleware/auth'
import { adminPlugin } from '../middleware/admin'
import {
  emailValidation,
  passwordValidation,
  roleValidation,
  usernameValidation,
} from '../validate'

const update = async ({
  id,
  body,
  status,
}: {
  id: string
  body: {
    username?: string | undefined
    email?: string | undefined
  }
  status: Context['status']
}) => {
  try {
    if (body.username) {
      const username = await prisma.user.findUnique({
        where: {
          username: body.username,
        },
      })
      if (username && username.username !== body.username) {
        return status(409, 'username taken')
      }
    }

    if (body.email) {
      const email = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      })
      if (email && email.email !== body.email) {
        return status(409, 'email taken')
      }
    }
    await prisma.user.update({
      where: { id },
      data: body,
    })
    return status(200, 'success')
  } catch (error) {
    console.error('users update', error)
    return status(500, 'something went wrong when trying to update user')
  }
}

const deleteUser = async ({
  id,
  status,
}: {
  id: string
  status: Context['status']
}) => {
  try {
    await prisma.user.delete({
      where: { id },
    })
    return status(200, 'user deleted')
  } catch (error) {
    console.error('users delete: ', error)
    return status(500, 'something went wrong when trying to delete user')
  }
}

const user = new Elysia()
  .use(authPlugin)
  .get('/users/me', async ({ currentUser, status }) => {
    return status(200, currentUser)
  })
  .patch(
    '/users/me',
    async ({ currentUser, body, status }) => {
      return update({ id: currentUser.id, body, status })
    },
    {
      body: t.Object({
        username: t.Optional(usernameValidation),
        email: t.Optional(emailValidation),
      }),
    },
  )
  .delete('/users/me', async ({ currentUser, status }) => {
    return deleteUser({ id: currentUser.id, status })
  })

const admin = new Elysia()
  .use(adminPlugin)
  .post(
    '/users/create-user',
    async ({ body, status }) => {
      try {
        const checkUsername = await prisma.user.findUnique({
          where: {
            username: body.username,
          },
        })
        if (checkUsername) {
          return status(400, { error: 'username already taken' })
        }

        const checkEmail = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        })
        if (checkEmail) {
          return status(400, { error: 'email already taken' })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)
        const user = await prisma.user.create({
          data: {
            username: body.username,
            email: body.email,
            password: hashedPassword,
            roles: body.roles,
          },
        })

        return status(201, user.id)
      } catch (error) {
        console.error('auth signup: ', error)
        return status(500, { error: 'something went wrong when creating user' })
      }
    },
    {
      body: t.Object({
        username: usernameValidation,
        email: emailValidation,
        password: passwordValidation,
        roles: roleValidation,
      }),
    },
  )
  .get('/users/:id', async ({ params, status }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: params.id },
        omit: { password: true },
      })
      if (!user) {
        return status(404, 'user not found')
      }
      return status(200, user)
    } catch (error) {
      console.error('users id', error)
      return status(500, 'something went wrong when trying to get users by id')
    }
  })
  .get('users/search', async ({ query, status }) => {
    const { q } = query
    if (!q || q.trim().length < 3) {
      return status(400, 'search query must be at least 3 characters long')
    }

    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
            { id: { contains: q, mode: 'insensitive' } },
          ],
        },
        omit: { password: true },
        take: 20,
      })

      return status(200, users)
    } catch (error) {
      console.error('users search', error)
      return status(500, 'something went wrong when searching for users')
    }
  })
  .patch(
    '/users/:id',
    async ({ params, body, status }) => {
      return update({ id: params.id, body, status })
    },
    {
      body: t.Object({
        username: t.Optional(usernameValidation),
        email: t.Optional(emailValidation),
      }),
    },
  )
  .delete('/users/:id', async ({ currentUser, status }) => {
    return deleteUser({ id: currentUser.id, status })
  })

export const userRouter = new Elysia().use(user).use(admin)
