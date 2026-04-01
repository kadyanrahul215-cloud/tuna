import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/procurement', label: 'Procurement', icon: 'inventory_2' },
  { path: '/support', label: 'Support', icon: 'support_agent' },
  { path: '/hr', label: 'HR Portal', icon: 'group' },
  { path: '/profile', label: 'Profile', icon: 'person' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const sidebarWidth = collapsed ? '72px' : '260px'

  const sidebarStyles = {
    position: isMobile ? 'fixed' : 'sticky',
    top: isMobile ? 0 : '64px',
    left: 0,
    height: isMobile ? '100dvh' : 'calc(100dvh - 64px)',
    width: isMobile ? '280px' : sidebarWidth,
    backgroundColor: '#ffffff',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: isMobile ? 1000 : 40,
    transform: isMobile ? (mobileOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
    overflowX: 'hidden',
    overflowY: 'auto',
    flexShrink: 0,
  }

  const overlayStyles = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 999,
    opacity: mobileOpen ? 1 : 0,
    pointerEvents: mobileOpen ? 'auto' : 'none',
    transition: 'opacity 0.3s ease',
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && <div style={overlayStyles} onClick={() => setMobileOpen(false)} />}

      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 998,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 8px 25px rgba(79, 70, 229, 0.35)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      )}

      <aside style={sidebarStyles} className="hide-scrollbar">
        {/* User Info */}
        <div style={{
          padding: collapsed && !isMobile ? '1.25rem 0.75rem' : '1.5rem 1.25rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          minHeight: '80px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.875rem',
            flexShrink: 0,
          }}>
            {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          {(!collapsed || isMobile) && (
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.full_name || 'User'}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'user@example.com'}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed && !isMobile ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: collapsed && !isMobile ? '0.75rem' : '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#4f46e5' : 'var(--color-text-secondary)',
                  backgroundColor: isActive ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-100)'
                    e.currentTarget.style.color = 'var(--color-text)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                  }
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '60%',
                    borderRadius: '0 4px 4px 0',
                    backgroundColor: '#4f46e5',
                  }} />
                )}
                <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`} style={{ fontSize: '20px', flexShrink: 0 }}>
                  {item.icon}
                </span>
                {(!collapsed || isMobile) && <span>{item.label}</span>}
              </NavLink>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: collapsed && !isMobile ? '0.75rem' : '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#ef4444',
              width: '100%',
              justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            title={collapsed && !isMobile ? 'Logout' : undefined}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
            {(!collapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
