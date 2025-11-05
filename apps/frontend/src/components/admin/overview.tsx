import { useQuery } from '@tanstack/react-query'
import { Info } from './info'
import { getUserById } from '../../lib/request'
import { useParams } from 'react-router'

export const Overview = () => {
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserById(id!),
  })

  if (!data) {
    return <p>nono user found</p>
  }

  return (
    <section className="flex w-full gap-20">
      <div className="flex w-full flex-col gap-8">
        <Info title="Id:" value={data.id} />
        <Info title="Username:" value={data.username} />
        <Info title="Registered email:" value={data.email} />
        <Info title="Role:" value={data.roles.join(', ')} />
      </div>
      <div className="flex w-full flex-col gap-8">
        <Info title="Created at:" value={data.createdAt} />
        <Info title="Last updated at:" value={data.updatedAt} />
      </div>
    </section>
  )
}
