import { mockData } from '../lib/supabase'
import AppLayout from '../components/Layout/AppLayout'

export default function HRPage() {
  const { interviews, jobPostings } = mockData

  const typeColor = {
    'Remote': { bg: '#f0fdf4', text: '#16a34a' },
    'On-site': { bg: '#eef2ff', text: '#4f46e5' },
    'Hybrid': { bg: '#faf5ff', text: '#9333ea' },
  }

  return (
    <AppLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fade-in 0.4s ease' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>HR Portal</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Manage hiring, interviews, and team growth</p>
        </div>

        {/* Upcoming Interviews */}
        <div style={{
          backgroundColor: '#fff', borderRadius: '1.25rem',
          border: '1px solid var(--color-border)', padding: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>Upcoming Interviews</h2>
            <button style={{
              padding: '0.5rem 1rem', borderRadius: '0.625rem', border: 'none',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
              fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.375rem',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
              Schedule
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {interviews.map(interview => (
              <div key={interview.id} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4f46e5'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Date Badge */}
                <div style={{
                  width: '52px', height: '56px', borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4f46e5', lineHeight: 1 }}>{interview.day}</span>
                  <span style={{ fontSize: '0.625rem', fontWeight: 600, color: '#818cf8', textTransform: 'uppercase' }}>{interview.month}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.125rem' }}>{interview.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{interview.position} • {interview.round}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>{interview.time}</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)' }}>{interview.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Postings */}
        <div style={{
          backgroundColor: '#fff', borderRadius: '1.25rem',
          border: '1px solid var(--color-border)', padding: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>Active Job Postings</h2>
            <button style={{
              padding: '0.5rem 1rem', borderRadius: '0.625rem', border: 'none',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
              fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.375rem',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
              Post Job
            </button>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
          }}>
            {jobPostings.map(job => {
              const tc = typeColor[job.type] || { bg: '#f8fafc', text: '#64748b' }
              return (
                <div key={job.id} style={{
                  padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--color-border)',
                  transition: 'all 0.2s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.04)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '0.75rem',
                      backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#4f46e5' }}>work</span>
                    </div>
                    <span style={{
                      fontSize: '0.6875rem', fontWeight: 600, padding: '0.25rem 0.625rem',
                      borderRadius: '9999px', backgroundColor: tc.bg, color: tc.text,
                    }}>{job.type}</span>
                  </div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.375rem' }}>{job.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', flex: 1, lineHeight: 1.5 }}>{job.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#4f46e5' }}>{job.salaryRange}</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)' }}>{job.department}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
