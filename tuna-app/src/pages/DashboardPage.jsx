import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../hooks/useData'
import AppLayout from '../components/Layout/AppLayout'
import SearchBar from '../components/UI/SearchBar'
import KPICard from '../components/UI/KPICard'
import ActivityItem from '../components/UI/ActivityItem'
import InsightCard from '../components/UI/InsightCard'
import FAB from '../components/UI/FAB'

export default function DashboardPage() {
  const { user } = useAuth()
  const { kpiMetrics, activities } = useData()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <AppLayout>
      <div className="space-y-6 md:space-y-10">
        {/* Sticky Search Bar */}
        <div className="sticky top-20 z-30 pt-1 pb-2">
          <SearchBar placeholder="Search orders, tickets, or ranking..." />
        </div>

        {/* Greeting Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl p-6 md:p-8 text-on-primary"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-container) 100%)' }}
        >
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              {getGreeting()}, {user?.full_name?.split(' ')[0] || 'Alex'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-on-primary-container/80 text-sm md:text-lg max-w-md"
            >
              Your business ecosystem is performing at 94% efficiency today. You have 3 urgent items requiring attention.
            </motion.p>
          </div>
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 opacity-20 transform translate-x-10 -translate-y-10">
            <span className="material-symbols-outlined filled" style={{ fontSize: '160px' }}>architecture</span>
          </div>
        </motion.section>

        {/* KPI Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {kpiMetrics.map((kpi, i) => (
            <KPICard key={kpi.id} {...kpi} index={i} />
          ))}
        </section>

        {/* Activity & Insight Bento Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-8 bg-surface-container-low rounded-2xl p-5 md:p-8">
            <div className="flex justify-between items-center mb-5 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface" style={{ fontFamily: 'var(--font-headline)' }}>
                Recent Activity
              </h2>
              <button className="text-primary font-bold text-sm hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-3 md:space-y-4">
              {activities.map((activity, i) => (
                <ActivityItem key={activity.id} {...activity} index={i} />
              ))}
            </div>
          </div>

          {/* Insight Side Card */}
          <div className="lg:col-span-4">
            <InsightCard
              icon="insights"
              title="Architectural Insight"
              description="Based on current procurement patterns, you could save up to 14% by consolidating vendor orders for the next quarter."
              buttonText="Explore Strategy"
            />
          </div>
        </section>
      </div>

      <FAB icon="add" />
    </AppLayout>
  )
}
