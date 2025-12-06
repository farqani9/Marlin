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
    Users,
    DollarSign,
    Calendar,
    TrendingUp,
} from 'lucide-react'
import { mockDeals, mockLeads, getTasksForLead } from '@/lib/mock-data'

interface DealDetailPageProps {
    params: Promise<{ id: string }>
}

export default function DealDetailPage({ params }: DealDetailPageProps) {
    const { id } = use(params)
    const deal = mockDeals.find((d) => d.id === id)

    if (!deal) {
        notFound()
    }

    const lead = mockLeads.find((l) => l.id === deal.lead_id)
    const tasks = deal.lead_id ? getTasksForLead(deal.lead_id) : []

    const formatValue = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <AppLayout title="Deal Details">
            {/* Back link and header */}
            <div className="mb-6">
                <Link
                    href="/deals"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Deals
                </Link>

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">{deal.title}</h1>
                        {lead && (
                            <Link
                                href={`/leads/${lead.id}`}
                                className="text-muted-foreground hover:underline"
                            >
                                {lead.name} • {lead.company}
                            </Link>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                            <StatusBadge status={deal.stage} />
                            <span className="text-lg font-semibold text-green-500">
                                {formatValue(deal.value)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
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
                                    Delete Deal
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
                            {/* Deal Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Deal Details</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Value</p>
                                            <p className="text-sm font-medium">{formatValue(deal.value)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Probability</p>
                                            <p className="text-sm font-medium">{deal.probability}%</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Expected Close</p>
                                            <p className="text-sm">{deal.expected_close_date || '—'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Lead</p>
                                            {lead ? (
                                                <Link
                                                    href={`/leads/${lead.id}`}
                                                    className="text-sm hover:underline"
                                                >
                                                    {lead.name}
                                                </Link>
                                            ) : (
                                                <p className="text-sm">—</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Notes */}
                            {deal.note && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Notes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{deal.note}</p>
                                    </CardContent>
                                </Card>
                            )}
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
                                                <p className="text-sm">Deal created</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(deal.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                                            <div>
                                                <p className="text-sm">
                                                    Stage set to <StatusBadge status={deal.stage} className="ml-1" />
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(deal.updated_at).toLocaleDateString()}
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
                                        placeholder="Add notes about this deal..."
                                        className="min-h-[200px]"
                                        defaultValue={deal.note || ''}
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
                                            No tasks for this deal yet.
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
                    {/* Weighted Value */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Weighted Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-green-500">
                                {formatValue((deal.value * deal.probability) / 100)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {deal.probability}% of {formatValue(deal.value)}
                            </p>
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
                                <span className="text-muted-foreground">Stage</span>
                                <StatusBadge status={deal.stage} />
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Open Tasks</span>
                                <span>{tasks.filter((t) => !t.is_completed).length}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Created</span>
                                <span>{new Date(deal.created_at).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
