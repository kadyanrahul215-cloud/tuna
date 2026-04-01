import { useState } from 'react'
import { mockData } from '../lib/supabase'
import AppLayout from '../components/Layout/AppLayout'

export default function SupportPage() {
  const { supportTickets, chatMessages, faqs } = mockData
  const [openFaq, setOpenFaq] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(chatMessages)

  const sendMessage = () => {
    if (!message.trim()) return
    const now = new Date()
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: message, time }])
    setMessage('')
    // Mock agent reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, sender: 'agent',
        text: 'Thanks for reaching out! A support specialist will review your request shortly.',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      }])
    }, 1000)
  }

  const statusStyle = {
    'In Progress': { bg: '#eef2ff', text: '#4f46e5' },
    'Open': { bg: '#fffbeb', text: '#d97706' },
    'Resolved': { bg: '#f0fdf4', text: '#16a34a' },
  }

  return (
    <AppLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fade-in 0.4s ease' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Support Center</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Get help and manage your support tickets</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }} className="support-grid">
          {/* Tickets */}
          <div style={{
            backgroundColor: '#fff', borderRadius: '1.25rem',
            border: '1px solid var(--color-border)', padding: '1.5rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>Active Tickets</h2>
              <button style={{
                padding: '0.5rem 1rem', borderRadius: '0.625rem', border: 'none',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
                fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.375rem',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                New Ticket
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {supportTickets.map(t => {
                const ss = statusStyle[t.status] || { bg: '#f8fafc', text: '#64748b' }
                return (
                  <div key={t.id} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)',
                    transition: 'all 0.2s ease', cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#4f46e5'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '0.625rem',
                      backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>{t.icon}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.125rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{t.ticketNumber}</span>
                        <span style={{
                          fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.5rem',
                          borderRadius: '9999px', backgroundColor: ss.bg, color: ss.text,
                        }}>{t.status}</span>
                      </div>
                      <p style={{ fontWeight: 500, fontSize: '0.8125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</p>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', whiteSpace: 'nowrap' }}>{t.updated}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Live Chat */}
          <div style={{
            backgroundColor: '#fff', borderRadius: '1.25rem',
            border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column',
            height: '400px',
          }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>Live Chat</h2>
            </div>
            <div style={{
              flex: 1, padding: '1rem 1.5rem', overflowY: 'auto',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
            }} className="hide-scrollbar">
              {messages.map(m => (
                <div key={m.id} style={{
                  maxWidth: '80%',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    padding: '0.75rem 1rem', borderRadius: '1rem',
                    backgroundColor: m.sender === 'user' ? '#4f46e5' : '#f1f5f9',
                    color: m.sender === 'user' ? '#fff' : 'var(--color-text)',
                    fontSize: '0.8125rem', lineHeight: 1.5,
                  }}>{m.text}</div>
                  <p style={{
                    fontSize: '0.625rem', color: 'var(--color-text-tertiary)',
                    marginTop: '0.25rem',
                    textAlign: m.sender === 'user' ? 'right' : 'left',
                  }}>{m.time}</p>
                </div>
              ))}
            </div>
            <div style={{
              padding: '1rem 1.5rem', borderTop: '1px solid var(--color-border)',
              display: 'flex', gap: '0.75rem',
            }}>
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                style={{
                  flex: 1, padding: '0.625rem 1rem', borderRadius: '0.75rem',
                  border: '1.5px solid var(--color-border)', fontSize: '0.8125rem',
                  backgroundColor: 'var(--color-surface-50)', color: 'var(--color-text)',
                }}
              />
              <button onClick={sendMessage} style={{
                width: '40px', height: '40px', borderRadius: '0.75rem', border: 'none',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
              </button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{
          backgroundColor: '#fff', borderRadius: '1.25rem',
          border: '1px solid var(--color-border)', padding: '1.5rem',
        }}>
          <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '1.25rem' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {faqs.map(faq => (
              <div key={faq.id} style={{
                borderRadius: '0.75rem', border: '1px solid var(--color-border)',
                overflow: 'hidden', transition: 'all 0.2s ease',
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  style={{
                    width: '100%', padding: '1rem 1.25rem',
                    background: openFaq === faq.id ? 'var(--color-surface-50)' : '#fff',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)',
                    textAlign: 'left', gap: '1rem',
                  }}
                >
                  {faq.question}
                  <span className="material-symbols-outlined" style={{
                    fontSize: '20px', color: 'var(--color-text-secondary)',
                    transition: 'transform 0.2s ease',
                    transform: openFaq === faq.id ? 'rotate(180deg)' : 'rotate(0)',
                    flexShrink: 0,
                  }}>expand_more</span>
                </button>
                {openFaq === faq.id && (
                  <div style={{
                    padding: '0 1.25rem 1rem',
                    fontSize: '0.8125rem', color: 'var(--color-text-secondary)',
                    lineHeight: 1.6, animation: 'slide-down 0.2s ease',
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .support-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </AppLayout>
  )
}
