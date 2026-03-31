import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/dashboard', icon: 'home', label: 'Dashboard' },
  { path: '/procurement', icon: 'shopping_cart', label: 'Procurement' },
  { path: '/support', icon: 'support_agent', label: 'Support', badge: 3 },
  { path: '/hr', icon: 'group', label: 'HR & Hiring' },
  { path: '/profile', icon: 'person', label: 'Profile' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 lg:w-72 bg-surface-container-low z-40 flex-col py-6 px-4"
    >
      <div className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 relative group ${
                isActive
                  ? 'bg-primary-fixed text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${isActive ? 'filled' : ''}`}>
                {item.icon}
              </span>
              <span 
                className="text-sm"
                style={{ 
                  fontFamily: 'var(--font-headline)', 
                  fontWeight: isActive ? 700 : 500 
                }}
              >
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-auto w-5 h-5 bg-error text-[10px] text-white flex items-center justify-center rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          )
        })}
      </div>

      <div className="pt-4 mt-auto">
        <div className="bg-surface-container rounded-2xl p-4">
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50" style={{ fontFamily: 'var(--font-label)' }}>
            © 2024 TUNA Business Solutions
          </p>
          <p className="text-[10px] text-on-surface-variant/30 mt-1">Engineered for Excellence</p>
        </div>
      </div>
    </motion.aside>
  )
}
