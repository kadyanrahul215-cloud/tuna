import { useAuth } from '../contexts/AuthContext'
import { mockData } from '../lib/supabase'
import AppLayout from '../components/Layout/AppLayout'

export default function DashboardPage() {
  const { user } = useAuth()

  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const kpis = mockData.kpiMetrics
  const activities = mockData.activities

  const statusColor = {
    Active: { bg: 'rgba(79, 70, 229, 0.12)', text: 'var(--color-primary)' },
    Urgent: { bg: 'rgba(239, 68, 68, 0.12)', text: 'var(--color-error)' },
    Review: { bg: 'rgba(16, 185, 129, 0.12)', text: 'var(--color-success)' },
    Pending: { bg: 'rgba(245, 158, 11, 0.12)', text: 'var(--color-warning)' },
  }

  return (
    <AppLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Hero Greeting */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0ea5e9 100%)',
          borderRadius: '1.25rem',
          padding: '2rem 2rem',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          animation: 'slide-up 0.5s ease',
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.85, marginBottom: '0.25rem' }}>
              {getGreeting()}
            </p>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: '0.5rem',
            }}>
              {user?.full_name?.split(' ')[0] || 'User'} 👋
            </h1>
            <p style={{ fontSize: '0.9375rem', opacity: 0.85, maxWidth: '500px', lineHeight: 1.6 }}>
              Your business ecosystem is performing at <strong>94% efficiency</strong> today. You have 3 urgent items requiring attention.
            </p>
          </div>
          {/* Decorative circle */}
          <div style={{
            position: 'absolute', top: '-30px', right: '-30px', width: '180px', height: '180px',
            borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-40px', right: '60px', width: '120px', height: '120px',
            borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
          }} />
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}>
          {kpis.map((kpi, i) => (
            <div
              key={kpi.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease',
                animation: `slide-up 0.4s ease ${i * 0.1}s both`,
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '0.75rem',
                  backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined filled" style={{ fontSize: '20px', color: '#4f46e5' }}>
                    {kpi.icon}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.75rem', fontWeight: 600,
                  color: kpi.changeType === 'positive' ? 'var(--color-success)' : 'var(--color-text-tertiary)',
                  backgroundColor: kpi.changeType === 'positive' ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-surface-100)',
                  padding: '0.25rem 0.625rem', borderRadius: '9999px',
                }}>
                  {kpi.change}
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                {kpi.label}
              </p>
              <p style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Activity + Insight Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem',
        }} className="dashboard-grid">
          {/* Recent Activity */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: '1rem',
            border: '1px solid var(--color-border)',
            padding: '1.5rem',
            animation: 'slide-up 0.5s ease 0.3s both',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Recent Activity</h2>
              <button style={{
                background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600,
                fontSize: '0.8125rem', cursor: 'pointer',
              }}>View All</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activities.map((act, i) => {
                const sc = statusColor[act.status] || { bg: 'var(--color-surface-100)', text: 'var(--color-text-secondary)' }
                return (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '0.875rem', borderRadius: '0.75rem',
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-50)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '0.75rem',
                      backgroundColor: 'var(--color-surface-100)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-text-secondary)' }}>
                        {act.icon}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {act.title}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {act.subtitle}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '0.6875rem', fontWeight: 600, padding: '0.25rem 0.75rem',
                      borderRadius: '9999px', backgroundColor: sc.bg, color: sc.text,
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {act.status}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Insight Card */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: '1rem',
            border: '1px solid var(--color-border)',
            padding: '1.5rem',
            animation: 'slide-up 0.5s ease 0.4s both',
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem',
            }}>
              <span className="material-symbols-outlined filled" style={{ fontSize: '20px', color: '#fff' }}>insights</span>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Architectural Insight</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Based on current procurement patterns, you could save up to <strong>14%</strong> by consolidating vendor orders for the next quarter.
            </p>
            <button style={{
              padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: 'none',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
              fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Explore Strategy
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .dashboard-grid { grid-template-columns: 2fr 1fr !important; }
        }
      `}</style>
    </AppLayout>
  )
}
