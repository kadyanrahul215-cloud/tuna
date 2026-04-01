import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/dashboard', label: 'HOME', icon: 'home' },
  { path: '/procurement', label: 'PROCURE', icon: 'inventory_2' },
  { path: '/support', label: 'SUPPORT', icon: 'support_agent' },
  { path: '/profile', label: 'PROFILE', icon: 'person' },
]

export default function BottomNav() {
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!isMobile) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'var(--color-surface)',
      borderRadius: '9999px',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px var(--color-border)',
      zIndex: 50,
    }}>
      {navItems.map(item => {
        const isActive = location.pathname === item.path
        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={{
              padding: '0.625rem 1rem',
              borderRadius: '9999px',
              backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
              color: isActive ? '#fff' : 'var(--color-text-secondary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.2s ease',
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
            {/* We can hide the text on very small screens, or render it based on active state */}
            <span style={{ 
              fontSize: '0.6875rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em' 
            }}>
              {item.label}
            </span>
          </NavLink>
        )
      })}
    </div>
  )
}
