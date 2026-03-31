import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../hooks/useData'
import AppLayout from '../components/Layout/AppLayout'
import SearchBar from '../components/UI/SearchBar'
import StatusBadge from '../components/UI/StatusBadge'
import FAB from '../components/UI/FAB'

export default function SupportPage() {
  const { supportTickets, chatMessages, faqs } = useData()
  const [expandedFaq, setExpandedFaq] = useState(0)
  const [chatInput, setChatInput] = useState('')

  return (
    <AppLayout>
      <div className="space-y-8 md:space-y-12">
        {/* Hero Search Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 md:space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary" style={{ fontFamily: 'var(--font-headline)' }}>
              How can we help?
            </h1>
            <p className="text-on-surface-variant max-w-2xl">
              Search our knowledge base or check your existing tickets for updates on your business operations.
            </p>
          </div>
          <div className="max-w-3xl">
            <SearchBar placeholder="Search FAQs, tickets, or documentation..." />
          </div>
        </motion.section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Support Ticket List */}
          <div className="lg:col-span-8 space-y-4 md:space-y-6">
            <div className="flex items-center justify-between px-1 md:px-2">
              <h2 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: 'var(--font-headline)' }}>
                Active Tickets
              </h2>
              <button className="text-primary font-semibold text-sm hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-3 md:space-y-4">
              {supportTickets.map((ticket, i) => {
                const iconBgMap = {
                  secondary: 'bg-secondary-container text-on-secondary-container',
                  tertiary: 'bg-tertiary-container text-on-tertiary-container',
                  gray: 'bg-surface-container-highest text-outline',
                }
                return (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={`bg-surface-container-lowest p-4 md:p-6 rounded-2xl flex items-center justify-between group hover:bg-surface-container transition-colors cursor-pointer ${
                      ticket.status === 'Resolved' ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-5 min-w-0">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconBgMap[ticket.iconBg] || 'bg-primary-container text-on-primary-container'}`}>
                        <span className="material-symbols-outlined">{ticket.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm md:text-lg truncate">{ticket.title}</h3>
                        <p className="text-xs md:text-sm text-outline">Ticket #{ticket.ticketNumber} • Updated {ticket.updated}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 ml-2">
                      <StatusBadge status={ticket.status} />
                      <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform hidden md:block">
                        chevron_right
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Live Chat Preview */}
          <div className="lg:col-span-4 h-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-surface-container-high rounded-2xl p-1 h-full flex flex-col"
            >
              {/* Chat Header */}
              <div className="bg-primary text-on-primary p-4 md:p-6 rounded-t-2xl flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary/30">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHpbJ1vjGhvsyqki6MtsXCrPe060iRS2JhQLf5tp66X14NppzSNsNVp_PjZxZTJtGQr_lYjcpCf_sfHV-vAwZLaS_5CohGwivDsuHcAauzT71XigTUZZ7xMUkoFqokaQ2vWZISv0L0JhxBIFOlebi3S8tw573bOr0fkGmA-jzPiNefUmIAYB_FvWSb6kCYBIsZFHvZD6hZQJvpj-NrpvAoA03Q-iNDdI-ZVo0EY90ev5p3SOee2BC3Q4DNg7yzsRdpGfLT9QSIndQ" 
                      alt="Support agent" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-primary rounded-full" />
                </div>
                <div>
                  <p className="font-bold">Live Support</p>
                  <p className="text-xs opacity-80">Sarah is online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow p-4 md:p-6 space-y-4 bg-surface-container-lowest min-h-[250px] md:min-h-[300px]">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end ml-auto' : 'items-start'} max-w-[85%] ${msg.sender === 'user' ? 'ml-auto' : ''}`}>
                    <div className={`rounded-2xl p-3 text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary-container text-on-primary-container rounded-tr-none' 
                        : 'bg-surface-container rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-outline mt-1 mx-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 md:p-4 bg-surface-container-low rounded-b-2xl flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow bg-transparent border-none focus:ring-0 text-sm"
                />
                <button className="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-surface-container-low rounded-2xl p-6 md:p-8 lg:p-12"
        >
          <div className="mb-8 md:mb-10 text-center max-w-xl mx-auto space-y-3 md:space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-on-surface-variant">Quick answers to common questions about our business solutions.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? -1 : i)}
                  className="w-full px-5 md:px-8 py-4 md:py-6 flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="font-bold text-base md:text-lg pr-4">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="material-symbols-outlined text-primary flex-shrink-0"
                  >
                    expand_more
                  </motion.span>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-8 pb-4 md:pb-6 text-on-surface-variant leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <FAB icon="add" label="Raise Ticket" />
    </AppLayout>
  )
}
