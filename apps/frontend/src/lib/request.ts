import axios from 'axios'
import type { Course, User } from '../types/data'
import { backend } from './clients/backend'

export const getUser = async (status) => {
  try {
    const response = await backend.get<User>('/users/me')
    return response.data
  } catch (error) {
    console.error('getUser: ', { error })
    return status(500, {
      error: 'something went wrong when trying to fetch ccurrent user',
    })
  }
}

export const getCourses = async (status) => {
  try {
    const response = await axios.get<Course[]>(
      `${import.meta.env.VITE_BACKEND_URL}/courses`,
    )
    return response.data
  } catch (error) {
    console.error('getUser: ', { error })
    return status(500, {
      error: 'something went wrong when trying to fetch ccurrent user',
    })
  }
}
