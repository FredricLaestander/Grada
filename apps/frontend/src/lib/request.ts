import type { Course, Lesson, User } from '../types/data'
import { backend } from './clients/backend'

export const getUser = async () => {
  try {
    const response = await backend.get<User>('/users/me')
    return response.data
  } catch (error) {
    console.error('getUser: ', { error })
    return null
  }
}

export const getCourses = async () => {
  try {
    const response = await backend.get<Course[]>('/courses')
    return response.data
  } catch (error) {
    console.error('getCourses: ', { error })
    return []
  }
}

export const getCourseById = async () => {
  try {
    const response = await backend.get<Lesson[]>('/courses/:id')
    return response.data
  } catch (error) {
    console.error('getCourses: ', { error })
    return []
  }
}
