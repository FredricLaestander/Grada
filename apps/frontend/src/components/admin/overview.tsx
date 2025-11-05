import { Info } from './info'
import type { User } from '../../types/data'

export const Overview = ({ user }: { user: User }) => {
  return (
    <section className="flex w-full gap-20">
      <div className="flex w-full flex-col gap-8">
        <Info title="Id:" value={user.id} />
        <Info title="Username:" value={user.username} />
        <Info title="Registered email:" value={user.email} />
        <Info title="Role:" value={user.roles.join(', ')} />
      </div>
      <div className="flex w-full flex-col gap-8">
        <Info title="Created at:" value={user.createdAt} />
        <Info title="Last updated at:" value={user.updatedAt} />
      </div>
    </section>
  )
}
