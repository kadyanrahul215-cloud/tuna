import { motion } from 'framer-motion'

export default function InsightCard({ icon, title, description, buttonText, onButtonClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-primary text-on-primary p-6 md:p-8 rounded-2xl relative overflow-hidden h-full flex flex-col justify-between"
    >
      <div>
        <span className="material-symbols-outlined text-3xl md:text-4xl mb-3 md:mb-4 block filled">
          {icon || 'insights'}
        </span>
        <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
          {title}
        </h3>
        <p className="text-on-primary-container/80 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      {buttonText && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onButtonClick}
          className="mt-6 md:mt-8 bg-surface-container-lowest text-primary py-3 rounded-full font-bold text-sm transition-all w-full cursor-pointer"
        >
          {buttonText}
        </motion.button>
      )}
      {/* Decorative elements */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
    </motion.div>
  )
}
