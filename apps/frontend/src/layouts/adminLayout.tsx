import { Outlet } from 'react-router'
import { SideBar } from '../components/admin/sideBar'

export const AdminLayout = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <Outlet />
    </div>
  )
}
