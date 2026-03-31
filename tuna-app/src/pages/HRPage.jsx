import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../hooks/useData'
import AppLayout from '../components/Layout/AppLayout'

export default function HRPage() {
  const { interviews, jobPostings } = useData()
  const [activeTab, setActiveTab] = useState('All Roles')

  const tabs = ['All Roles (14)', 'Engineering (8)', 'Design (4)']

  return (
    <AppLayout>
      <div className="space-y-8 md:space-y-12">
        {/* Welcome Hero */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <span className="text-xs tracking-widest uppercase text-primary font-medium" style={{ fontFamily: 'var(--font-label)' }}>
            HR Performance Suite
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-on-surface" style={{ fontFamily: 'var(--font-headline)' }}>
            Precision Hiring.
          </h1>
          <p className="text-on-surface-variant max-w-xl">
            Architecting your future workforce with surgical precision and intelligent interview workflows.
          </p>
        </motion.section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Interview Schedule Tracker */}
          <div className="md:col-span-8 bg-surface-container-low rounded-2xl p-5 md:p-8 space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3">
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-semibold text-on-surface" style={{ fontFamily: 'var(--font-headline)' }}>
                  Interview Schedule
                </h2>
                <p className="text-sm text-on-surface-variant font-medium">Prioritizing high-intent candidates for Q3</p>
              </div>
              <button className="bg-surface-container-highest text-primary font-semibold py-2 px-5 md:px-6 rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer text-sm self-start sm:self-auto">
                View Calendar
              </button>
            </div>
            <div className="space-y-3 md:space-y-4">
              {interviews.map((interview, i) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-surface-container-lowest rounded-2xl hover:bg-surface transition-colors cursor-pointer group ${
                    i === interviews.length - 1 ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex flex-col items-center justify-center min-w-[50px] md:min-w-[64px] border-r border-surface-container pr-3 md:pr-6">
                    <span className="font-bold text-lg md:text-xl text-primary" style={{ fontFamily: 'var(--font-headline)' }}>
                      {interview.day}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{interview.month}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-base md:text-lg truncate" style={{ fontFamily: 'var(--font-headline)' }}>
                      {interview.name}
                    </h4>
                    <p className="text-sm text-on-surface-variant truncate">{interview.position} • {interview.round}</p>
                  </div>
                  <div className="text-right hidden md:block flex-shrink-0">
                    <p className="font-bold text-primary" style={{ fontFamily: 'var(--font-headline)' }}>{interview.time}</p>
                    <span className="text-xs text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full inline-block">
                      {interview.location}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform hidden sm:block">
                    chevron_right
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notifications & KPI */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-primary p-6 md:p-8 rounded-2xl text-on-primary space-y-4 md:space-y-6 flex-grow flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'var(--font-headline)' }}>HR Hub</h3>
                <p className="text-on-primary/70 text-sm mt-2">Critical updates required for new hires</p>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/5">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-sm mt-1">emergency</span>
                    <div>
                      <p className="font-semibold text-sm">Background Checks</p>
                      <p className="text-xs opacity-70">3 candidates awaiting verification</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/5">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-sm mt-1">verified</span>
                    <div>
                      <p className="font-semibold text-sm">Offer Letters</p>
                      <p className="text-xs opacity-70">2 contracts signed today</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full bg-white text-primary font-bold py-3 rounded-full hover:bg-on-primary-container transition-all cursor-pointer">
                Review Pipeline
              </button>
            </motion.div>

            {/* Quick KPI */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-surface-container-highest p-6 md:p-8 rounded-2xl"
            >
              <span className="text-[10px] tracking-widest text-outline uppercase font-bold" style={{ fontFamily: 'var(--font-label)' }}>
                Success Rate
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-headline)' }}>92%</span>
                <span className="text-green-600 font-bold text-sm">+4.5%</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2">Offer acceptance rate this quarter.</p>
            </motion.div>
          </div>
        </div>

        {/* Open Positions Section */}
        <section className="space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 border-b border-surface-container pb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-headline)' }}>
              Active Recruitment
            </h2>
            <div className="flex gap-3 md:gap-4">
              {tabs.map((tab, i) => (
                <span
                  key={tab}
                  className={`text-sm cursor-pointer ${i === 0 ? 'text-primary font-bold' : 'text-on-surface-variant font-medium hover:text-primary'} transition-colors`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {jobPostings.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-surface-container rounded-2xl p-5 md:p-6 flex flex-col justify-between h-64 md:h-72 group hover:bg-surface-container-high transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                      {job.type}
                    </span>
                    <span className="material-symbols-outlined text-outline-variant cursor-pointer hover:text-primary transition-colors">
                      bookmark
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mt-4 md:mt-6 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-headline)' }}>
                    {job.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">{job.description}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-on-surface">{job.salaryRange}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-on-primary px-4 md:px-5 py-2 rounded-full font-bold text-sm cursor-pointer"
                  >
                    Apply
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
