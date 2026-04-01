import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const { forgotPassword } = useAuth()
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setIsLoading(true)
    setError('')

    const result = await forgotPassword(email)
    setIsLoading(false)

    if (result.success) {
      setSent(true)
      toast.success('Reset link sent! Check your email.')
    } else {
      setError(result.error)
      toast.error(result.error)
    }
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f0f9ff 100%)',
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
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>lock_reset</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            {sent ? 'Check your email' : 'Forgot password?'}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            {sent
              ? `We've sent a reset link to ${email}`
              : "No worries, we'll send you reset instructions."}
          </p>
        </div>

        <div style={{
          backgroundColor: '#fff', borderRadius: '1.25rem', padding: '2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
        }}>
          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                backgroundColor: 'var(--color-success-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: '28px', color: '#10b981' }}>mark_email_read</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <button
                onClick={() => setSent(false)}
                style={{
                  padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
                  border: '1.5px solid var(--color-border)', backgroundColor: '#fff',
                  fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', color: 'var(--color-text)',
                  transition: 'all 0.2s ease',
                }}
              >
                Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {error && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1rem', borderRadius: '0.75rem',
                  backgroundColor: 'var(--color-error-bg)', color: '#dc2626',
                  fontSize: '0.8125rem', fontWeight: 500,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
                  {error}
                </div>
              )}
              <div>
                <label style={{
                  display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                  color: 'var(--color-text-secondary)', marginBottom: '0.5rem',
                }}>Email address</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{
                    position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '18px', color: 'var(--color-text-tertiary)',
                  }}>mail</span>
                  <input
                    type="email" value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="you@company.com"
                    style={{
                      width: '100%', padding: '0.75rem 0.875rem 0.75rem 2.75rem',
                      borderRadius: '0.75rem', border: `1.5px solid ${error ? '#ef4444' : 'var(--color-border)'}`,
                      fontSize: '0.875rem', backgroundColor: 'var(--color-surface-50)',
                      transition: 'all 0.2s ease', color: 'var(--color-text)',
                    }}
                  />
                </div>
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
                    Sending...
                  </>
                ) : 'Send reset link'}
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
