'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AppLayout } from '@/components/layout'
import { StatusBadge } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    ArrowLeft,
    Pencil,
    Plus,
    MoreHorizontal,
    Trash2,
    Briefcase,
    Mail,
    Phone,
    Building,
    Calendar,
} from 'lucide-react'
import { getLeadById, getDealsForLead, getTasksForLead } from '@/lib/mock-data'

interface LeadDetailPageProps {
    params: Promise<{ id: string }>
}

export default function LeadDetailPage({ params }: LeadDetailPageProps) {
    const { id } = use(params)
    const lead = getLeadById(id)

    if (!lead) {
        notFound()
    }

    const deals = getDealsForLead(id)
    const tasks = getTasksForLead(id)

    return (
        <AppLayout title="Lead Details">
            {/* Back link and header */}
            <div className="mb-6">
                <Link
                    href="/leads"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Leads
                </Link>

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">{lead.name}</h1>
                        <p className="text-muted-foreground">{lead.company}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <StatusBadge status={lead.status} />
                            {lead.priority && <StatusBadge status={lead.priority} />}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Deal
                        </Button>
                        <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Lead
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Main content with tabs and sidebar */}
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                {/* Main content */}
                <div>
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                            <TabsTrigger value="notes">Notes</TabsTrigger>
                            <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="mt-4 space-y-6">
                            {/* Contact Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Contact Details</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="text-sm">{lead.email || '—'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p className="text-sm">{lead.phone || '—'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Company</p>
                                            <p className="text-sm">{lead.company || '—'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Source</p>
                                            <p className="text-sm">{lead.source || '—'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Related Deals */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">Related Deals</CardTitle>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        New Deal
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {deals.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            No deals linked to this lead yet.
                                        </p>
                                    ) : (
                                        <div className="space-y-3">
                                            {deals.map((deal) => (
                                                <div
                                                    key={deal.id}
                                                    className="flex items-center justify-between rounded-md border p-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                        <div>
                                                            <Link
                                                                href={`/deals/${deal.id}`}
                                                                className="font-medium hover:underline"
                                                            >
                                                                {deal.title}
                                                            </Link>
                                                            <p className="text-sm text-muted-foreground">
                                                                ${deal.value.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <StatusBadge status={deal.stage} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Activity Tab */}
                        <TabsContent value="activity" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Activity Timeline</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                                            <div>
                                                <p className="text-sm">Lead created</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(lead.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                                            <div>
                                                <p className="text-sm">
                                                    Status changed to{' '}
                                                    <StatusBadge status={lead.status} className="ml-1" />
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(lead.updated_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Notes Tab */}
                        <TabsContent value="notes" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="Add notes about this lead..."
                                        className="min-h-[200px]"
                                    />
                                    <Button className="mt-4">Save Notes</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Tasks Tab */}
                        <TabsContent value="tasks" className="mt-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">Tasks</CardTitle>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Task
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {tasks.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            No tasks for this lead yet.
                                        </p>
                                    ) : (
                                        <div className="space-y-3">
                                            {tasks.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className="flex items-start gap-3 rounded-md border p-3"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={task.is_completed}
                                                        className="mt-1 h-4 w-4 rounded border-muted-foreground"
                                                    />
                                                    <div className="flex-1">
                                                        <p
                                                            className={
                                                                task.is_completed
                                                                    ? 'text-sm line-through text-muted-foreground'
                                                                    : 'text-sm'
                                                            }
                                                        >
                                                            {task.title}
                                                        </p>
                                                        {task.due_date && (
                                                            <p className="text-xs text-muted-foreground">
                                                                Due: {task.due_date}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                    {/* Next Action Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Next Action</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{lead.next_action || 'No action set'}</p>
                            {lead.next_action_date && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    Due: {lead.next_action_date}
                                </p>
                            )}
                            <Button variant="outline" size="sm" className="mt-3 w-full">
                                Update Action
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Add */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Quick Add</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full gap-2">
                                <Plus className="h-4 w-4" />
                                Add Task
                            </Button>
                            <Button variant="outline" size="sm" className="w-full gap-2">
                                <Plus className="h-4 w-4" />
                                Add Note
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Deals</span>
                                <span>{deals.length}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Open Tasks</span>
                                <span>{tasks.filter((t) => !t.is_completed).length}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Created</span>
                                <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
