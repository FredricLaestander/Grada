import { useQuery } from '@tanstack/react-query'
import { getUser } from '../lib/request'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
}
