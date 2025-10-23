import { Menu } from 'lucide-react'
import { Button } from './button'
import { Logo } from './logo'

export const Header = () => {
  return (
    <header className="border-grada-blue-500 fixed top-0 z-10 flex h-20 w-full items-center justify-center border-b-2 bg-gray-950 p-4">
      <div className="flex w-full max-w-6xl justify-between">
        <div className="flex items-center gap-8">
          <Logo />

          <div className="hidden gap-4 sm:flex">
            <a
              href="/"
              className="decoration-grada-blue-500 underline-offset-4 hover:underline"
            >
              Courses
            </a>
            <a
              href="/"
              className="decoration-grada-blue-500 underline-offset-4 hover:underline"
            >
              Practice
            </a>
          </div>
        </div>
        <div>
          <Button as="a" href="/auth/sign-up" classname="hidden sm:flex">
            Get started
          </Button>
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
