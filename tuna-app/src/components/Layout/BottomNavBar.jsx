import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/dashboard', icon: 'home', label: 'Home' },
  { path: '/procurement', icon: 'shopping_cart', label: 'Procure' },
  { path: '/support', icon: 'support_agent', label: 'Support', badge: 3 },
  { path: '/profile', icon: 'person', label: 'Profile' },
]

export default function BottomNavBar() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-surface/70 backdrop-blur-3xl md:hidden"
      style={{ 
        boxShadow: '0 -4px 20px rgba(0,0,0,0.04)',
        WebkitBackdropFilter: 'blur(24px)'
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center px-5 py-1 scale-90 transition-all duration-300 relative ${
              isActive 
                ? 'bg-primary-fixed text-primary rounded-full' 
                : 'text-outline hover:text-primary'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>
              {item.icon}
            </span>
            <span 
              className="text-[11px] uppercase tracking-wider mt-1"
              style={{ fontFamily: 'var(--font-label)', fontWeight: isActive ? 700 : 500 }}
            >
              {item.label}
            </span>
            {item.badge && (
              <span className="absolute top-0 right-3 w-4 h-4 bg-error text-[9px] text-white flex items-center justify-center rounded-full font-bold">
                {item.badge}
              </span>
            )}
          </NavLink>
        )
      })}
    </motion.nav>
  )
}
