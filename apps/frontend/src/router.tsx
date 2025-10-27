import { createBrowserRouter } from 'react-router'
import { Home } from './pages/home'
import { SignUp } from './pages/signUp'
import { LogIn } from './pages/logIn'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth/sign-up',
    element: <SignUp />,
  },
  {
    path: '/auth/log-in',
    element: <LogIn />,
  },
  {
    path: '/courses',
    element: <Home />,
  },
])
