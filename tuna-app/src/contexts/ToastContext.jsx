import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext({})

export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = crypto.randomUUID()
    setToasts(prev => [...prev, { id, message, type, leaving: false }])
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, leaving: true } : t))
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 300)
    }, duration)
  }, [])

  const success = useCallback((msg) => addToast(msg, 'success'), [addToast])
  const error = useCallback((msg) => addToast(msg, 'error'), [addToast])
  const warning = useCallback((msg) => addToast(msg, 'warning'), [addToast])
  const info = useCallback((msg) => addToast(msg, 'info'), [addToast])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, leaving: true } : t))
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 300)
  }, [])

  const iconMap = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  }

  const colorMap = {
    success: { bg: '#ecfdf5', border: '#10b981', text: '#065f46', icon: '#10b981' },
    error: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b', icon: '#ef4444' },
    warning: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e', icon: '#f59e0b' },
    info: { bg: '#eef2ff', border: '#4f46e5', text: '#3730a3', icon: '#4f46e5' }
  }

  return (
    <ToastContext.Provider value={{ success, error, warning, info, addToast }}>
      {children}
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => {
          const colors = colorMap[toast.type] || colorMap.info
          return (
            <div
              key={toast.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1.25rem',
                backgroundColor: colors.bg,
                borderLeft: `4px solid ${colors.border}`,
                borderRadius: '0.75rem',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                color: colors.text,
                fontSize: '0.875rem',
                fontWeight: 500,
                minWidth: '300px',
                maxWidth: '420px',
                animation: toast.leaving ? 'toast-out 0.3s ease forwards' : 'toast-in 0.3s ease forwards',
                cursor: 'pointer'
              }}
              onClick={() => removeToast(toast.id)}
            >
              <span className="material-symbols-outlined filled" style={{ color: colors.icon, fontSize: '20px' }}>
                {iconMap[toast.type]}
              </span>
              <span style={{ flex: 1 }}>{toast.message}</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', opacity: 0.5, cursor: 'pointer' }}>
                close
              </span>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
