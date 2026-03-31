import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function TopAppBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-6 h-16 bg-surface/70 backdrop-blur-3xl"
      style={{ WebkitBackdropFilter: 'blur(24px)' }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          {user?.avatar_url ? (
            <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-on-primary-container text-lg">person</span>
          )}
        </div>
        <span 
          className="text-lg md:text-xl font-bold text-primary cursor-pointer"
          style={{ fontFamily: 'var(--font-headline)' }}
          onClick={() => navigate('/dashboard')}
        >
          TUNA Business
        </span>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          className="p-2 rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant"
          title="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2.5 right-[4.5rem] md:right-[5.5rem] w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button 
          onClick={logout}
          className="p-2 rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant"
          title="Logout"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </motion.header>
  )
}
