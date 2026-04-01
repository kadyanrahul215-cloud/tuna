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
    { id: 'developer', label: 'Developer', sub: 'API & Infrastructure', icon: 'terminal', color: '#4f46e5', bg: '#eef2ff' },
    { id: 'staff', label: 'Staff', sub: 'Operations & Tasks', icon: 'badge', color: '#0ea5e9', bg: '#f0f9ff' },
    { id: 'management', label: 'Management', sub: 'Insights & Strategy', icon: 'analytics', color: '#f59e0b', bg: '#fffbeb' },
    { id: 'customer', label: 'Customer', sub: 'Account & Services', icon: 'person', color: '#10b981', bg: '#ecfdf5' },
  ]

  const inputBase = (hasError) => ({
    width: '100%',
    padding: '0.8125rem 1rem 0.8125rem 2.75rem',
    borderRadius: '0.875rem',
    border: `1.5px solid ${hasError ? '#ef4444' : '#e2e8f0'}`,
    fontSize: '0.875rem',
    backgroundColor: '#f8fafc',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    color: '#0f172a',
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
      background: '#f8fafc',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>

      {/* ========== LEFT COLUMN — Branding ========== */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(2rem, 4vw, 4rem)',
        maxWidth: '600px',
        animation: 'slide-right 0.6s ease',
      }} className="auth-left">
        {/* Logo + Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '0.875rem',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: '1.125rem',
              boxShadow: '0 8px 20px rgba(79, 70, 229, 0.25)',
            }}>T</div>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
            background: 'linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            TUNA Business
          </h1>
          <p style={{
            fontSize: '1.0625rem',
            color: '#64748b',
            lineHeight: 1.6,
            maxWidth: '380px',
          }}>
            Seamless architectural intelligence for the modern enterprise ecosystem.
          </p>
        </div>

        {/* Hero Image */}
        <div style={{
          position: 'relative',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          aspectRatio: '16/10',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
          marginBottom: '1.5rem',
        }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
            alt="Modern office"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 6s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, transparent 60%)',
          }} />
        </div>

        {/* Enterprise badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.875rem 1.25rem',
          borderRadius: '1rem',
          backgroundColor: '#fff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          maxWidth: 'fit-content',
        }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="material-symbols-outlined filled" style={{ fontSize: '18px', color: '#fff' }}>verified</span>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a' }}>Enterprise Security</p>
            <p style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>Role-based access control with biometric support.</p>
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
            maxWidth: '480px',
            backgroundColor: '#fff',
            borderRadius: '1.5rem',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
            animation: 'scale-in 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{
              fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em',
              marginBottom: '0.375rem', color: '#0f172a',
            }}>
              {isRegister ? 'Create Workspace' : 'Select Your Portal'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
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
                <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
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
                {errors.fullName && <p style={{ marginTop: '0.25rem', fontSize: '0.6875rem', color: '#ef4444', fontWeight: 500 }}>{errors.fullName}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
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
              {errors.email && <p style={{ marginTop: '0.25rem', fontSize: '0.6875rem', color: '#ef4444', fontWeight: 500 }}>{errors.email}</p>}
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
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.875rem 0.875rem',
                        borderRadius: '0.875rem',
                        border: `1.5px solid ${active ? role.color : '#e2e8f0'}`,
                        backgroundColor: active ? role.bg : '#fff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: active ? 'scale(1.01)' : 'scale(1)',
                        boxShadow: active ? `0 4px 12px ${role.color}20` : 'none',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          e.currentTarget.style.borderColor = role.color + '60'
                          e.currentTarget.style.backgroundColor = role.bg
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          e.currentTarget.style.borderColor = '#e2e8f0'
                          e.currentTarget.style.backgroundColor = '#fff'
                        }
                      }}
                    >
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '0.625rem',
                        backgroundColor: active ? role.color + '18' : '#f1f5f9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.25s ease', flexShrink: 0,
                      }}>
                        <span className="material-symbols-outlined filled" style={{
                          fontSize: '18px',
                          color: active ? role.color : '#94a3b8',
                          transition: 'color 0.25s ease',
                        }}>{role.icon}</span>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{
                          fontSize: '0.8125rem', fontWeight: 700,
                          color: active ? '#0f172a' : '#475569',
                          transition: 'color 0.2s',
                        }}>{role.label}</p>
                        <p style={{
                          fontSize: '0.5625rem', fontWeight: 600,
                          color: '#94a3b8',
                          textTransform: 'uppercase', letterSpacing: '0.06em',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
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
                  background: isLoading ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: '#fff', fontSize: '0.875rem', fontWeight: 700,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isLoading ? 'none' : '0 6px 20px rgba(79, 70, 229, 0.25)',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.35)' }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.25)' }}
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
                  backgroundColor: '#f1f5f9',
                  color: '#475569', fontSize: '0.875rem', fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e2e8f0' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f1f5f9' }}
              >
                SSO Login
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>link</span>
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
