import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LandingPage() {
  const { isAuthenticated } = useAuth()

  const features = [
    { icon: 'inventory_2', title: 'Smart Procurement', desc: 'Streamline vendor management and purchasing workflows with AI-driven insights.' },
    { icon: 'support_agent', title: 'Integrated Support', desc: 'Manage tickets, live chat, and customer queries all from one unified platform.' },
    { icon: 'group', title: 'HR Portal', desc: 'Handle interviews, job postings, and employee management effortlessly.' },
    { icon: 'insights', title: 'Analytics Engine', desc: 'Real-time dashboards and predictive analytics for smarter decisions.' },
    { icon: 'security', title: 'Enterprise Security', desc: 'Role-based access control with SOC2 compliance and encrypted data.' },
    { icon: 'speed', title: 'Lightning Fast', desc: 'Optimized for performance with sub-second load times across all modules.' },
  ]

  const testimonials = [
    { name: 'Sarah Chen', role: 'CTO, Nexus Corp', text: 'TUNA transformed our operations. We cut procurement costs by 30% in just 3 months.', initials: 'SC' },
    { name: 'Marcus Rivera', role: 'VP Ops, Stellar Inc', text: 'The best enterprise platform we\'ve used. The support module alone saved us 200+ hours per quarter.', initials: 'MR' },
    { name: 'Elena Petrova', role: 'CEO, CloudPeak', text: 'From HR to procurement, everything is streamlined. Our team productivity increased by 40%.', initials: 'EP' },
  ]

  return (
    <div style={{ minHeight: '100dvh', overflow: 'hidden' }}>
      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 1.5rem', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '0.625rem',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: '0.875rem',
          }}>T</div>
          <span style={{ fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>TUNA</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isAuthenticated ? (
            <Link to="/dashboard" style={{
              padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: 'none',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
              fontWeight: 600, fontSize: '0.8125rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            }}>Dashboard <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span></Link>
          ) : (
            <>
              <Link to="/login" style={{
                padding: '0.625rem 1.25rem', borderRadius: '0.75rem',
                border: '1.5px solid var(--color-border)', backgroundColor: '#fff',
                color: 'var(--color-text)', fontWeight: 600, fontSize: '0.8125rem', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}>Sign in</Link>
              <Link to="/register" style={{
                padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: 'none',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
                fontWeight: 600, fontSize: '0.8125rem', textDecoration: 'none',
              }}>Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        padding: 'clamp(4rem, 10vw, 8rem) 1.5rem',
        textAlign: 'center',
        maxWidth: '900px', margin: '0 auto',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, animation: 'slide-up 0.6s ease' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', borderRadius: '9999px',
            backgroundColor: '#eef2ff', color: '#4f46e5',
            fontSize: '0.8125rem', fontWeight: 600, marginBottom: '1.5rem',
            border: '1px solid #c7d2fe',
          }}>
            <span className="material-symbols-outlined filled" style={{ fontSize: '16px' }}>auto_awesome</span>
            Now powered by AI
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}>
            The Operating System for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Modern Business
            </span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--color-text-secondary)',
            maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6,
          }}>
            Unified procurement, support, HR, and analytics in one elegant platform.
            Built for teams that move fast and think big.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '0.75rem', border: 'none',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
              fontWeight: 600, fontSize: '1rem', textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(79, 70, 229, 0.3)',
              transition: 'transform 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Start for free
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
            </Link>
            <Link to="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '0.75rem',
              border: '1.5px solid var(--color-border)', backgroundColor: '#fff',
              color: 'var(--color-text)', fontWeight: 600, fontSize: '1rem', textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>play_circle</span>
              Watch demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: '5rem 1.5rem',
        maxWidth: '1200px', margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Everything you need
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.0625rem', maxWidth: '500px', margin: '0 auto' }}>
            Powerful modules designed to work together seamlessly
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              backgroundColor: '#fff', borderRadius: '1.25rem', padding: '2rem',
              border: '1px solid var(--color-border)',
              transition: 'all 0.2s ease', cursor: 'pointer',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: '22px', color: '#4f46e5' }}>{f.icon}</span>
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Loved by teams worldwide
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.0625rem' }}>
              See what our customers have to say
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                backgroundColor: '#fff', borderRadius: '1.25rem', padding: '2rem',
                border: '1px solid var(--color-border)',
              }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="material-symbols-outlined filled" style={{ fontSize: '16px', color: '#f59e0b' }}>star</span>
                  ))}
                </div>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: '0.75rem',
                  }}>{t.initials}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '5rem 1.5rem', textAlign: 'center',
        maxWidth: '700px', margin: '0 auto',
      }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Ready to transform your business?
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.0625rem', marginBottom: '2rem' }}>
          Join thousands of teams already using TUNA to power their operations.
        </p>
        <Link to="/register" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '1rem 2.5rem', borderRadius: '0.75rem', border: 'none',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
          fontWeight: 600, fontSize: '1.0625rem', textDecoration: 'none',
          boxShadow: '0 8px 25px rgba(79, 70, 229, 0.3)',
          transition: 'transform 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Get started — it's free
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '3rem 1.5rem', backgroundColor: '#fff',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: '0.75rem',
              }}>T</div>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>TUNA</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              The operating system for modern business.
            </p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Support', links: ['Help Center', 'Contact', 'Status', 'API Docs'] },
          ].map((col, i) => (
            <div key={i}>
              <p style={{ fontWeight: 600, fontSize: '0.8125rem', marginBottom: '0.75rem' }}>{col.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {col.links.map((link, j) => (
                  <a key={j} href="#" style={{
                    fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#4f46e5'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                  >{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          maxWidth: '1200px', margin: '2rem auto 0',
          paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
            © {new Date().getFullYear()} TUNA Business Solutions. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Privacy', 'Terms', 'Cookies'].map((t, i) => (
              <a key={i} href="#" style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textDecoration: 'none' }}>{t}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
