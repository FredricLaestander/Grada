import type { Course, Lesson, User } from '../types/data'
import { backend } from './clients/backend'

export const getUser = async () => {
  try {
    const response = await backend.get<User>('/users/me')
    return response.data
  } catch {
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

export const getCourseById = async (id: Course['id']) => {
  try {
    const response = await backend.get<Course>(`/courses/${id}`)
    return response.data
  } catch (error) {
    console.error('getCourseById: ', { error })
    return null
  }
}
