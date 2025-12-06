'use client'

import { useState } from 'react'
import Link from 'next/link'
import { StatusBadge } from '@/components/common'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Deal, DealStage } from '@/types'

interface DealsBoardViewProps {
    deals: Deal[]
    onStageChange?: (dealId: string, newStage: DealStage) => void
    getLeadName?: (leadId: string) => string
}

const columns: { stage: DealStage; title: string; color: string }[] = [
    { stage: 'new', title: 'New', color: 'border-t-blue-500' },
    { stage: 'qualified', title: 'Qualified', color: 'border-t-green-500' },
    { stage: 'proposal', title: 'Proposal', color: 'border-t-purple-500' },
    { stage: 'negotiation', title: 'Negotiation', color: 'border-t-indigo-500' },
    { stage: 'closed_won', title: 'Won', color: 'border-t-emerald-500' },
    { stage: 'closed_lost', title: 'Lost', color: 'border-t-red-500' },
]

export function DealsBoardView({ deals, onStageChange, getLeadName }: DealsBoardViewProps) {
    const [draggedDeal, setDraggedDeal] = useState<string | null>(null)

    const getDealsForColumn = (stage: DealStage) => {
        return deals.filter((deal) => deal.stage === stage)
    }

    const getTotalValue = (stage: DealStage) => {
        return getDealsForColumn(stage).reduce((sum, deal) => sum + deal.value, 0)
    }

    const handleDragStart = (e: React.DragEvent, dealId: string) => {
        setDraggedDeal(dealId)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e: React.DragEvent, stage: DealStage) => {
        e.preventDefault()
        if (draggedDeal && onStageChange) {
            onStageChange(draggedDeal, stage)
        }
        setDraggedDeal(null)
    }

    const handleDragEnd = () => {
        setDraggedDeal(null)
    }

    const formatValue = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
                <div
                    key={column.stage}
                    className={cn(
                        'flex-shrink-0 w-72 rounded-lg border border-t-4 bg-card',
                        column.color
                    )}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.stage)}
                >
                    {/* Column Header */}
                    <div className="p-3 border-b">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm">{column.title}</h3>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                {getDealsForColumn(column.stage).length}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {formatValue(getTotalValue(column.stage))}
                        </p>
                    </div>

                    {/* Column Content */}
                    <div className="p-2 space-y-2 min-h-[400px]">
                        {getDealsForColumn(column.stage).map((deal) => (
                            <Card
                                key={deal.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, deal.id)}
                                onDragEnd={handleDragEnd}
                                className={cn(
                                    'p-3 cursor-grab active:cursor-grabbing transition-all',
                                    draggedDeal === deal.id && 'opacity-50 ring-2 ring-primary'
                                )}
                            >
                                <Link
                                    href={`/deals/${deal.id}`}
                                    className="block hover:underline font-medium text-sm"
                                >
                                    {deal.title}
                                </Link>
                                {getLeadName && deal.lead_id && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {getLeadName(deal.lead_id)}
                                    </p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-semibold text-green-500">
                                        {formatValue(deal.value)}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {deal.probability}%
                                    </span>
                                </div>
                                {deal.expected_close_date && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Close: {deal.expected_close_date}
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
