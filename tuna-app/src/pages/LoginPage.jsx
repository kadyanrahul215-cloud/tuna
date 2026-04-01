import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export default function LoginPage() {
  const location = useLocation()
  const isRegisterRoute = location.pathname === '/register'
  const [isRegister, setIsRegister] = useState(isRegisterRoute)
  const [selectedRole, setSelectedRole] = useState('management')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formKey, setFormKey] = useState(0)

  const { login, register } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    setIsRegister(location.pathname === '/register')
  }, [location.pathname])

  const toggleMode = () => {
    setErrors({})
    setFormKey(k => k + 1)
    const next = !isRegister
    setIsRegister(next)
    navigate(next ? '/register' : '/login', { replace: true })
  }

  const validate = () => {
    const e = {}
    if (isRegister && (!fullName || fullName.trim().length < 2)) e.fullName = 'Name must be at least 2 characters'
    if (!email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email format'
    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'At least 6 characters'
    if (isRegister && password !== confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setErrors({})

    let result
    if (isRegister) {
      result = await register({ fullName: fullName.trim(), email, password, role: selectedRole })
    } else {
      result = await login({ email, password })
    }
    setIsLoading(false)

    if (result.success) {
      toast.success(isRegister ? 'Account created! Welcome aboard.' : 'Welcome back!')
      setTimeout(() => navigate('/dashboard'), 300)
    } else {
      setErrors({ form: result.error })
      toast.error(result.error)
    }
  }

  const roles = [
    { id: 'developer', label: 'Developer', sub: 'API & INFRASTRUCTURE', icon: 'terminal', color: 'var(--color-primary)', bg: 'var(--color-primary-50)' },
    { id: 'staff', label: 'Staff', sub: 'OPERATIONS & TASKS', icon: 'badge', color: 'var(--color-primary)', bg: 'var(--color-primary-50)' },
    { id: 'management', label: 'Management', sub: 'INSIGHTS & STRATEGY', icon: 'analytics', color: '#9a3412', bg: '#ffedd5' },
    { id: 'customer', label: 'Customer', sub: 'ACCOUNT & SERVICES', icon: 'person', color: '#64748b', bg: '#f1f5f9' },
  ]

  const inputBase = (hasError) => ({
    width: '100%',
    padding: '0.8125rem 1rem 0.8125rem 2.75rem',
    borderRadius: '0.875rem',
    border: `1.5px solid ${hasError ? 'var(--color-error)' : 'var(--color-border)'}`,
    fontSize: '0.875rem',
    backgroundColor: 'var(--color-surface-50)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'var(--color-text)',
    fontFamily: 'inherit',
    outline: 'none',
  })

  const iconInInput = {
    position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
    fontSize: '18px', color: '#94a3b8', transition: 'color 0.2s',
  }

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      backgroundColor: 'var(--color-bg)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>

      {/* ========== LEFT COLUMN — Branding ========== */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(2rem, 5vw, 6rem)',
        maxWidth: '680px',
        animation: 'fade-in 0.6s ease',
      }} className="auth-left">
        {/* Logo + Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '0.875rem',
            color: 'var(--color-primary)',
          }}>
            TUNA Business
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--color-text)',
            fontWeight: 500,
            lineHeight: 1.5,
            maxWidth: '420px',
            letterSpacing: '-0.01em',
          }}>
            Seamless architectural intelligence for the modern enterprise ecosystem.
          </p>
        </div>

        {/* Hero Image */}
        <div style={{
          position: 'relative',
          borderRadius: '2rem',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '480px',
          aspectRatio: '16/9',
          boxShadow: '0 25px 50px rgba(0,0,0,0.12)',
          marginBottom: '2rem',
          transform: 'translateZ(0)',
        }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
            alt="Modern office"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 74, 171, 0.1)' }} />
        </div>

        {/* Enterprise badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.875rem',
          padding: '1rem 1.25rem',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-surface)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
          maxWidth: '400px',
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span className="material-symbols-outlined filled" style={{ fontSize: '18px', color: '#fff' }}>verified</span>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: '2px' }}>Enterprise Security</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>Role-based access control with biometric support.</p>
          </div>
        </div>
      </div>

      {/* ========== RIGHT COLUMN — Auth Form ========== */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 3vw, 3rem)',
      }}>
        <div
          key={formKey}
          style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '1.75rem',
            padding: '2.5rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.04), 0 0 0 1px var(--color-border)',
            animation: 'scale-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{
              fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em',
              marginBottom: '0.375rem', color: 'var(--color-text)',
            }}>
              {isRegister ? 'Create Workspace' : 'Select Your Portal'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              {isRegister
                ? 'Set up your enterprise account and choose your role.'
                : 'Choose your designated workspace to proceed.'}
            </p>
          </div>

          {/* Error banner */}
          {errors.form && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1rem', borderRadius: '0.75rem',
              backgroundColor: '#fef2f2', color: '#dc2626',
              fontSize: '0.8125rem', fontWeight: 500, marginBottom: '1.25rem',
              animation: 'slide-down 0.3s ease',
              border: '1px solid #fecaca',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Name (register only) */}
            {isRegister && (
              <div style={{ animation: 'slide-down 0.3s ease' }}>
                <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={iconInInput}>person</span>
                  <input
                    type="text" value={fullName}
                    onChange={e => { setFullName(e.target.value); setErrors(p => ({...p, fullName: ''})) }}
                    placeholder="John Doe"
                    style={inputBase(errors.fullName)}
                    autoComplete="name"
                  />
                </div>
                {errors.fullName && <p style={{ marginTop: '0.25rem', fontSize: '0.6875rem', color: 'var(--color-error)', fontWeight: 500 }}>{errors.fullName}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Corporate Email
              </label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={iconInInput}>mail</span>
                <input
                  type="email" value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})) }}
                  placeholder="name@tunabusiness.com"
                  style={inputBase(errors.email)}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p style={{ marginTop: '0.25rem', fontSize: '0.6875rem', color: 'var(--color-error)', fontWeight: 500 }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Secure Password
              </label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={iconInInput}>lock</span>
                <input
                  type={showPassword ? 'text' : 'password'} value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})) }}
                  placeholder="••••••••"
                  style={{...inputBase(errors.password), paddingRight: '2.75rem', letterSpacing: password && !showPassword ? '0.15em' : 'normal'}}
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#94a3b8', display: 'flex', padding: '0.25rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#4f46e5'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                  aria-label="Toggle password"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
              {errors.password && <p style={{ marginTop: '0.25rem', fontSize: '0.6875rem', color: '#ef4444', fontWeight: 500 }}>{errors.password}</p>}
            </div>

            {/* Confirm Password (register only) */}
            {isRegister && (
              <div style={{ animation: 'slide-down 0.3s ease' }}>
                <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={iconInInput}>lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'} value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({...p, confirmPassword: ''})) }}
                    placeholder="••••••••"
                    style={inputBase(errors.confirmPassword)}
                    autoComplete="new-password"
                  />
                </div>
                {errors.confirmPassword && <p style={{ marginTop: '0.25rem', fontSize: '0.6875rem', color: '#ef4444', fontWeight: 500 }}>{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Designated Role
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                {roles.map(role => {
                  const active = selectedRole === role.id
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                        padding: '1.25rem 0.5rem',
                        border: '1px solid var(--color-border)',
                        borderLeftWidth: '4px',
                        borderLeftColor: role.color,
                        backgroundColor: active ? 'var(--color-surface-50)' : 'var(--color-surface)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: active ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: active ? `0 8px 15px ${role.color}15` : 'none',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = 'var(--color-surface-50)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = 'var(--color-surface)'
                        }
                      }}
                    >
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '0.5rem',
                        backgroundColor: role.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease', flexShrink: 0,
                      }}>
                        <span className="material-symbols-outlined filled" style={{
                          fontSize: '20px',
                          color: role.color,
                        }}>{role.icon}</span>
                      </div>
                      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <p style={{
                          fontSize: '0.875rem', fontWeight: 700,
                          color: 'var(--color-text)',
                        }}>{role.label}</p>
                        <p style={{
                          fontSize: '0.5625rem', fontWeight: 600,
                          color: 'var(--color-text-tertiary)',
                          textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>{role.sub}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Remember + Forgot (login only) */}
            {!isRegister && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                  <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                    style={{ width: '0.875rem', height: '0.875rem', accentColor: '#4f46e5', borderRadius: '4px' }}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: '0.5rem' }}>
              {/* Primary CTA */}
              <button
                type="submit" disabled={isLoading}
                style={{
                  width: '100%', height: '48px', borderRadius: '9999px', border: 'none',
                  backgroundColor: isLoading ? 'var(--color-surface-400)' : 'var(--color-primary)',
                  color: '#fff', fontSize: '0.875rem', fontWeight: 700,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isLoading ? 'none' : '0 6px 20px rgba(26, 86, 219, 0.35)',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(26, 86, 219, 0.45)' }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 86, 219, 0.35)' }}
              >
                {isLoading ? (
                  <>
                    <div style={{
                      width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite',
                    }} />
                    {isRegister ? 'Creating Account...' : 'Authenticating...'}
                  </>
                ) : (
                  <>
                    {isRegister ? 'Create Account' : 'Continue to Workspace'}
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                  </>
                )}
              </button>

              {/* SSO Button */}
              <button
                type="button"
                style={{
                  width: '100%', height: '48px', borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: 'var(--color-surface-200)',
                  color: 'var(--color-text)', fontSize: '0.875rem', fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-300)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-200)' }}
              >
                SSO Login
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>vpn_key</span>
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: '1.5rem', paddingTop: '1rem',
            borderTop: '1px solid #f1f5f9',
            fontSize: '0.75rem', color: '#94a3b8',
          }}>
            <button
              onClick={toggleMode}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#4f46e5', fontWeight: 600, fontSize: '0.75rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
            </button>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        textAlign: 'center', padding: '0.75rem',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontSize: '0.5625rem', fontWeight: 600,
          color: '#cbd5e1',
          textTransform: 'uppercase', letterSpacing: '0.15em',
        }}>
          © {new Date().getFullYear()} TUNA BUSINESS SOLUTIONS. ENGINEERED FOR EXCELLENCE.
        </p>
      </div>

      {/* Responsive styles */}
      <style>{`
        .auth-left {
          display: flex !important;
        }
        @media (max-width: 900px) {
          .auth-left { display: none !important; }
        }
      `}</style>
    </div>
  )
}
