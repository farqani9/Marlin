import type { Lead, Deal, Task, Note, ActivityLog } from '@/types'

// Mock Leads
export const mockLeads: Lead[] = [
    {
        id: '1',
        name: 'John Smith',
        company: 'Acme Corporation',
        contact_name: 'John Smith',
        email: 'john@acme.com',
        phone: '+1 555-0101',
        status: 'qualified',
        source: 'Website',
        priority: 'high',
        next_action: 'Schedule demo call',
        next_action_date: '2024-12-10',
        created_at: '2024-12-01T10:00:00Z',
        updated_at: '2024-12-05T14:30:00Z',
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        company: 'TechStart Inc',
        contact_name: 'Sarah Johnson',
        email: 'sarah@techstart.io',
        phone: '+1 555-0102',
        status: 'proposal_sent',
        source: 'Referral',
        priority: 'high',
        next_action: 'Follow up on proposal',
        next_action_date: '2024-12-08',
        created_at: '2024-11-28T09:00:00Z',
        updated_at: '2024-12-04T11:00:00Z',
    },
    {
        id: '3',
        name: 'Mike Chen',
        company: 'Global Industries',
        contact_name: 'Mike Chen',
        email: 'mchen@global.com',
        phone: '+1 555-0103',
        status: 'new',
        source: 'LinkedIn',
        priority: 'medium',
        next_action: 'Send intro email',
        next_action_date: '2024-12-06',
        created_at: '2024-12-05T08:00:00Z',
        updated_at: '2024-12-05T08:00:00Z',
    },
    {
        id: '4',
        name: 'Emily Davis',
        company: 'Startup Labs',
        contact_name: 'Emily Davis',
        email: 'emily@startuplabs.co',
        phone: '+1 555-0104',
        status: 'in_discussion',
        source: 'Conference',
        priority: 'medium',
        next_action: 'Send case studies',
        next_action_date: '2024-12-12',
        created_at: '2024-11-20T15:00:00Z',
        updated_at: '2024-12-03T16:00:00Z',
    },
    {
        id: '5',
        name: 'David Wilson',
        company: 'Enterprise Solutions',
        contact_name: 'David Wilson',
        email: 'dwilson@enterprise.com',
        phone: '+1 555-0105',
        status: 'follow_up_required',
        source: 'Cold Outreach',
        priority: 'low',
        next_action: 'Check in next week',
        next_action_date: '2024-12-15',
        created_at: '2024-11-15T10:00:00Z',
        updated_at: '2024-12-01T09:00:00Z',
    },
]

// Mock Deals
export const mockDeals: Deal[] = [
    {
        id: '1',
        title: 'Acme Enterprise Package',
        lead_id: '1',
        value: 45000,
        stage: 'proposal',
        probability: 60,
        expected_close_date: '2024-12-20',
        note: 'Large deal, needs VP approval',
        created_at: '2024-12-02T10:00:00Z',
        updated_at: '2024-12-05T14:00:00Z',
    },
    {
        id: '2',
        title: 'TechStart SaaS License',
        lead_id: '2',
        value: 24000,
        stage: 'negotiation',
        probability: 75,
        expected_close_date: '2024-12-15',
        note: 'Annual contract, discussing terms',
        created_at: '2024-11-30T09:00:00Z',
        updated_at: '2024-12-04T11:00:00Z',
    },
    {
        id: '3',
        title: 'Global Industries Pilot',
        lead_id: '3',
        value: 15000,
        stage: 'new',
        probability: 20,
        expected_close_date: '2025-01-15',
        note: null,
        created_at: '2024-12-05T08:00:00Z',
        updated_at: '2024-12-05T08:00:00Z',
    },
    {
        id: '4',
        title: 'Startup Labs Growth Plan',
        lead_id: '4',
        value: 36000,
        stage: 'qualified',
        probability: 40,
        expected_close_date: '2024-12-30',
        note: 'Interested in multi-year',
        created_at: '2024-11-25T15:00:00Z',
        updated_at: '2024-12-03T16:00:00Z',
    },
]

// Mock Tasks
export const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Follow up with Acme Corp about proposal',
        description: 'Call John to discuss the enterprise package details',
        due_date: '2024-12-06',
        is_completed: false,
        lead_id: '1',
        deal_id: '1',
        created_at: '2024-12-03T10:00:00Z',
        updated_at: '2024-12-03T10:00:00Z',
    },
    {
        id: '2',
        title: 'Send pricing document to TechStart',
        description: null,
        due_date: '2024-12-07',
        is_completed: false,
        lead_id: '2',
        deal_id: '2',
        created_at: '2024-12-04T09:00:00Z',
        updated_at: '2024-12-04T09:00:00Z',
    },
    {
        id: '3',
        title: 'Schedule demo with Global Industries',
        description: 'Mike requested a product demo',
        due_date: '2024-12-10',
        is_completed: false,
        lead_id: '3',
        deal_id: null,
        created_at: '2024-12-05T08:00:00Z',
        updated_at: '2024-12-05T08:00:00Z',
    },
    {
        id: '4',
        title: 'Review contract terms',
        description: null,
        due_date: '2024-12-05',
        is_completed: true,
        lead_id: '2',
        deal_id: '2',
        created_at: '2024-12-01T14:00:00Z',
        updated_at: '2024-12-05T11:00:00Z',
    },
]

// Helper to get lead by id
export function getLeadById(id: string): Lead | undefined {
    return mockLeads.find((lead) => lead.id === id)
}

// Helper to get deals for a lead
export function getDealsForLead(leadId: string): Deal[] {
    return mockDeals.filter((deal) => deal.lead_id === leadId)
}

// Helper to get tasks for a lead
export function getTasksForLead(leadId: string): Task[] {
    return mockTasks.filter((task) => task.lead_id === leadId)
}
