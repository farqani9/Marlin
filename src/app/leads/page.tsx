'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AppLayout } from '@/components/layout'
import { StatusBadge, ViewToggle } from '@/components/common'
import { LeadFormDrawer, LeadsBoardView } from '@/components/leads'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { mockLeads } from '@/lib/mock-data'
import { toast } from 'sonner'
import type { Lead, LeadStatus } from '@/types'

type ViewMode = 'list' | 'board'

const statusOptions: { value: LeadStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'in_discussion', label: 'In Discussion' },
    { value: 'proposal_sent', label: 'Proposal Sent' },
    { value: 'follow_up_required', label: 'Follow-up Required' },
]

export default function LeadsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all')
    const [viewMode, setViewMode] = useState<ViewMode>('list')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingLead, setEditingLead] = useState<Lead | null>(null)
    const [leads, setLeads] = useState(mockLeads)

    // Filter leads based on search and status
    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const handleNewLead = () => {
        setEditingLead(null)
        setIsFormOpen(true)
    }

    const handleEditLead = (lead: Lead) => {
        setEditingLead(lead)
        setIsFormOpen(true)
    }

    const handleDeleteLead = (leadId: string) => {
        setLeads((prev) => prev.filter((l) => l.id !== leadId))
        toast.success('Lead deleted')
    }

    const handleFormSubmit = (data: Partial<Lead>) => {
        if (editingLead) {
            // Update existing lead
            setLeads((prev) =>
                prev.map((l) => (l.id === editingLead.id ? { ...l, ...data } : l))
            )
        } else {
            // Create new lead
            const newLead: Lead = {
                id: String(Date.now()),
                name: data.name || '',
                company: data.company ?? null,
                contact_name: data.contact_name ?? null,
                email: data.email ?? null,
                phone: data.phone ?? null,
                status: (data.status as LeadStatus) || 'new',
                source: data.source ?? null,
                priority: data.priority ?? null,
                next_action: data.next_action ?? null,
                next_action_date: data.next_action_date ?? null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
            setLeads((prev) => [newLead, ...prev])
        }
    }

    const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
        setLeads((prev) =>
            prev.map((l) =>
                l.id === leadId ? { ...l, status: newStatus, updated_at: new Date().toISOString() } : l
            )
        )
        toast.success('Lead status updated')
    }

    return (
        <AppLayout title="Leads">
            {/* Header with actions */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 flex-1">
                    {/* Search */}
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Status Filter */}
                    <Select
                        value={statusFilter}
                        onValueChange={(value) => setStatusFilter(value as LeadStatus | 'all')}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* View Toggle */}
                    <ViewToggle value={viewMode} onChange={setViewMode} />
                </div>

                {/* New Lead Button */}
                <Button className="gap-2" onClick={handleNewLead}>
                    <Plus className="h-4 w-4" />
                    New Lead
                </Button>
            </div>

            {/* View Content */}
            {viewMode === 'board' ? (
                <LeadsBoardView leads={filteredLeads} onStatusChange={handleStatusChange} />
            ) : (
                <>
                    {/* Leads Table */}
                    <div className="rounded-lg border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Next Action</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLeads.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center">
                                            <div className="text-muted-foreground">
                                                <p>No leads found</p>
                                                <Button variant="link" className="mt-2" onClick={handleNewLead}>
                                                    Create your first lead
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredLeads.map((lead) => (
                                        <TableRow key={lead.id} className="group">
                                            <TableCell>
                                                <Link
                                                    href={`/leads/${lead.id}`}
                                                    className="font-medium hover:underline"
                                                >
                                                    {lead.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {lead.company || '—'}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {lead.email || '—'}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={lead.status} />
                                            </TableCell>
                                            <TableCell>
                                                {lead.priority && <StatusBadge status={lead.priority} />}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                <div>{lead.next_action || '—'}</div>
                                                {lead.next_action_date && (
                                                    <div className="text-xs">{lead.next_action_date}</div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="opacity-0 group-hover:opacity-100"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleEditLead(lead)}>
                                                            <Pencil className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onClick={() => handleDeleteLead(lead.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer info */}
                    <div className="mt-4 text-sm text-muted-foreground">
                        Showing {filteredLeads.length} of {leads.length} leads
                    </div>
                </>
            )}

            {/* Lead Form Drawer */}
            <LeadFormDrawer
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                lead={editingLead}
                onSubmit={handleFormSubmit}
            />
        </AppLayout>
    )
}
