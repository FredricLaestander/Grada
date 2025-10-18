import { Elysia } from 'elysia'
// import { adminPlugin } from '../middleware/admin'
import { prisma } from '../../prisma/prisma'

// const courses = new Elysia().use(adminPlugin).post(
//   '/courses',
//   async ({ currentUser, body, status }) => {
//     try {
//       const checkCourseName = await prisma.course.findFirst({
//         where: {
//           name: body.name,
//           description: body.description,
//         },
//       })
//     } catch (error) {
//       console.log('course new', error)
//       return status(500, 'something went wrong when trying to create course')
//     }
//   },
//   {
//     body: t.Object({
//       name: t.String(),
//       description: t.Optional(t.String()),
//       tags: t.String([]),
//     }),
//   },
// )

const all = new Elysia().get('/courses', async ({ status }) => {
  try {
    const courses = await prisma.course.findMany()

    if (courses.length === 0) {
      return status(404, 'no courses found')
    }

    return status(200, courses)
  } catch (error) {
    console.log('courses: ', error)
    return status(500, 'something went wrong when trying to get all courses')
  }
})

export const courseRouter = new Elysia().use(all) //.use(courses)
