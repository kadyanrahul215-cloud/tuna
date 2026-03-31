import { useAuth } from '../contexts/AuthContext'
import { mockData } from '../lib/supabase'

export function useData() {
  const { role } = useAuth()
  
  // For now returns mock data. When Supabase is configured,
  // these can be replaced with actual Supabase queries.
  return {
    kpiMetrics: mockData.kpiMetrics,
    activities: mockData.activities,
    purchaseOrders: mockData.purchaseOrders,
    suppliers: mockData.suppliers,
    supportTickets: mockData.supportTickets,
    chatMessages: mockData.chatMessages,
    faqs: mockData.faqs,
    interviews: mockData.interviews,
    jobPostings: mockData.jobPostings,
    profile: mockData.profile
  }
}
