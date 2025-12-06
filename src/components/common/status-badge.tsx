import { cn } from '@/lib/utils'
import type { LeadStatus, DealStage, Priority } from '@/types'

type StatusType = LeadStatus | DealStage | Priority | 'completed' | 'pending'

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    // Lead statuses
    new: { bg: 'bg-blue-500/10', text: 'text-blue-500', label: 'New' },
    qualified: { bg: 'bg-green-500/10', text: 'text-green-500', label: 'Qualified' },
    in_discussion: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', label: 'In Discussion' },
    proposal_sent: { bg: 'bg-purple-500/10', text: 'text-purple-500', label: 'Proposal Sent' },
    follow_up_required: { bg: 'bg-orange-500/10', text: 'text-orange-500', label: 'Follow-up' },

    // Deal stages
    proposal: { bg: 'bg-purple-500/10', text: 'text-purple-500', label: 'Proposal' },
    negotiation: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', label: 'Negotiation' },
    closed_won: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', label: 'Won' },
    closed_lost: { bg: 'bg-red-500/10', text: 'text-red-500', label: 'Lost' },

    // Priority
    high: { bg: 'bg-red-500/10', text: 'text-red-500', label: 'High' },
    medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', label: 'Medium' },
    low: { bg: 'bg-slate-500/10', text: 'text-slate-400', label: 'Low' },

    // Task status
    completed: { bg: 'bg-green-500/10', text: 'text-green-500', label: 'Completed' },
    pending: { bg: 'bg-slate-500/10', text: 'text-slate-400', label: 'Pending' },
}

interface StatusBadgeProps {
    status: StatusType
    className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status] || { bg: 'bg-slate-500/10', text: 'text-slate-400', label: status }

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                config.bg,
                config.text,
                className
            )}
        >
            {config.label}
        </span>
    )
}
