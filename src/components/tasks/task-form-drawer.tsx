'use client'

import { useState, useEffect } from 'react'
import { FormDrawer } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { mockLeads, mockDeals } from '@/lib/mock-data'
import type { Task } from '@/types'

interface TaskFormDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    task?: Task | null
    onSubmit?: (data: Partial<Task>) => void
    preselectedLeadId?: string
    preselectedDealId?: string
}

export function TaskFormDrawer({
    open,
    onOpenChange,
    task,
    onSubmit,
    preselectedLeadId,
    preselectedDealId,
}: TaskFormDrawerProps) {
    const isEditing = !!task

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        lead_id: preselectedLeadId || '',
        deal_id: preselectedDealId || '',
    })

    // Reset form when task changes or drawer opens
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                due_date: task.due_date || '',
                lead_id: task.lead_id || '',
                deal_id: task.deal_id || '',
            })
        } else {
            setFormData({
                title: '',
                description: '',
                due_date: '',
                lead_id: preselectedLeadId || '',
                deal_id: preselectedDealId || '',
            })
        }
    }, [task, preselectedLeadId, preselectedDealId, open])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title.trim()) {
            toast.error('Task title is required')
            return
        }

        onSubmit?.({
            title: formData.title,
            description: formData.description || null,
            due_date: formData.due_date || null,
            lead_id: formData.lead_id || null,
            deal_id: formData.deal_id || null,
            is_completed: task?.is_completed || false,
        })
        toast.success(isEditing ? 'Task updated' : 'Task created')
        onOpenChange(false)
    }

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <FormDrawer
            open={open}
            onOpenChange={onOpenChange}
            title={isEditing ? 'Edit Task' : 'New Task'}
            description={
                isEditing
                    ? 'Update the task details below.'
                    : 'Create a new task and optionally link it to a lead or deal.'
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Task Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">Task Title *</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        placeholder="Follow up with client"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        placeholder="Additional details about this task..."
                        rows={3}
                    />
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                        id="due_date"
                        type="date"
                        value={formData.due_date}
                        onChange={(e) => updateField('due_date', e.target.value)}
                    />
                </div>

                {/* Link to Lead */}
                <div className="space-y-2">
                    <Label>Link to Lead</Label>
                    <Select
                        value={formData.lead_id}
                        onValueChange={(value) => updateField('lead_id', value === 'none' ? '' : value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a lead (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">No lead</SelectItem>
                            {mockLeads.map((lead) => (
                                <SelectItem key={lead.id} value={lead.id}>
                                    {lead.name} {lead.company && `(${lead.company})`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Link to Deal */}
                <div className="space-y-2">
                    <Label>Link to Deal</Label>
                    <Select
                        value={formData.deal_id}
                        onValueChange={(value) => updateField('deal_id', value === 'none' ? '' : value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a deal (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">No deal</SelectItem>
                            {mockDeals.map((deal) => (
                                <SelectItem key={deal.id} value={deal.id}>
                                    {deal.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                        {isEditing ? 'Save Changes' : 'Create Task'}
                    </Button>
                </div>
            </form>
        </FormDrawer>
    )
}
