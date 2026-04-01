import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = supabaseUrl && supabaseAnonKey &&
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-key')

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = isConfigured

// ===== MOCK DATA =====
export const mockData = {
  profile: {
    id: '1',
    email: 'alex@tunabusiness.com',
    full_name: 'Alex Johnson',
    role: 'management',
    avatar_url: null,
  },
  kpiMetrics: [
    { id: 1, label: 'Purchase Orders', value: '$45,200', change: '+12.4%', changeType: 'positive', icon: 'shopping_cart', status: 'Active' },
    { id: 2, label: 'Google Ranking', value: '#4', change: 'Up 2 positions', changeType: 'positive', icon: 'leaderboard', status: 'Top 10' },
    { id: 3, label: 'Support Tickets', value: '12', change: '66%', changeType: 'neutral', icon: 'support_agent', status: '8 Resolved' }
  ],
  activities: [
    { id: 1, title: 'Batch Procurement #9422', subtitle: 'Requested by Procurement Dept.', status: 'Active', icon: 'inventory_2' },
    { id: 2, title: 'High Priority Support Ticket', subtitle: 'Critical server latency reported', status: 'Urgent', icon: 'warning' },
    { id: 3, title: 'Quarterly Audit Report', subtitle: 'Awaiting management sign-off', status: 'Review', icon: 'rate_review' },
    { id: 4, title: 'Vendor Onboarding: Zenith Corp', subtitle: 'Document verification phase', status: 'Pending', icon: 'schedule' }
  ],
  purchaseOrders: [
    { id: 1, orderNumber: 'PO-8821', amount: '$12,450.00', items: 12, date: 'Oct 24, 2023', status: 'Delivered', urgent: false },
    { id: 2, orderNumber: 'PO-8822', amount: '$3,200.50', items: 4, date: 'Oct 22, 2023', status: 'In Review', urgent: false },
    { id: 3, orderNumber: 'PO-8824', amount: '$45,000.00', items: 22, date: 'Oct 21, 2023', status: 'Urgent', urgent: true }
  ],
  suppliers: [
    { id: 1, name: 'Global Logistics Co', orders: 48, status: 'active' },
    { id: 2, name: 'Apex Manufacturing', orders: 12, status: 'active' },
    { id: 3, name: 'Studio Design Pro', orders: 0, status: 'reviewing' }
  ],
  supportTickets: [
    { id: 1, ticketNumber: 'TB-8942', title: 'Billing discrepancy in Q3 report', status: 'In Progress', updated: '2h ago', icon: 'receipt_long' },
    { id: 2, ticketNumber: 'TB-8931', title: 'API integration latency issues', status: 'Open', updated: '5h ago', icon: 'api' },
    { id: 3, ticketNumber: 'TB-8890', title: 'New seat allocation request', status: 'Resolved', updated: 'yesterday', icon: 'person_add' }
  ],
  chatMessages: [
    { id: 1, sender: 'agent', text: "Hello! I'm Sarah from TUNA Business. How can I help you today?", time: '10:24 AM' },
    { id: 2, sender: 'user', text: 'I have a question about my enterprise API keys.', time: '10:25 AM' }
  ],
  faqs: [
    { id: 1, question: 'How do I upgrade my business license?', answer: 'You can upgrade your license directly from the "Organization Settings" tab in your profile. Select "Billing" and choose the tier that best fits your growing business needs.' },
    { id: 2, question: 'What is the average response time for Support?', answer: 'Our enterprise support team typically responds within 2 hours during business hours. Critical issues are prioritized and handled within 30 minutes.' },
    { id: 3, question: 'Can I export my support history to PDF?', answer: 'Yes! Navigate to Support > History and click the "Export" button. You can choose PDF, CSV, or JSON format for your records.' }
  ],
  interviews: [
    { id: 1, name: 'Jordan Sterling', position: 'Senior Cloud Architect', round: 'Technical Round 2', day: '14', month: 'Oct', time: '09:30 AM', location: 'Meeting Room 4C' },
    { id: 2, name: 'Elena Vance', position: 'Lead Product Designer', round: 'Portfolio Review', day: '14', month: 'Oct', time: '11:00 AM', location: 'Virtual Link' },
    { id: 3, name: 'Marcus Thorne', position: 'DevOps Engineer', round: 'HR Culture Fit', day: '15', month: 'Oct', time: '02:30 PM', location: 'Meeting Room 2B' }
  ],
  jobPostings: [
    { id: 1, title: 'Senior Product Analyst', type: 'Remote', salaryRange: '$140k - $180k', description: "Leading market strategy and data-driven insights for TUNA's enterprise suite.", department: 'Engineering' },
    { id: 2, title: 'Principal Architect', type: 'On-site', salaryRange: '$190k - $240k', description: 'Architecting the next generation of scalable B2B infrastructure.', department: 'Engineering' },
    { id: 3, title: 'UX Research Lead', type: 'Hybrid', salaryRange: '$130k - $160k', description: 'Directing human-centric research initiatives across our product ecosystem.', department: 'Design' }
  ]
}
