'use client'

import { useState } from 'react'
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
import { toast } from 'sonner'
import type { Lead, LeadStatus, Priority } from '@/types'

interface LeadFormDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    lead?: Lead | null
    onSubmit?: (data: Partial<Lead>) => void
}

const statusOptions: { value: LeadStatus; label: string }[] = [
    { value: 'new', label: 'New' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'in_discussion', label: 'In Discussion' },
    { value: 'proposal_sent', label: 'Proposal Sent' },
    { value: 'follow_up_required', label: 'Follow-up Required' },
]

const priorityOptions: { value: Priority; label: string }[] = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
]

const sourceOptions = [
    'Website',
    'Referral',
    'LinkedIn',
    'Cold Outreach',
    'Conference',
    'Other',
]

export function LeadFormDrawer({
    open,
    onOpenChange,
    lead,
    onSubmit,
}: LeadFormDrawerProps) {
    const isEditing = !!lead

    const [formData, setFormData] = useState({
        name: lead?.name || '',
        company: lead?.company || '',
        contact_name: lead?.contact_name || '',
        email: lead?.email || '',
        phone: lead?.phone || '',
        status: lead?.status || 'new',
        source: lead?.source || '',
        priority: lead?.priority || 'medium',
        next_action: lead?.next_action || '',
        next_action_date: lead?.next_action_date || '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim()) {
            toast.error('Lead name is required')
            return
        }

        onSubmit?.(formData)
        toast.success(isEditing ? 'Lead updated successfully' : 'Lead created successfully')
        onOpenChange(false)
    }

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <FormDrawer
            open={open}
            onOpenChange={onOpenChange}
            title={isEditing ? 'Edit Lead' : 'New Lead'}
            description={
                isEditing
                    ? 'Update the lead information below.'
                    : 'Fill in the details to create a new lead.'
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Lead Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Lead Name *</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="John Smith"
                    />
                </div>

                {/* Company */}
                <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        placeholder="Acme Corporation"
                    />
                </div>

                {/* Contact Name */}
                <div className="space-y-2">
                    <Label htmlFor="contact_name">Contact Name</Label>
                    <Input
                        id="contact_name"
                        value={formData.contact_name}
                        onChange={(e) => updateField('contact_name', e.target.value)}
                        placeholder="Contact person name"
                    />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder="+1 555-0101"
                        />
                    </div>
                </div>

                {/* Status & Priority */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => updateField('status', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select
                            value={formData.priority}
                            onValueChange={(value) => updateField('priority', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                {priorityOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Source */}
                <div className="space-y-2">
                    <Label>Lead Source</Label>
                    <Select
                        value={formData.source}
                        onValueChange={(value) => updateField('source', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                            {sourceOptions.map((source) => (
                                <SelectItem key={source} value={source}>
                                    {source}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Next Action */}
                <div className="space-y-2">
                    <Label htmlFor="next_action">Next Action</Label>
                    <Input
                        id="next_action"
                        value={formData.next_action}
                        onChange={(e) => updateField('next_action', e.target.value)}
                        placeholder="Schedule demo call"
                    />
                </div>

                {/* Next Action Date */}
                <div className="space-y-2">
                    <Label htmlFor="next_action_date">Next Action Date</Label>
                    <Input
                        id="next_action_date"
                        type="date"
                        value={formData.next_action_date}
                        onChange={(e) => updateField('next_action_date', e.target.value)}
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
                        {isEditing ? 'Save Changes' : 'Create Lead'}
                    </Button>
                </div>
            </form>
        </FormDrawer>
    )
}
