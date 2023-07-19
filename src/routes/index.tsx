import { lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'

export const ROUTES = {
  HOME: '/',
}

const Home = lazy(() => import('@/pages/home'))

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '*', element: <Navigate to={ROUTES.HOME} /> },
])
