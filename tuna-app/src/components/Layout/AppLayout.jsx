import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import TopAppBar from './TopAppBar'

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('tuna_sidebar_collapsed')
    return saved === 'true'
  })

  const toggleSidebar = () => {
    setCollapsed(prev => {
      localStorage.setItem('tuna_sidebar_collapsed', String(!prev))
      return !prev
    })
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <TopAppBar onToggleSidebar={toggleSidebar} sidebarCollapsed={collapsed} />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
        <main style={{
          flex: 1,
          minWidth: 0,
          padding: '1.5rem',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          animation: 'fade-in 0.3s ease',
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}
