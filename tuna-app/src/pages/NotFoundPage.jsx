import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem', textAlign: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f0f9ff 100%)',
    }}>
      <div style={{ animation: 'scale-in 0.4s ease', maxWidth: '480px' }}>
        {/* 404 Number */}
        <div style={{
          fontSize: 'clamp(6rem, 20vw, 10rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #0ea5e9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1.5rem',
        }}>
          404
        </div>

        <h1 style={{
          fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}>
          Page not found
        </h1>
        <p style={{
          color: 'var(--color-text-secondary)', fontSize: '0.9375rem',
          marginBottom: '2rem', lineHeight: 1.6,
        }}>
          Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
              fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>home</span>
            Go home
          </Link>
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
              border: '1.5px solid var(--color-border)', backgroundColor: '#fff',
              color: 'var(--color-text)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#4f46e5'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>dashboard</span>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
