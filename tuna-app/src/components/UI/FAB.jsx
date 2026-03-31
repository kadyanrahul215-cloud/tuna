import { motion } from 'framer-motion'

export default function FAB({ icon = 'add', label, onClick }) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[55] bg-primary-container text-on-primary-container shadow-2xl flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer ${
        label 
          ? 'px-6 py-4 rounded-full gap-3' 
          : 'w-14 h-14 md:w-16 md:h-16 rounded-full'
      }`}
    >
      <span className="material-symbols-outlined text-2xl md:text-3xl filled">{icon}</span>
      {label && (
        <span className="font-bold uppercase text-xs tracking-widest" style={{ fontFamily: 'var(--font-label)' }}>
          {label}
        </span>
      )}
    </motion.button>
  )
}
