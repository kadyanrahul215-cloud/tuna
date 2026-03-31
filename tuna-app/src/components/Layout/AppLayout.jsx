import TopAppBar from './TopAppBar'
import BottomNavBar from './BottomNavBar'
import Sidebar from './Sidebar'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <TopAppBar />
      <Sidebar />
      <main className="pt-20 pb-28 md:pb-8 px-4 md:px-8 md:ml-64 lg:ml-72 max-w-6xl mx-auto md:mx-0">
        {children}
      </main>
      <BottomNavBar />
    </div>
  )
}
