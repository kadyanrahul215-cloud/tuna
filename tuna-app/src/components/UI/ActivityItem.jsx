import { motion } from 'framer-motion'
import StatusBadge from './StatusBadge'

export default function ActivityItem({ title, subtitle, status, image, icon, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex items-center justify-between p-3 md:p-4 bg-surface-container-lowest rounded-2xl group hover:bg-surface-bright transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-outline">{icon || 'article'}</span>
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-on-surface text-sm md:text-base truncate">{title}</h4>
          <p className="text-xs text-outline truncate">{subtitle}</p>
        </div>
      </div>
      <div className="flex-shrink-0 ml-2">
        <StatusBadge status={status} />
      </div>
    </motion.div>
  )
}
