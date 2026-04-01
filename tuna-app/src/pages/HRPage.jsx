import { mockData } from '../lib/supabase'
import AppLayout from '../components/Layout/AppLayout'

export default function HRPage() {
  const { interviews } = mockData

  // Match visual exact dates from mockup
  const visualInterviews = [
    { id: 1, dateNum: '14', dateString: 'OCT', name: 'Jordan Sterling', role: 'Senior Cloud Architect', stage: 'Technical Round 2', time: '09:30 AM', location: 'Meeting Room 4C' },
    { id: 2, dateNum: '14', dateString: 'OCT', name: 'Elena Vance', role: 'Lead Product Designer', stage: 'Portfolio Review', time: '11:00 AM', location: 'Virtual Link' },
    { id: 3, dateNum: '15', dateString: 'OCT', name: 'Marcus Thorne', role: 'DevOps Engineer', stage: 'HR Culture Fit', time: '02:30 PM', location: 'Meeting Room 2B' },
  ]

  return (
    <AppLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', animation: 'fade-in 0.5s ease', maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
        
        {/* Header Hero */}
        <div>
          <p style={{ 
            fontSize: '0.875rem', fontWeight: 700, 
            color: 'var(--color-primary-light)', textTransform: 'uppercase', 
            letterSpacing: '0.1em', marginBottom: '0.75rem' 
          }}>
            HR PERFORMANCE SUITE
          </p>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, 
            color: 'var(--color-text)', letterSpacing: '-0.04em', lineHeight: 1, 
            marginBottom: '1rem',
          }}>
            Precision Hiring.
          </h1>
          <p style={{ 
            fontSize: '1.125rem', color: 'var(--color-text-secondary)', 
            maxWidth: '600px', lineHeight: 1.6 
          }}>
            Architecting your future workforce with surgical precision and intelligent interview workflows.
          </p>
        </div>

        {/* Main Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem' 
        }}>
          
          {/* Left Column: Interview Schedule */}
          <div style={{
            backgroundColor: 'var(--color-surface-50)',
            borderRadius: '1.25rem',
            padding: '2rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.25rem' }}>Interview Schedule</h2>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>Prioritizing high-intent candidates for Q3</p>
              </div>
              <button style={{
                padding: '0.75rem 1.25rem', borderRadius: '9999px', border: 'none',
                backgroundColor: 'var(--color-surface-200)', color: 'var(--color-primary-dark)',
                fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', textAlign: 'center',
                transition: 'background-color 0.2s'
              }}
               onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-300)'}
               onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-200)'}
              >
                View<br />Calendar
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {visualInterviews.map((interview, index) => (
                <div key={interview.id} style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: '0.5rem',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  position: 'relative',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  animation: `fade-in 0.4s ease ${index * 0.1}s both`,
                }}>
                  {/* Date Block */}
                  <div style={{ 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    minWidth: '3.5rem' 
                  }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1.1 }}>
                      {interview.dateNum}
                    </span>
                    <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--color-text-tertiary)', letterSpacing: '0.1em' }}>
                      {interview.dateString}
                    </span>
                  </div>

                  {/* Candidate Info */}
                  <div style={{ flex: 1, borderLeft: '1px solid var(--color-border)', paddingLeft: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                      {interview.name}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                      {interview.role} • {interview.stage}
                    </p>
                  </div>

                  {/* Time & Location */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.375rem' }}>
                    <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      {interview.time}
                    </span>
                    <span style={{ 
                      fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-secondary)',
                      backgroundColor: 'var(--color-surface-200)', padding: '0.25rem 0.625rem', borderRadius: '9999px',
                      whiteSpace: 'nowrap'
                    }}>
                      {interview.location}
                    </span>
                  </div>
                  
                  {/* Chevron arrow icon absolute on right edge */}
                  <span className="material-symbols-outlined" style={{ 
                    position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '18px', color: 'var(--color-text-tertiary)' 
                  }}>
                    chevron_right
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: HR Hub + Success Rate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* HR Hub Card */}
            <div style={{
              backgroundColor: 'var(--color-primary-dark)',
              borderRadius: '0.75rem',
              padding: '2.5rem',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(26, 86, 219, 0.2)',
              position: 'relative', overflow: 'hidden'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
                HR Hub
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', lineHeight: 1.4, position: 'relative', zIndex: 1 }}>
                Critical updates required for new hires
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1, marginBottom: '2rem' }}>
                {/* Background Checks Notice */}
                <div style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.05)', 
                  padding: '1.25rem', borderRadius: '0.5rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>ac_unit</span>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Background Checks</h3>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', marginLeft: '2.25rem' }}>
                    3 candidates awaiting verification
                  </p>
                </div>
                
                {/* Offer Letters Notice */}
                <div style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.05)', 
                  padding: '1.25rem', borderRadius: '0.5rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Offer Letters</h3>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', marginLeft: '2.25rem' }}>
                    2 contracts signed today
                  </p>
                </div>
              </div>

              <button style={{
                backgroundColor: '#fff', color: 'var(--color-primary-dark)',
                padding: '1rem 0', width: '100%', borderRadius: '9999px',
                fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer',
                textAlign: 'center', position: 'relative', zIndex: 1,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
              }}
               onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
               onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Review Pipeline
              </button>
            </div>

            {/* Success Rate Card */}
            <div style={{
              backgroundColor: 'var(--color-surface-100)',
              borderRadius: '0.5rem',
              padding: '2rem',
              border: '1px solid var(--color-border)',
            }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                SUCCESS RATE
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1 }}>
                  92%
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-success)', marginBottom: '0.5rem' }}>
                  +4.5%
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Offer acceptance rate this quarter.
              </p>
            </div>
            
          </div>
        </div>

        {/* Bottom Bar: Active Recruitment */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border-light)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            Active Recruitment
          </h2>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)', cursor: 'pointer' }}>All Roles (14)</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', cursor: 'pointer' }}>Engineering (8)</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', cursor: 'pointer' }}>Design (4)</span>
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
