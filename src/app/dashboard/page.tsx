import { AppLayout } from '@/components/layout'
import { SummaryCard, ActivityFeed, TaskList } from '@/components/common'
import { DollarSign, Briefcase, Users, CheckSquare } from 'lucide-react'

// Mock data for dashboard
const mockMetrics = {
    pipelineValue: '$124,500',
    openDeals: 12,
    newLeads: 8,
    tasksDue: 5,
}

const mockTasks = [
    {
        id: '1',
        title: 'Follow up with Acme Corp about proposal',
        dueDate: 'Today',
        linkedEntity: { type: 'lead' as const, name: 'Acme Corp' },
        isCompleted: false,
    },
    {
        id: '2',
        title: 'Send pricing document to TechStart',
        dueDate: 'Tomorrow',
        linkedEntity: { type: 'deal' as const, name: 'TechStart Deal' },
        isCompleted: false,
    },
    {
        id: '3',
        title: 'Schedule demo with Global Industries',
        dueDate: 'Dec 10',
        linkedEntity: { type: 'lead' as const, name: 'Global Industries' },
        isCompleted: false,
    },
    {
        id: '4',
        title: 'Review contract terms',
        dueDate: 'Dec 12',
        linkedEntity: { type: 'deal' as const, name: 'Enterprise Deal' },
        isCompleted: true,
    },
]

const mockActivities = [
    {
        id: '1',
        type: 'deal' as const,
        description: 'Deal "TechStart SaaS" moved from Qualified to Proposal',
        timestamp: '2 hours ago',
    },
    {
        id: '2',
        type: 'task' as const,
        description: 'Task completed: "Send intro email to Acme Corp"',
        timestamp: '4 hours ago',
    },
    {
        id: '3',
        type: 'lead' as const,
        description: 'New lead added: "Global Industries"',
        timestamp: '6 hours ago',
    },
    {
        id: '4',
        type: 'note' as const,
        description: 'Note added to "Enterprise Solutions" lead',
        timestamp: 'Yesterday',
    },
    {
        id: '5',
        type: 'deal' as const,
        description: 'Deal "Cloud Migration" marked as Closed Won',
        timestamp: 'Yesterday',
    },
]

export default function DashboardPage() {
    return (
        <AppLayout title="Dashboard">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <SummaryCard
                    title="Pipeline Value"
                    value={mockMetrics.pipelineValue}
                    icon={DollarSign}
                    trend={{ value: '12%', isPositive: true }}
                    description="from last month"
                />
                <SummaryCard
                    title="Open Deals"
                    value={mockMetrics.openDeals}
                    icon={Briefcase}
                    trend={{ value: '3', isPositive: true }}
                    description="new this week"
                />
                <SummaryCard
                    title="New Leads"
                    value={mockMetrics.newLeads}
                    icon={Users}
                    trend={{ value: '8%', isPositive: true }}
                    description="from last week"
                />
                <SummaryCard
                    title="Tasks Due Today"
                    value={mockMetrics.tasksDue}
                    icon={CheckSquare}
                />
            </div>

            {/* Two Column Layout: Tasks & Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
                <TaskList tasks={mockTasks} />
                <ActivityFeed activities={mockActivities} />
            </div>
        </AppLayout>
    )
}
