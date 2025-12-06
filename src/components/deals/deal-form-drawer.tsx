'use client'

import { useState, useEffect } from 'react'
import { FormDrawer } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { mockLeads } from '@/lib/mock-data'
import type { Deal, DealStage } from '@/types'

interface DealFormDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    deal?: Deal | null
    onSubmit?: (data: Partial<Deal>) => void
    preselectedLeadId?: string
}

const stageOptions: { value: DealStage; label: string }[] = [
    { value: 'new', label: 'New' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed_won', label: 'Closed Won' },
    { value: 'closed_lost', label: 'Closed Lost' },
]

export function DealFormDrawer({
    open,
    onOpenChange,
    deal,
    onSubmit,
    preselectedLeadId,
}: DealFormDrawerProps) {
    const isEditing = !!deal

    const [formData, setFormData] = useState({
        title: '',
        lead_id: preselectedLeadId || '',
        value: '',
        stage: 'new' as DealStage,
        probability: '20',
        expected_close_date: '',
        note: '',
    })

    // Reset form when deal changes or drawer opens
    useEffect(() => {
        if (deal) {
            setFormData({
                title: deal.title,
                lead_id: deal.lead_id,
                value: String(deal.value),
                stage: deal.stage,
                probability: String(deal.probability),
                expected_close_date: deal.expected_close_date || '',
                note: deal.note || '',
            })
        } else {
            setFormData({
                title: '',
                lead_id: preselectedLeadId || '',
                value: '',
                stage: 'new',
                probability: '20',
                expected_close_date: '',
                note: '',
            })
        }
    }, [deal, preselectedLeadId, open])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title.trim()) {
            toast.error('Deal title is required')
            return
        }

        if (!formData.lead_id) {
            toast.error('Please select a lead')
            return
        }

        if (!formData.value || isNaN(Number(formData.value))) {
            toast.error('Please enter a valid deal value')
            return
        }

        onSubmit?.({
            title: formData.title,
            lead_id: formData.lead_id,
            value: Number(formData.value),
            stage: formData.stage,
            probability: Number(formData.probability),
            expected_close_date: formData.expected_close_date || null,
            note: formData.note || null,
        })
        toast.success(isEditing ? 'Deal updated successfully' : 'Deal created successfully')
        onOpenChange(false)
    }

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Auto-update probability based on stage
    const handleStageChange = (stage: DealStage) => {
        const probabilityMap: Record<DealStage, string> = {
            new: '10',
            qualified: '30',
            proposal: '50',
            negotiation: '70',
            closed_won: '100',
            closed_lost: '0',
        }
        setFormData((prev) => ({
            ...prev,
            stage,
            probability: probabilityMap[stage],
        }))
    }

    return (
        <FormDrawer
            open={open}
            onOpenChange={onOpenChange}
            title={isEditing ? 'Edit Deal' : 'New Deal'}
            description={
                isEditing
                    ? 'Update the deal information below.'
                    : 'Fill in the details to create a new deal.'
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Deal Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">Deal Title *</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        placeholder="Enterprise Package"
                    />
                </div>

                {/* Lead Selection */}
                <div className="space-y-2">
                    <Label>Linked Lead *</Label>
                    <Select
                        value={formData.lead_id}
                        onValueChange={(value) => updateField('lead_id', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a lead" />
                        </SelectTrigger>
                        <SelectContent>
                            {mockLeads.map((lead) => (
                                <SelectItem key={lead.id} value={lead.id}>
                                    {lead.name} {lead.company && `(${lead.company})`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Value & Probability */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="value">Deal Value ($) *</Label>
                        <Input
                            id="value"
                            type="number"
                            value={formData.value}
                            onChange={(e) => updateField('value', e.target.value)}
                            placeholder="25000"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="probability">Probability (%)</Label>
                        <Input
                            id="probability"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.probability}
                            onChange={(e) => updateField('probability', e.target.value)}
                        />
                    </div>
                </div>

                {/* Stage */}
                <div className="space-y-2">
                    <Label>Stage</Label>
                    <Select
                        value={formData.stage}
                        onValueChange={(value) => handleStageChange(value as DealStage)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select stage" />
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

                {/* Expected Close Date */}
                <div className="space-y-2">
                    <Label htmlFor="expected_close_date">Expected Close Date</Label>
                    <Input
                        id="expected_close_date"
                        type="date"
                        value={formData.expected_close_date}
                        onChange={(e) => updateField('expected_close_date', e.target.value)}
                    />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <Label htmlFor="note">Notes</Label>
                    <Textarea
                        id="note"
                        value={formData.note}
                        onChange={(e) => updateField('note', e.target.value)}
                        placeholder="Additional notes about this deal..."
                        rows={3}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">
                        {isEditing ? 'Save Changes' : 'Create Deal'}
                    </Button>
                </div>
            </form>
        </FormDrawer>
    )
}
