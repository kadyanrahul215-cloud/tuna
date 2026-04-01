import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'

export default function TopAppBar({ onToggleSidebar, sidebarCollapsed }) {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: '64px',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
    }}>
      {/* Left: Logo + Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '0.75rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
            transition: 'all 0.2s ease',
          }}
          className="sidebar-toggle-btn"
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-100)'
            e.currentTarget.style.color = 'var(--color-text)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'var(--color-text-secondary)'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
            {sidebarCollapsed ? 'menu' : 'menu_open'}
          </span>
        </button>

        <div
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '0.625rem',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.875rem',
            letterSpacing: '-0.02em',
          }}>
            T
          </div>
          <span style={{
            fontWeight: 700,
            fontSize: '1.125rem',
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
          }}>
            TUNA
          </span>
        </div>
      </div>

      {/* Right: User actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          aria-label="Notifications"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '0.75rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-100)'
            e.currentTarget.style.color = 'var(--color-text)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'var(--color-text-secondary)'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            border: '2px solid var(--color-surface)',
          }} />
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '0.75rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-100)'
            e.currentTarget.style.color = 'var(--color-text)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'var(--color-text-secondary)'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <div
          onClick={() => navigate('/profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.375rem 0.75rem 0.375rem 0.375rem',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            border: '1px solid var(--color-border)',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-100)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.75rem',
          }}>
            {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span style={{
            fontWeight: 600,
            fontSize: '0.8125rem',
            color: 'var(--color-text)',
            maxWidth: '120px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {user?.full_name?.split(' ')[0] || 'User'}
          </span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-toggle-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
