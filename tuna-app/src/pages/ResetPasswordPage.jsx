import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const { resetPassword } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
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

    const result = await resetPassword(password)
    setIsLoading(false)

    if (result.success) {
      setSuccess(true)
      toast.success('Password reset successfully!')
      setTimeout(() => navigate('/login'), 2000)
    } else {
      setErrors({ form: result.error })
      toast.error(result.error)
    }
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
      backgroundColor: 'var(--color-bg)',
    }}>
      <div style={{ width: '100%', maxWidth: '440px', animation: 'scale-in 0.4s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '1rem',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', marginBottom: '1rem',
            boxShadow: '0 8px 25px rgba(79, 70, 229, 0.25)',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>password</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            {success ? 'All set!' : 'Reset password'}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            {success ? 'Your password has been reset. Redirecting...' : 'Enter your new password below.'}
          </p>
        </div>

        <div style={{
          backgroundColor: 'var(--color-surface)', borderRadius: '1.25rem', padding: '2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06), 0 0 0 1px var(--color-border)',
        }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                backgroundColor: 'var(--color-success-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: '28px', color: '#10b981' }}>check_circle</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {errors.form && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1rem', borderRadius: '0.75rem',
                  backgroundColor: 'var(--color-error-bg)', color: '#dc2626',
                  fontSize: '0.8125rem', fontWeight: 500,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
                  {errors.form}
                </div>
              )}
              <div>
                <label style={{
                  display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                  color: 'var(--color-text-secondary)', marginBottom: '0.5rem',
                }}>New password</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{
                    position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '18px', color: 'var(--color-text-tertiary)',
                  }}>lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})) }}
                    placeholder="••••••••"
                    style={{
                      width: '100%', padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                      borderRadius: '0.75rem', border: `1.5px solid ${errors.password ? '#ef4444' : 'var(--color-border)'}`,
                      fontSize: '0.875rem', backgroundColor: 'var(--color-surface-50)',
                      transition: 'all 0.2s ease', color: 'var(--color-text)',
                    }}
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--color-text-tertiary)', display: 'flex', padding: '0.25rem',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
                {errors.password && <p style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.password}</p>}
              </div>
              <div>
                <label style={{
                  display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                  color: 'var(--color-text-secondary)', marginBottom: '0.5rem',
                }}>Confirm new password</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{
                    position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '18px', color: 'var(--color-text-tertiary)',
                  }}>lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'} value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({...p, confirmPassword: ''})) }}
                    placeholder="••••••••"
                    style={{
                      width: '100%', padding: '0.75rem 0.875rem 0.75rem 2.75rem',
                      borderRadius: '0.75rem', border: `1.5px solid ${errors.confirmPassword ? '#ef4444' : 'var(--color-border)'}`,
                      fontSize: '0.875rem', backgroundColor: 'var(--color-surface-50)',
                      transition: 'all 0.2s ease', color: 'var(--color-text)',
                    }}
                  />
                </div>
                {errors.confirmPassword && <p style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.confirmPassword}</p>}
              </div>
              <button
                type="submit" disabled={isLoading}
                style={{
                  width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none',
                  background: isLoading ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: '#fff', fontSize: '0.9375rem', fontWeight: 600,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'all 0.2s ease', boxShadow: isLoading ? 'none' : '0 4px 15px rgba(79, 70, 229, 0.3)',
                }}
              >
                {isLoading ? (
                  <>
                    <div style={{
                      width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite',
                    }} />
                    Resetting...
                  </>
                ) : 'Reset password'}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          <Link to="/login" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
