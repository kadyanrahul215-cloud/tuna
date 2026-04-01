import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('management')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const { register } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!fullName || fullName.trim().length < 2) e.fullName = 'Name must be at least 2 characters'
    if (!email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email format'
    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'Must be at least 6 characters'
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setErrors({})

    const result = await register({ fullName: fullName.trim(), email, password, role: selectedRole })
    setIsLoading(false)

    if (result.success) {
      toast.success('Account created! Redirecting to dashboard...')
      setTimeout(() => navigate('/dashboard'), 400)
    } else {
      setErrors({ form: result.error })
      toast.error(result.error)
    }
  }

  const inputStyle = (hasError) => ({
    width: '100%', padding: '0.75rem 0.875rem 0.75rem 2.75rem',
    borderRadius: '0.75rem', border: `1.5px solid ${hasError ? '#ef4444' : 'var(--color-border)'}`,
    fontSize: '0.875rem', backgroundColor: 'var(--color-surface-50)',
    transition: 'all 0.2s ease', color: 'var(--color-text)',
  })

  const labelStyle = {
    display: 'block', fontSize: '0.8125rem', fontWeight: 600,
    color: 'var(--color-text-secondary)', marginBottom: '0.5rem',
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f0f9ff 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%', width: '500px', height: '500px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '440px', animation: 'scale-in 0.4s ease', position: 'relative', zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '1rem',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1rem',
            boxShadow: '0 8px 25px rgba(79, 70, 229, 0.25)',
          }}>T</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Create your account
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Get started with TUNA Business
          </p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: '#fff', borderRadius: '1.25rem', padding: '2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
        }}>
          {errors.form && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1rem', borderRadius: '0.75rem',
              backgroundColor: 'var(--color-error-bg)', color: '#dc2626',
              fontSize: '0.8125rem', fontWeight: 500, marginBottom: '1.25rem',
              animation: 'slide-down 0.3s ease',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Full Name */}
            <div>
              <label style={labelStyle}>Full name</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '18px', color: 'var(--color-text-tertiary)',
                }}>person</span>
                <input
                  id="register-name"
                  type="text"
                  value={fullName}
                  onChange={e => { setFullName(e.target.value); setErrors(p => ({...p, fullName: ''})) }}
                  placeholder="John Doe"
                  style={inputStyle(errors.fullName)}
                />
              </div>
              {errors.fullName && <p style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email address</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '18px', color: 'var(--color-text-tertiary)',
                }}>mail</span>
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})) }}
                  placeholder="you@company.com"
                  style={inputStyle(errors.email)}
                />
              </div>
              {errors.email && <p style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '18px', color: 'var(--color-text-tertiary)',
                }}>lock</span>
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})) }}
                  placeholder="••••••••"
                  style={{...inputStyle(errors.password), paddingRight: '2.75rem'}}
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-text-tertiary)', display: 'flex', padding: '0.25rem',
                  }}
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
              {errors.password && <p style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={labelStyle}>Confirm password</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '18px', color: 'var(--color-text-tertiary)',
                }}>lock</span>
                <input
                  id="register-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({...p, confirmPassword: ''})) }}
                  placeholder="••••••••"
                  style={inputStyle(errors.confirmPassword)}
                />
              </div>
              {errors.confirmPassword && <p style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.confirmPassword}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label style={labelStyle}>Your role</label>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem',
              }}>
                {[
                  { id: 'developer', label: 'Developer', sub: 'API & Infra', icon: 'terminal', color: '#4f46e5' },
                  { id: 'staff', label: 'Staff', sub: 'Ops & Tasks', icon: 'badge', color: '#0ea5e9' },
                  { id: 'management', label: 'Management', sub: 'Strategy', icon: 'analytics', color: '#f59e0b' },
                  { id: 'customer', label: 'Customer', sub: 'Account', icon: 'person', color: '#10b981' },
                ].map(role => {
                  const isActive = selectedRole === role.id
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.875rem', borderRadius: '0.75rem',
                        border: `1.5px solid ${isActive ? role.color : 'var(--color-border)'}`,
                        backgroundColor: isActive ? `${role.color}08` : '#fff',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '0.625rem',
                        backgroundColor: isActive ? `${role.color}15` : 'var(--color-surface-100)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease', flexShrink: 0,
                      }}>
                        <span className="material-symbols-outlined filled" style={{
                          fontSize: '18px', color: isActive ? role.color : 'var(--color-text-secondary)',
                        }}>{role.icon}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)' }}>{role.label}</p>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)' }}>{role.sub}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit" disabled={isLoading}
              style={{
                width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none',
                background: isLoading ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                color: '#fff', fontSize: '0.9375rem', fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'all 0.2s ease', boxShadow: isLoading ? 'none' : '0 4px 15px rgba(79, 70, 229, 0.3)',
              }}
              onMouseEnter={e => { if (!isLoading) e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite',
                  }} />
                  Creating account...
                </>
              ) : 'Create account'}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0',
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              flex: 1, padding: '0.75rem', borderRadius: '0.75rem',
              border: '1.5px solid var(--color-border)', backgroundColor: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)', transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#4f46e5'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '16px', height: '16px' }} />
              Google
            </button>
            <button style={{
              flex: 1, padding: '0.75rem', borderRadius: '0.75rem',
              border: '1.5px solid var(--color-border)', backgroundColor: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)', transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#4f46e5'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>code</span>
              GitHub
            </button>
          </div>
        </div>

        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontSize: '0.875rem', color: 'var(--color-text-secondary)',
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
