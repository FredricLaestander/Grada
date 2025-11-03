import { Outlet } from 'react-router'
import { Header } from '../components/header'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex w-full justify-center">
        <Outlet />
      </main>
    </>
  )
}
