import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../hooks/useData'
import AppLayout from '../components/Layout/AppLayout'
import SearchBar from '../components/UI/SearchBar'
import StatusBadge from '../components/UI/StatusBadge'
import FAB from '../components/UI/FAB'

const filterOptions = ['Active', 'Pending', 'Review', 'Urgent']

export default function ProcurementPage() {
  const { purchaseOrders, suppliers } = useData()
  const [activeFilter, setActiveFilter] = useState('Active')

  return (
    <AppLayout>
      <div className="space-y-6 md:space-y-10">
        {/* Editorial Header */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
            Procurement
          </h1>
          <p className="text-on-surface-variant max-w-md">
            Manage your organizational supply chain and purchase orders with architectural precision.
          </p>
        </motion.section>

        {/* Search & Filters */}
        <div className="space-y-4">
          <SearchBar placeholder="Search orders, suppliers, or items..." />
          <div className="flex flex-wrap gap-2 md:gap-3">
            {filterOptions.map((filter) => (
              <motion.button
                key={filter}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium text-sm transition-colors cursor-pointer flex items-center gap-2 ${
                  activeFilter === filter
                    ? filter === 'Urgent' 
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {filter === 'Urgent' && (
                  <span className="material-symbols-outlined text-sm filled">error</span>
                )}
                {filter}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bento Layout: POs & Suppliers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Purchase Orders Column */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="flex justify-between items-end px-1 md:px-2">
              <h2 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: 'var(--font-headline)' }}>
                Recent Purchase Orders
              </h2>
              <span className="text-sm text-primary font-bold cursor-pointer" style={{ fontFamily: 'var(--font-label)' }}>
                VIEW ALL
              </span>
            </div>

            <div className="space-y-3 md:space-y-4">
              {purchaseOrders.map((po, i) => (
                <motion.div
                  key={po.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`p-4 md:p-6 bg-surface-container-low rounded-2xl flex items-center justify-between group hover:bg-surface-container transition-all cursor-pointer relative overflow-hidden`}
                >
                  {po.urgent && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-error" />
                  )}
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                      <span className={`material-symbols-outlined ${po.urgent ? 'text-error' : 'text-primary'}`}>
                        {po.urgent ? 'warning' : 'receipt_long'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg">Order #{po.orderNumber}</h3>
                      <p className="text-on-surface-variant text-sm">{po.date} • {po.items} Items</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-lg md:text-xl font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
                      {po.amount}
                    </p>
                    <StatusBadge status={po.status} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Suppliers Sidebar */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-surface-container p-6 md:p-8 rounded-2xl"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                Preferred Suppliers
              </h2>
              <div className="space-y-6 md:space-y-8">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl overflow-hidden">
                        <img src={supplier.image} alt={supplier.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{supplier.name}</h4>
                        <p className="text-xs text-on-surface-variant">
                          {supplier.status === 'active' ? `Active ${supplier.orders} orders` : 'Reviewing contract'}
                        </p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${supplier.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 md:mt-8 py-3 md:py-4 bg-surface-container-highest rounded-full text-sm font-bold text-primary hover:bg-primary/5 transition-colors cursor-pointer">
                MANAGE SUPPLIERS
              </button>
            </motion.div>

            {/* Insight Float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-primary-container p-5 md:p-6 rounded-2xl text-on-primary-container relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="material-symbols-outlined mb-2">insights</span>
                <h3 className="font-bold mb-1">Procurement Insight</h3>
                <p className="text-sm opacity-90">Bulk ordering Apex supplies this month could save 15% in logistics costs.</p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>

      <FAB icon="add" />
    </AppLayout>
  )
}
