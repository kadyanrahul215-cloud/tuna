import { mockData } from '../lib/supabase'
import AppLayout from '../components/Layout/AppLayout'

export default function ProcurementPage() {
  const { purchaseOrders, suppliers } = mockData

  const statusStyle = {
    'Delivered': { bg: 'rgba(16, 185, 129, 0.12)', text: 'var(--color-success)' },
    'In Review': { bg: 'rgba(79, 70, 229, 0.12)', text: 'var(--color-primary)' },
    'Urgent': { bg: 'rgba(239, 68, 68, 0.12)', text: 'var(--color-error)' },
  }

  return (
    <AppLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fade-in 0.4s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Procurement</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Manage purchase orders and vendor relationships</p>
          </div>
          <button style={{
            padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: 'none',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff',
            fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            transition: 'transform 0.2s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            New Order
          </button>
        </div>

        {/* Purchase Orders */}
        <div style={{
          backgroundColor: 'var(--color-surface)', borderRadius: '1.25rem',
          border: '1px solid var(--color-border)', overflow: 'hidden',
        }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>Purchase Orders</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {['Order #', 'Amount', 'Items', 'Date', 'Status'].map(h => (
                    <th key={h} style={{
                      padding: '0.75rem 1.5rem', textAlign: 'left',
                      fontWeight: 600, color: 'var(--color-text-secondary)',
                      fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map(po => {
                  const ss = statusStyle[po.status] || { bg: 'var(--color-surface-100)', text: 'var(--color-text-secondary)' }
                  return (
                    <tr key={po.id} style={{
                      borderBottom: '1px solid var(--color-border-light)',
                      transition: 'background-color 0.15s ease', cursor: 'pointer',
                    }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-50)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{po.orderNumber}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{po.amount}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{po.items}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{po.date}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{
                          fontSize: '0.6875rem', fontWeight: 600, padding: '0.25rem 0.75rem',
                          borderRadius: '9999px', backgroundColor: ss.bg, color: ss.text,
                        }}>{po.status}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preferred Suppliers */}
        <div style={{
          backgroundColor: 'var(--color-surface)', borderRadius: '1.25rem',
          border: '1px solid var(--color-border)', padding: '1.5rem',
        }}>
          <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '1.25rem' }}>Preferred Suppliers</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}>
            {suppliers.map(s => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease', cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '0.75rem',
                  backgroundColor: 'var(--color-surface-100)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-text-secondary)' }}>business</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{s.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{s.orders} orders</p>
                </div>
                <span style={{
                  fontSize: '0.6875rem', fontWeight: 600, padding: '0.25rem 0.625rem',
                  borderRadius: '9999px',
                  backgroundColor: s.status === 'active' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                  color: s.status === 'active' ? 'var(--color-success)' : 'var(--color-warning)',
                  textTransform: 'capitalize',
                }}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
