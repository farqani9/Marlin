// Lead entity types
export interface Lead {
    id: string
    name: string
    company: string | null
    contact_name: string | null
    email: string | null
    phone: string | null
    status: LeadStatus
    source: string | null
    priority: Priority | null
    next_action: string | null
    next_action_date: string | null
    created_at: string
    updated_at: string
}

export type LeadStatus =
    | 'new'
    | 'qualified'
    | 'in_discussion'
    | 'proposal_sent'
    | 'follow_up_required'

// Deal entity types
export interface Deal {
    id: string
    title: string
    lead_id: string
    value: number
    stage: DealStage
    probability: number
    expected_close_date: string | null
    note: string | null
    created_at: string
    updated_at: string
}

export type DealStage =
    | 'new'
    | 'qualified'
    | 'proposal'
    | 'negotiation'
    | 'closed_won'
    | 'closed_lost'

// Task entity types
export interface Task {
    id: string
    title: string
    description: string | null
    due_date: string | null
    is_completed: boolean
    lead_id: string | null
    deal_id: string | null
    created_at: string
    updated_at: string
}

// Note entity types
export interface Note {
    id: string
    content: string
    lead_id: string | null
    deal_id: string | null
    created_at: string
    updated_at: string
}

// Activity log types
export interface ActivityLog {
    id: string
    entity_type: 'lead' | 'deal' | 'task' | 'note'
    entity_id: string
    action_type: string
    description: string
    metadata: Record<string, unknown> | null
    created_at: string
}

// Common types
export type Priority = 'low' | 'medium' | 'high'

// Form types
export type LeadFormData = Omit<Lead, 'id' | 'created_at' | 'updated_at'>
export type DealFormData = Omit<Deal, 'id' | 'created_at' | 'updated_at'>
export type TaskFormData = Omit<Task, 'id' | 'created_at' | 'updated_at'>
export type NoteFormData = Omit<Note, 'id' | 'created_at' | 'updated_at'>
