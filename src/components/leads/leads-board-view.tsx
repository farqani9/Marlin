'use client'

import { useState } from 'react'
import Link from 'next/link'
import { StatusBadge } from '@/components/common'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Lead, LeadStatus } from '@/types'

interface LeadsBoardViewProps {
    leads: Lead[]
    onStatusChange?: (leadId: string, newStatus: LeadStatus) => void
}

const columns: { status: LeadStatus; title: string; color: string }[] = [
    { status: 'new', title: 'New', color: 'border-t-blue-500' },
    { status: 'qualified', title: 'Qualified', color: 'border-t-green-500' },
    { status: 'in_discussion', title: 'In Discussion', color: 'border-t-yellow-500' },
    { status: 'proposal_sent', title: 'Proposal Sent', color: 'border-t-purple-500' },
    { status: 'follow_up_required', title: 'Follow-up', color: 'border-t-orange-500' },
]

export function LeadsBoardView({ leads, onStatusChange }: LeadsBoardViewProps) {
    const [draggedLead, setDraggedLead] = useState<string | null>(null)

    const getLeadsForColumn = (status: LeadStatus) => {
        return leads.filter((lead) => lead.status === status)
    }

    const handleDragStart = (e: React.DragEvent, leadId: string) => {
        setDraggedLead(leadId)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e: React.DragEvent, status: LeadStatus) => {
        e.preventDefault()
        if (draggedLead && onStatusChange) {
            onStatusChange(draggedLead, status)
        }
        setDraggedLead(null)
    }

    const handleDragEnd = () => {
        setDraggedLead(null)
    }

    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
                <div
                    key={column.status}
                    className={cn(
                        'flex-shrink-0 w-72 rounded-lg border border-t-4 bg-card',
                        column.color
                    )}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.status)}
                >
                    {/* Column Header */}
                    <div className="p-3 border-b">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm">{column.title}</h3>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                {getLeadsForColumn(column.status).length}
                            </span>
                        </div>
                    </div>

                    {/* Column Content */}
                    <div className="p-2 space-y-2 min-h-[400px]">
                        {getLeadsForColumn(column.status).map((lead) => (
                            <Card
                                key={lead.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, lead.id)}
                                onDragEnd={handleDragEnd}
                                className={cn(
                                    'p-3 cursor-grab active:cursor-grabbing transition-all',
                                    draggedLead === lead.id && 'opacity-50 ring-2 ring-primary'
                                )}
                            >
                                <Link
                                    href={`/leads/${lead.id}`}
                                    className="block hover:underline font-medium text-sm"
                                >
                                    {lead.name}
                                </Link>
                                {lead.company && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {lead.company}
                                    </p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                    {lead.priority && (
                                        <StatusBadge status={lead.priority} />
                                    )}
                                    {lead.next_action_date && (
                                        <span className="text-xs text-muted-foreground">
                                            {lead.next_action_date}
                                        </span>
                                    )}
                                </div>
                                {lead.next_action && (
                                    <p className="text-xs text-muted-foreground mt-2 truncate">
                                        {lead.next_action}
                                    </p>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
