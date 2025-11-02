import { createBrowserRouter } from 'react-router'
import { Home } from './pages/home'
import { SignUp } from './pages/signUp'
import { LogIn } from './pages/logIn'
import { Courses } from './pages/courses'
import { Course } from './pages/course'
import { ProtectedRoute } from './components/middleware/protectedRoute'
import { AdminLayout } from './layouts/adminLayout'
import { Admin } from './pages/admin/admin'
import { Layout } from './layouts/layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
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
        element: <Courses />,
      },
      {
        path: '/courses/:id',
        element: (
          <ProtectedRoute>
            <Course />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
    ],
  },
])
