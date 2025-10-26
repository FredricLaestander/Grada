import { createBrowserRouter } from 'react-router'
import { Home } from './pages/home'
import { SignUp } from './pages/signUp'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth/sign-up',
    element: <SignUp />,
  },
])
