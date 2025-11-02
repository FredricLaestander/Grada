import { Outlet } from 'react-router'
import { Header } from '../components/header'

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
