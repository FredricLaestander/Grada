import { ChevronLeft } from 'lucide-react'
import { Button } from '../../components/button'
import { Tabs } from '../../components/admin/tabs'
import { useState } from 'react'
import { Overview } from '../../components/admin/overview'
import { Edit } from '../../components/admin/edit'
import { getUserById } from '../../lib/request'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export const AdminUser = () => {
  const { id } = useParams()

  const [tab, setTab] = useState<'overview' | 'edit'>('overview')
  const { data, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserById(id!),
  })

  if (!data) {
    return <p>nono user found</p>
  }

  const tabMap = {
    overview: <Overview user={data} />,
    edit: (
      <Edit
        onCancel={() => {
          setTab('overview')
        }}
        user={data}
        onSuccess={() => {
          refetch()
          setTab('overview')
        }}
      />
    ),
  }

  return (
    <div className="h-dvh w-full px-8 pt-20 pb-8">
      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full items-center justify-between">
          <Button
            as="a"
            href="/admin/users"
            icon={ChevronLeft}
            variant="secondary"
          >
            Users
          </Button>

          <div>
            <Tabs
              onTabClick={(tab) => {
                setTab(tab)
              }}
              activeTab={tab}
            />
          </div>
        </div>
        <main>{tabMap[tab]}</main>
      </div>
    </div>
  )
}
