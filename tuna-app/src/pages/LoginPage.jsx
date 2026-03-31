import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const roles = [
  { id: 'developer', label: 'Developer', subtitle: 'API & Infrastructure', icon: 'terminal', color: 'primary' },
  { id: 'staff', label: 'Staff', subtitle: 'Operations & Tasks', icon: 'badge', color: 'secondary' },
  { id: 'management', label: 'Management', subtitle: 'Insights & Strategy', icon: 'analytics', color: 'tertiary' },
  { id: 'customer', label: 'Customer', subtitle: 'Account & Services', icon: 'person', color: 'outline' },
]

const colorMap = {
  primary: { border: 'border-l-primary', iconBg: 'bg-primary/10', iconText: 'text-primary' },
  secondary: { border: 'border-l-secondary', iconBg: 'bg-secondary/10', iconText: 'text-secondary' },
  tertiary: { border: 'border-l-tertiary', iconBg: 'bg-tertiary/10', iconText: 'text-tertiary' },
  outline: { border: 'border-l-outline', iconBg: 'bg-outline/10', iconText: 'text-outline' },
}

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!selectedRole) return
    setIsLoading(true)
    await login(selectedRole)
    setTimeout(() => {
      navigate('/dashboard')
    }, 300)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]"
        />
      </div>

      <main className="relative z-10 w-full max-w-[1200px] px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row items-center gap-10 lg:gap-24">
        {/* Left Column: Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary" style={{ fontFamily: 'var(--font-headline)' }}>
              TUNA Business
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-medium max-w-md text-on-surface-variant" style={{ fontFamily: 'var(--font-headline)' }}>
              Seamless architectural intelligence for the modern enterprise ecosystem.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy1vPB3JU8y08FiDPfl9yEAUdI0vxI6dIabTdz81Aodc_98aGnKMV4oDyOinL3EFhd73tV3YEavyjYQq8suDlZW8xeb3ATurg-2Hpa-OOv7E8do6_cAkqG7GSBR-O8dwyuD1n39woetbT774ouYsQrma8NSGHP7qnqJ12C2VSY0fYi_DYBYJYBO73cR_O4Gkh176ervIlIXff7rJ37J1ScU6e99nnaB9w57xpccaiMSPQ4PdZ2GXcDAU3kWKCUl1MAkz80zOexR9g" 
              alt="Modern office interior" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low"
          >
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined filled">verified</span>
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-headline)' }}>Enterprise Security</p>
              <p className="text-xs text-on-surface-variant">Role-based access control with biometric support.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Role Selector */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full md:w-1/2"
        >
          <div className="bg-surface-container-lowest p-6 md:p-8 lg:p-12 rounded-2xl flex flex-col gap-6 md:gap-8"
            style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.04)' }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface" style={{ fontFamily: 'var(--font-headline)' }}>
                Select Your Portal
              </h2>
              <p className="text-on-surface-variant text-sm">Choose your designated workspace to proceed.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {roles.map((role, i) => {
                const colors = colorMap[role.color]
                const isSelected = selectedRole === role.id
                return (
                  <motion.button
                    key={role.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole(role.id)}
                    className={`group flex flex-col items-start p-5 md:p-6 rounded-2xl transition-all duration-300 text-left border-l-4 cursor-pointer ${colors.border} ${
                      isSelected 
                        ? 'bg-surface-container-high ring-2 ring-primary/20' 
                        : 'bg-surface-container hover:bg-surface-container-high'
                    }`}
                  >
                    <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110 ${colors.iconBg}`}>
                      <span className={`material-symbols-outlined filled ${colors.iconText}`}>{role.icon}</span>
                    </div>
                    <span className="font-bold text-on-surface" style={{ fontFamily: 'var(--font-headline)' }}>
                      {role.label}
                    </span>
                    <span className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-1" style={{ fontFamily: 'var(--font-label)' }}>
                      {role.subtitle}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            <div className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleLogin}
                disabled={!selectedRole || isLoading}
                className={`w-full h-[50px] font-bold rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedRole 
                    ? 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary shadow-lg shadow-primary/20' 
                    : 'bg-surface-container-highest text-outline cursor-not-allowed'
                }`}
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {isLoading ? 'Entering...' : 'Continue to Workspace'}
                {!isLoading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
              </motion.button>
              <button className="w-full h-[50px] bg-surface-container-highest text-on-surface font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-surface-dim transition-colors cursor-pointer"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                SSO Login
                <span className="material-symbols-outlined text-xl">key</span>
              </button>
            </div>

            <div className="flex justify-between items-center text-xs text-on-surface-variant px-2">
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">Need assistance?</a>
              <span className="opacity-30">|</span>
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">Privacy Policy</a>
              <span className="opacity-30">|</span>
              <span style={{ fontFamily: 'var(--font-label)' }}>v2.4.0</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 md:bottom-8 w-full text-center pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/40" style={{ fontFamily: 'var(--font-label)' }}>
          © 2024 TUNA Business Solutions. Engineered for Excellence.
        </p>
      </footer>
    </div>
  )
}
