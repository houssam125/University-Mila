import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import RouteError from '@/pages/RouteError'

// The home page ships with the first download; other pages load when they are first opened
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', lazy: page(() => import('@/pages/About')) },
      { path: 'abdelhafid-boussouf', lazy: page(() => import('@/pages/BoussoufPage')) },
      { path: 'contact', lazy: page(() => import('@/pages/Contact')) },
      { path: 'events', lazy: page(() => import('@/pages/EventsPage')) },
      { path: 'university/structure', lazy: page(() => import('@/pages/StructurePage')) },
      { path: 'research-labs', lazy: page(() => import('@/pages/ResearchLabsPage')) },
      { path: 'scholarships', lazy: page(() => import('@/pages/ScholarshipsPage')) },
      { path: 'clubs', lazy: page(() => import('@/pages/ClubsPage')) },
      { path: 'clubs/:id', lazy: page(() => import('@/pages/ClubProfilePage')) },
      { path: 'housing', lazy: page(() => import('@/pages/HousingPage')) },
      { path: 'housing/:id', lazy: page(() => import('@/pages/HousingProfilePage')) },
      { path: 'teachers', lazy: page(() => import('@/pages/TeachersPage')) },
      { path: 'events/:slug', lazy: page(() => import('@/pages/EventDetailPage')) },
      { path: 'people/:slug', lazy: page(() => import('@/pages/PersonPage')) },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
