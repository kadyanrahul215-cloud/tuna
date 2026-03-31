import { motion } from 'framer-motion'

export default function KPICard({ label, value, change, changeType, icon, status, index = 0 }) {
  const statusColors = {
    'Active': 'bg-primary/10 text-primary',
    'Top 10': 'bg-tertiary/10 text-tertiary',
    '8 Resolved': 'bg-surface-container-highest text-outline',
  }

  const iconBgColors = {
    'shopping_cart': 'bg-secondary-container text-on-secondary-container',
    'leaderboard': 'bg-tertiary-container text-on-tertiary-container',
    'support_agent': 'bg-primary-container text-on-primary-container',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl transition-all hover:bg-surface-container-low cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-full ${iconBgColors[icon] || 'bg-primary-container text-on-primary-container'}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${statusColors[status] || 'bg-surface-container-highest text-outline'}`}>
          {status}
        </span>
      </div>
      
      <h3 
        className="text-outline-variant uppercase tracking-wider text-xs mb-1"
        style={{ fontFamily: 'var(--font-label)', fontWeight: 500 }}
      >
        {label}
      </h3>
      
      <div className="flex items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-bold text-on-surface" style={{ fontFamily: 'var(--font-headline)' }}>
          {value}
        </span>
      </div>
      
      {changeType === 'neutral' ? (
        <div className="mt-4 w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: change }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-primary h-full rounded-full"
          />
        </div>
      ) : (
        <div className="mt-4 flex items-center text-sm font-medium text-on-surface-variant">
          <span className={`material-symbols-outlined text-sm mr-1 ${changeType === 'positive' ? 'text-primary' : 'text-error'}`}>
            {changeType === 'positive' ? 'trending_up' : 'trending_down'}
          </span>
          <span>{change}</span>
        </div>
      )}
    </motion.div>
  )
}
