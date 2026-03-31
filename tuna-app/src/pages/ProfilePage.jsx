import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/Layout/AppLayout'

export default function ProfilePage() {
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const roleLabels = {
    developer: 'Developer — API & Infrastructure',
    staff: 'Staff — Operations & Tasks',
    management: 'Management — Insights & Strategy',
    customer: 'Customer — Account & Services',
  }

  const menuItems = [
    { icon: 'settings', label: 'Organization Settings', subtitle: 'Manage workspace preferences' },
    { icon: 'security', label: 'Security & Privacy', subtitle: 'Two-factor auth, sessions' },
    { icon: 'palette', label: 'Appearance', subtitle: 'Theme, language, accessibility' },
    { icon: 'notifications', label: 'Notifications', subtitle: 'Email, push, in-app alerts' },
    { icon: 'receipt_long', label: 'Billing & Plans', subtitle: 'Subscription, invoices' },
    { icon: 'integration_instructions', label: 'API & Integrations', subtitle: 'Keys, webhooks, connected apps' },
  ]

  return (
    <AppLayout>
      <div className="space-y-6 md:space-y-10 max-w-3xl">
        {/* Profile Header */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-6"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-primary-container flex-shrink-0 ring-4 ring-primary/10">
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-on-primary-container">
                <span className="material-symbols-outlined text-4xl">person</span>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-headline)' }}>
              {user?.full_name || 'Alex Johnson'}
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">{user?.email || 'alex@tunabusiness.com'}</p>
            <div className="mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                <span className="material-symbols-outlined text-xs filled">shield</span>
                {roleLabels[role] || 'Member'}
              </span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-surface-container-highest text-on-surface px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-surface-container-high transition-colors cursor-pointer self-start"
          >
            Edit Profile
          </motion.button>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {[
            { label: 'Active Since', value: 'Jan 2022' },
            { label: 'Team Size', value: '24' },
            { label: 'Projects', value: '12' },
            { label: 'Uptime', value: '99.9%' },
          ].map((stat, i) => (
            <div key={stat.label} className="bg-surface-container-lowest p-4 md:p-5 rounded-2xl text-center">
              <p className="text-[10px] uppercase tracking-widest text-outline font-medium" style={{ fontFamily: 'var(--font-label)' }}>
                {stat.label}
              </p>
              <p className="text-xl md:text-2xl font-bold mt-1" style={{ fontFamily: 'var(--font-headline)' }}>
                {stat.value}
              </p>
            </div>
          ))}
        </motion.section>

        {/* Settings Menu */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4 px-1" style={{ fontFamily: 'var(--font-headline)' }}>
            Settings
          </h2>
          {menuItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant flex-shrink-0">
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-semibold text-sm md:text-base">{item.label}</p>
                <p className="text-xs text-on-surface-variant truncate">{item.subtitle}</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </motion.div>
          ))}
        </motion.section>

        {/* Logout Button */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <button
            onClick={handleLogout}
            className="w-full py-4 bg-error/10 text-error font-bold rounded-2xl hover:bg-error/20 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </motion.section>
      </div>
    </AppLayout>
  )
}
