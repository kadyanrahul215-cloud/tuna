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
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLLo6fTZleczsR9bIp0SIR8BsmiF6YN6r6M8iSDAJgdWT5x0tPifM9TV6fgMKiGsF-ob_uySgs30FaIzDSEAfjLoAH5xImT6A2A352etCZxL2tQG2DZewtGU65GufNNNX-Y5bO5UtVY58TlI2c6va8-CZ9Ua9Hta8WiyS-4p6KqVXqlvg9uWr03mMBITvRBLAoH9J9ZiCCAjmSK7Wma-N4Upl9B9DQMqoSq6yujbuYdi58vkxI7Tk-aLt1DH8uLcYOTuNE_P9cvTs'
  },
  kpiMetrics: [
    { id: 1, label: 'Purchase Orders', value: '$45,200', change: '+12.4%', changeType: 'positive', icon: 'shopping_cart', status: 'Active' },
    { id: 2, label: 'Google Ranking', value: '#4', change: 'Up 2 positions', changeType: 'positive', icon: 'leaderboard', status: 'Top 10' },
    { id: 3, label: 'Support Tickets', value: '12', change: '66%', changeType: 'neutral', icon: 'support_agent', status: '8 Resolved' }
  ],
  activities: [
    { id: 1, title: 'Batch Procurement #9422', subtitle: 'Requested by Procurement Dept.', status: 'Active', statusColor: 'blue', icon: 'inventory_2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7CCkgB5AAixX05Xhna7Eva_h-GF_Vt-Ng2oEbD0Ncder024G7Az3WoaN3DfxVpv_-nZUe2LdQQcY5oihREO0t_d869avnqB1tBzq-YrNBnxwugSpx-3qEGKtGXYllAvMuT-5PwWzwvGoSHMfK2u0X_7Jm41GRpvmST5q_rxXv7DHV_yr6Pb-zKSTADAzwI7VAHm3GIlH2RX3b8_lYKy5bTklWVbVmoAJEoZtJRsrHLyX0ifk-hM-oyCgMkAIY5AUwViOXZ2UzToM' },
    { id: 2, title: 'High Priority Support Ticket', subtitle: 'Critical server latency reported', status: 'Urgent', statusColor: 'red', icon: 'warning', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKa4bpqhEHB7K6v7dqyTOAn3k_kO1LcwE8At-WEaLn94EHL4p0uEPIV-djz1RgfQNFEM6nYP084BUyXZKkpBpCjLPX3lXgceexvRjn2sa_MEfwLlIgjMBP0oPQ_aZKmKY-v2kNXtbnGqvbOOIzA88ME7ruPHImdvvFxm3UnOzt_qlBCcXEYLIeDb7yFsWCOsTDqt-BfZGC-KCTY64cHPhZeXDF5-eW5dvsmNmJpW3N2p4qx-KxgJXAqAKf_mbW417aHP82aML7CB4' },
    { id: 3, title: 'Quarterly Audit Report', subtitle: 'Awaiting management sign-off', status: 'Review', statusColor: 'gray', icon: 'rate_review', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGKVBt_RboGROQddb_n9Ytn_w7siy3CQ-am-we62Ro1QcAgS0V-LBtLuSB8Y_Wq00IlerHLjfjUwfKz0WsIzZgFvDY-mjTOOKsYf54bw0iJPC4iX5NLl0dqNIbFLNDxIboHtfINFPXJTWW9QDXjP-1WWuUv7mqlOkCqesJPpPIkUvl-aG7xjDBFQJeyuS_4l-kfNeKPLvROnDmkgpzuQgCSiZBVfSqxCb8tDLPb3U6JmCINzypbZl3Aqn6MY5GkTTSuTeVMyQp-XE' },
    { id: 4, title: 'Vendor Onboarding: Zenith Corp', subtitle: 'Document verification phase', status: 'Pending', statusColor: 'purple', icon: 'schedule', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-uvbHLPMvCDG0Jw-EjUDlXPoUym-Q3Aw6x6FwF-KxaF-R6PU1rUzfqy15vMAwPolK3qTXAMVbttumy9AG8SkCZhfph9bTRJhf520OH9abUjDIDpimx7_522vo22Ss9SRo8L_NyYbk9JOimNpPoO-8xu6c1WnyFrf_HMdLav2wx8c_7y2o9ww_jg1Ouo4iTvAx7fYkEb2cyKfDNcMyHvyx564a4bo9cnPdszxEsultrnddcfTaPT_PApuPm-bsyugnKQFCb6Iaevo' }
  ],
  purchaseOrders: [
    { id: 1, orderNumber: 'PO-8821', amount: '$12,450.00', items: 12, date: 'Oct 24, 2023', status: 'Delivered', urgent: false },
    { id: 2, orderNumber: 'PO-8822', amount: '$3,200.50', items: 4, date: 'Oct 22, 2023', status: 'In Review', urgent: false },
    { id: 3, orderNumber: 'PO-8824', amount: '$45,000.00', items: 22, date: 'Oct 21, 2023', status: 'Urgent', urgent: true }
  ],
  suppliers: [
    { id: 1, name: 'Global Logistics Co', orders: 48, status: 'active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiFuYkCv7e_xagCn7y76VRthmFPDUmLYDDNKICYv395UFFxENtv28dAfKXJnSR-XVWGSQGwf4lIq1bovrMV3BxCDYWbstRYXTFicm4nzR_S-trY_Auipi1jf685nGma6DWY4q-EIA8SOOStu9uZySqVTBh3s4yztyWrD0XnqfwceXUw88x--cwFKifjpi04U5XIiOTZ8YH2EZjuUG6uVqkxFxIX9xJWTe3W9b1i2cf0oEZEZqb8L9qXaI8hg-Ifcp69Gma-XuUAT8' },
    { id: 2, name: 'Apex Manufacturing', orders: 12, status: 'active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8YeUweQbUyVD4gLLNBUxCvHh8tcPD-DljzDlEGfsJy9v56BL1w5pKFvqzedbP8QO8y2rofhizK-O2GV4xw5Ptkn3p-gFj1vdL6PdVCnNQ3V1LF-S6seo4pkUm6VP9MPnDawYKVJw98P1NcXzo5XXDkzy5H3OJ6oBhU_sO7TV2Vclt5R1DRntl8mtHL9iG1QuZLI6ebsbFexOEwxtTKYHrxGUzUqcm7LYRQBBOjgekruml-N1FyjgCdyn-japeTWTRMMnZeppFQP0' },
    { id: 3, name: 'Studio Design Pro', orders: 0, status: 'reviewing', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBgYIcb2cJC2_54SHZSDp_zpSZb_3h_G15tdIOaRI_rl5LBWgAFTE-aLiTQ0VGH-hMMryL_WGghYDR25HOiLXp9fpQujQ8eg0FD-mCNAZs9Kh9yyN7FTksEs3p7Zk5O_pzR1LWj9Z8_4qBrsYGrabYoPbffBiFTT9m_I-2WvQSpIQFNvFBAFN7XNJ9--Rv8gO4-BR4N8qo1lJ1M66A7hh3wVdkc81ISwcmwOfuw_haAesh0ptpsly_eLfjEHkSWqOJtB4viHlDjsI' }
  ],
  supportTickets: [
    { id: 1, ticketNumber: 'TB-8942', title: 'Billing discrepancy in Q3 report', status: 'In Progress', updated: '2h ago', icon: 'receipt_long', iconBg: 'secondary' },
    { id: 2, ticketNumber: 'TB-8931', title: 'API integration latency issues', status: 'Open', updated: '5h ago', icon: 'api', iconBg: 'tertiary' },
    { id: 3, ticketNumber: 'TB-8890', title: 'New seat allocation request', status: 'Resolved', updated: 'yesterday', icon: 'person_add', iconBg: 'gray' }
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
