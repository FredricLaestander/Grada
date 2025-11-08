import { Menu } from 'lucide-react'
import { Button } from './button'
import { Logo } from './logo'
import { useUser } from '../hooks/useUser'

export const Header = () => {
  const { data: user } = useUser()

  return (
    <header className="border-grada-blue-500 fixed inset-x-0 top-0 z-10 flex h-20 w-full items-center justify-center border-b-2 bg-gray-950 p-4">
      <div className="flex w-full max-w-6xl justify-between">
        <div className="flex items-center gap-8">
          <Logo />

          <nav className="hidden gap-4 sm:flex">
            <a
              href="/courses"
              className="decoration-grada-blue-500 hover:underline"
            >
              Courses
            </a>
            <a href="/" className="decoration-grada-blue-500 hover:underline">
              Practice
            </a>
          </nav>
        </div>
        <div>
          {!user && (
            <Button as="a" href="/auth/log-in" classname="hidden sm:flex">
              Log in
            </Button>
          )}
          <button className="block sm:hidden">
            <Menu
              size={'2rem'}
              className="text-grada-blue-500 cursor-pointer"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
