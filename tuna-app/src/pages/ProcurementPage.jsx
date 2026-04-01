import { mockData } from '../lib/supabase'
import AppLayout from '../components/Layout/AppLayout'

export default function ProcurementPage() {
  const { purchaseOrders, suppliers } = mockData

  const statusStyle = {
    'Delivered': { bg: 'rgba(16, 185, 129, 0.12)', text: 'var(--color-success)', icon: 'receipt_long' },
    'In Review': { bg: 'rgba(245, 158, 11, 0.12)', text: 'var(--color-warning)', icon: 'receipt_long' },
    'Urgent': { bg: 'var(--color-error-bg)', text: 'var(--color-error)', icon: 'warning' },
  }

  // Define some mockup override data strictly for matching the exact visual provided
  const visualOrders = [
    { id: 1, orderNumber: 'Order #PO-8821', date: 'Oct 24, 2023', items: 12, amount: '$12,450.00', status: 'Delivered', icon: 'receipt_long' },
    { id: 2, orderNumber: 'Order #PO-8822', date: 'Oct 22, 2023', items: 4, amount: '$3,200.50', status: 'In Review', icon: 'receipt_long' },
    { id: 3, orderNumber: 'Order #PO-8824', date: 'Oct 21, 2023', items: 22, amount: '$45,000.00', status: 'Urgent', icon: 'warning' },
  ]

  const visualSuppliers = [
    { id: 1, name: 'Global Logistics Co', orders: '48 orders', type: 'globe', status: 'active' },
    { id: 2, name: 'Apex Manufacturing', orders: '12 orders', type: 'building', status: 'action' },
  ]

  return (
    <AppLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fade-in 0.4s ease', paddingBottom: '5rem' }}>
        
        {/* Search Bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.875rem 1.25rem', borderRadius: '9999px',
          backgroundColor: 'var(--color-surface-200)',
          color: 'var(--color-text-secondary)',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
          <input 
            type="text" 
            placeholder="Search orders, suppliers, or items..." 
            style={{ 
              border: 'none', background: 'transparent', width: '100%', outline: 'none', 
              fontSize: '0.875rem', color: 'var(--color-text)' 
            }} 
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          <button style={{
            padding: '0.5rem 1.25rem', borderRadius: '9999px', border: 'none',
            backgroundColor: 'var(--color-primary)', color: '#fff',
            fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer',
          }}>Active</button>
          <button style={{
            padding: '0.5rem 1.25rem', borderRadius: '9999px', border: 'none',
            backgroundColor: 'var(--color-surface-200)', color: 'var(--color-text-secondary)',
            fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
          }}>Pending</button>
          <button style={{
            padding: '0.5rem 1.25rem', borderRadius: '9999px', border: 'none',
            backgroundColor: 'var(--color-surface-200)', color: 'var(--color-text-secondary)',
            fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer',
          }}>Review</button>
          <button style={{
            padding: '0.5rem 1rem', borderRadius: '9999px', border: 'none',
            backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)',
            fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.25rem'
          }}>
            <span className="material-symbols-outlined filled" style={{ fontSize: '16px' }}>error</span>
            Urgent
          </button>
        </div>

        {/* Purchase Orders List */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text)' }}>Recent Purchase Orders</h2>
            <button style={{
              background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700,
              fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer',
            }}>View All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visualOrders.map(po => {
              const ss = statusStyle[po.status]
              const isUrgent = po.status === 'Urgent'
              
              return (
                <div key={po.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  backgroundColor: 'var(--color-surface)',
                  padding: '1.25rem', borderRadius: '0.5rem',
                  borderLeft: isUrgent ? '3px solid var(--color-error)' : 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s', cursor: 'pointer'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      backgroundColor: 'var(--color-surface-50)', border: '1px solid var(--color-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <span className="material-symbols-outlined" style={{ 
                        fontSize: '20px', 
                        color: isUrgent ? 'var(--color-error)' : 'var(--color-primary)' 
                      }}>{po.icon}</span>
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-text)', marginBottom: '4px' }}>{po.orderNumber}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{po.date} • {po.items} Items</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text)', marginBottom: '6px' }}>{po.amount}</p>
                    <span style={{
                      fontSize: '0.625rem', fontWeight: 800, padding: '0.25rem 0.625rem',
                      borderRadius: '9999px', backgroundColor: ss.bg, color: ss.text,
                      textTransform: 'uppercase', letterSpacing: '0.05em'
                    }}>{po.status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Preferred Suppliers */}
        <div style={{ marginTop: '1.5rem', backgroundColor: 'var(--color-surface-50)', padding: '1.5rem', borderRadius: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.25rem' }}>Preferred Suppliers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {visualSuppliers.map(s => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: s.type === 'globe' ? 'linear-gradient(135deg, #0ea5e9, #2563eb)' : 'linear-gradient(135deg, #334155, #0f172a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    color: '#fff',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                      {s.type === 'globe' ? 'public' : 'domain'}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)' }}>{s.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Active {s.orders}</p>
                  </div>
                </div>
                
                {s.status === 'active' ? (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)', marginRight: '0.5rem' }} />
                ) : (
                  <button style={{
                    width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                    backgroundColor: 'var(--color-primary)', color: '#fff', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(26, 86, 219, 0.3)'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
