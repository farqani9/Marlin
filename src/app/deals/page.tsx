'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout'
import { DealsBoardView, DealFormDrawer } from '@/components/deals'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Plus, Search } from 'lucide-react'
import { mockDeals, mockLeads } from '@/lib/mock-data'
import { toast } from 'sonner'
import type { Deal, DealStage } from '@/types'

const stageOptions: { value: DealStage | 'all'; label: string }[] = [
    { value: 'all', label: 'All Stages' },
    { value: 'new', label: 'New' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed_won', label: 'Closed Won' },
    { value: 'closed_lost', label: 'Closed Lost' },
]

export default function DealsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [stageFilter, setStageFilter] = useState<DealStage | 'all'>('all')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
    const [deals, setDeals] = useState(mockDeals)

    // Filter deals based on search and stage
    const filteredDeals = deals.filter((deal) => {
        const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStage = stageFilter === 'all' || deal.stage === stageFilter
        return matchesSearch && matchesStage
    })

    const getLeadName = (leadId: string) => {
        const lead = mockLeads.find((l) => l.id === leadId)
        return lead ? lead.name : 'Unknown'
    }

    const handleNewDeal = () => {
        setEditingDeal(null)
        setIsFormOpen(true)
    }

    const handleFormSubmit = (data: Partial<Deal>) => {
        if (editingDeal) {
            setDeals((prev) =>
                prev.map((d) => (d.id === editingDeal.id ? { ...d, ...data } : d))
            )
        } else {
            const newDeal: Deal = {
                id: String(Date.now()),
                title: data.title || '',
                lead_id: data.lead_id || '',
                value: data.value || 0,
                stage: data.stage || 'new',
                probability: data.probability || 20,
                expected_close_date: data.expected_close_date ?? null,
                note: data.note ?? null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
            setDeals((prev) => [newDeal, ...prev])
        }
    }

    const handleStageChange = (dealId: string, newStage: DealStage) => {
        setDeals((prev) =>
            prev.map((d) =>
                d.id === dealId
                    ? { ...d, stage: newStage, updated_at: new Date().toISOString() }
                    : d
            )
        )
        const stageName = stageOptions.find((s) => s.value === newStage)?.label
        toast.success(`Deal moved to ${stageName}`)
    }

    // Calculate pipeline metrics
    const totalPipelineValue = deals
        .filter((d) => d.stage !== 'closed_lost' && d.stage !== 'closed_won')
        .reduce((sum, deal) => sum + deal.value, 0)

    const weightedValue = deals
        .filter((d) => d.stage !== 'closed_lost' && d.stage !== 'closed_won')
        .reduce((sum, deal) => sum + (deal.value * deal.probability) / 100, 0)

    const formatValue = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <AppLayout title="Deals">
            {/* Pipeline Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm text-muted-foreground">Open Deals</p>
                    <p className="text-2xl font-bold">
                        {deals.filter((d) => d.stage !== 'closed_won' && d.stage !== 'closed_lost').length}
                    </p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm text-muted-foreground">Pipeline Value</p>
                    <p className="text-2xl font-bold">{formatValue(totalPipelineValue)}</p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm text-muted-foreground">Weighted Value</p>
                    <p className="text-2xl font-bold">{formatValue(weightedValue)}</p>
                </div>
            </div>

            {/* Header with actions */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 flex-1">
                    {/* Search */}
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search deals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Stage Filter */}
                    <Select
                        value={stageFilter}
                        onValueChange={(value) => setStageFilter(value as DealStage | 'all')}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Stage" />
                        </SelectTrigger>
                        <SelectContent>
                            {stageOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* New Deal Button */}
                <Button className="gap-2" onClick={handleNewDeal}>
                    <Plus className="h-4 w-4" />
                    New Deal
                </Button>
            </div>

            {/* Deals Board */}
            <DealsBoardView
                deals={filteredDeals}
                onStageChange={handleStageChange}
                getLeadName={getLeadName}
            />

            {/* Deal Form Drawer */}
            <DealFormDrawer
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                deal={editingDeal}
                onSubmit={handleFormSubmit}
            />
        </AppLayout>
    )
}
