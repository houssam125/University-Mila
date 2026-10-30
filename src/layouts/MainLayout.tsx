import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function MainLayout() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* New pages open at the top; going back returns to where you were */}
      <ScrollRestoration />
    </div>
  )
}
