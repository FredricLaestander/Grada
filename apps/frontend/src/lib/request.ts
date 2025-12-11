import axios from 'axios'
import type { Course, User } from '../types/data'
import { backend } from './clients/backend'

export const refreshTokens = async () => {
  // this needs to be it's own client to avoid an infinite loop with the interceptor
  try {
    await axios
      .create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
      })
      .get('/auth/refresh-token')
  } catch (error) {
    console.error('refreshTokens: ', { error })
  }
}

export const getUser = async () => {
  try {
    const response = await backend.get<User>('/users/me')
    return response.data
  } catch {
    return null
  }
}

export const getUserById = async (id: User['id']) => {
  try {
    const response = await backend.get<User>(`/users/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('getUserById: ', { error })
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

export const deleteUserById = async (id: User['id']) => {
  try {
    await backend.delete(`/users/${id}`)
  } catch (error) {
    console.error('deleteUserById: ', { error })
    return null
  }
}
