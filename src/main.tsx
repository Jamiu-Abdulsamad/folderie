import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import GuestLayout from './layouts/guest-layout'
import GuestIndex from './routes/guest/GuestIndex'
import About from './routes/guest/about'
import ProtectedLayout from './layouts/protected-layout'
import PublicRoute from './layouts/publicRoutes';
import Dashboard from './routes/protected/document'
import Register from './routes/guest/register'
import SignIn from './routes/guest/signin'
import ErrorPage from './routes/error-page'
import Welcome from './components/pages/Welcome'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <GuestLayout />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,

    children: [
      { path: '/', element: <GuestIndex /> },
      { path: '/about', element: <About /> },
      { path: '/register', element: <Register /> },
      { path: '/signin', element: <SignIn /> },
    ],
  },
  {
    path: '/app',
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Navigate to={'dashboard'} />,
      },
      {
        path: 'documents',
        element: <Dashboard />,
      },
      {
        path: 'welcome',
        element: <Welcome />,
      },
      {
        path: '*',
        element:
          <ErrorPage />

      }
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
