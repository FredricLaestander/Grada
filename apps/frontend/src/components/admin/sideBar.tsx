import { SidebarLink } from './sidebarLink'

export const SideBar = () => {
  return (
    <nav className="border-grada-blue-500 flex h-dvh w-60 flex-col gap-2 border-r-2 bg-gray-950 px-3 py-20">
      <SidebarLink href="/admin">User</SidebarLink>
      <SidebarLink href="/admin">Courses</SidebarLink>
      <SidebarLink href="/admin">Create Course</SidebarLink>
    </nav>
  )
}
