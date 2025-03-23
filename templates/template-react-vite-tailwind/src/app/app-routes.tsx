import { useRoutes } from 'react-router'
import { RouteHome } from './routes/route-home.tsx'
import { RouteAbout } from './routes/route-about.tsx'

export function AppRoutes() {
  return useRoutes([
    { path: '/', element: <RouteHome /> },
    { path: '/about', element: <RouteAbout /> },
  ])
}
