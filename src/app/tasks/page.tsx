'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AppLayout } from '@/components/layout'
import { TaskFormDrawer } from '@/components/tasks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Plus, Search, Calendar, AlertCircle, Clock, CalendarX } from 'lucide-react'
import { mockTasks, mockLeads, mockDeals } from '@/lib/mock-data'
import { toast } from 'sonner'
import type { Task } from '@/types'

type FilterType = 'all' | 'today' | 'upcoming' | 'overdue' | 'no_date'

const filterOptions: { value: FilterType; label: string; icon: React.ElementType }[] = [
    { value: 'all', label: 'All Tasks', icon: Calendar },
    { value: 'today', label: 'Today', icon: Clock },
    { value: 'upcoming', label: 'Upcoming', icon: Calendar },
    { value: 'overdue', label: 'Overdue', icon: AlertCircle },
    { value: 'no_date', label: 'No Date', icon: CalendarX },
]

export default function TasksPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState<FilterType>('all')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [tasks, setTasks] = useState(mockTasks)

    const today = new Date().toISOString().split('T')[0]

    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
        // Search filter
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
        if (!matchesSearch) return false

        // Date filter
        switch (activeFilter) {
            case 'today':
                return task.due_date === today
            case 'upcoming':
                return task.due_date && task.due_date > today
            case 'overdue':
                return task.due_date && task.due_date < today && !task.is_completed
            case 'no_date':
                return !task.due_date
            default:
                return true
        }
    })

    // Sort: incomplete first, then by due date
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (a.is_completed !== b.is_completed) {
            return a.is_completed ? 1 : -1
        }
        if (!a.due_date) return 1
        if (!b.due_date) return -1
        return a.due_date.localeCompare(b.due_date)
    })

    const getLeadName = (leadId: string | null) => {
        if (!leadId) return null
        const lead = mockLeads.find((l) => l.id === leadId)
        return lead?.name
    }

    const getDealTitle = (dealId: string | null) => {
        if (!dealId) return null
        const deal = mockDeals.find((d) => d.id === dealId)
        return deal?.title
    }

    const handleNewTask = () => {
        setEditingTask(null)
        setIsFormOpen(true)
    }

    const handleToggleComplete = (taskId: string) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId
                    ? { ...t, is_completed: !t.is_completed, updated_at: new Date().toISOString() }
                    : t
            )
        )
        const task = tasks.find((t) => t.id === taskId)
        toast.success(task?.is_completed ? 'Task marked as incomplete' : 'Task completed!')
    }

    const handleFormSubmit = (data: Partial<Task>) => {
        if (editingTask) {
            setTasks((prev) =>
                prev.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t))
            )
        } else {
            const newTask: Task = {
                id: String(Date.now()),
                title: data.title || '',
                description: data.description ?? null,
                due_date: data.due_date ?? null,
                is_completed: false,
                lead_id: data.lead_id ?? null,
                deal_id: data.deal_id ?? null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
            setTasks((prev) => [newTask, ...prev])
        }
    }

    const getDateBadgeColor = (dueDate: string | null) => {
        if (!dueDate) return 'secondary'
        if (dueDate < today) return 'destructive'
        if (dueDate === today) return 'default'
        return 'secondary'
    }

    const formatDate = (date: string) => {
        const d = new Date(date)
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    // Stats
    const completedCount = tasks.filter((t) => t.is_completed).length
    const overdueCount = tasks.filter((t) => t.due_date && t.due_date < today && !t.is_completed).length
    const todayCount = tasks.filter((t) => t.due_date === today && !t.is_completed).length

    return (
        <AppLayout title="Tasks">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">{tasks.length}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Due Today</p>
                    <p className="text-2xl font-bold text-blue-500">{todayCount}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-2xl font-bold text-red-500">{overdueCount}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-green-500">{completedCount}</p>
                </Card>
            </div>

            {/* Header with actions */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 flex-1">
                    {/* Search */}
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Quick Filters */}
                    <div className="flex gap-1">
                        {filterOptions.map((option) => (
                            <Button
                                key={option.value}
                                variant={activeFilter === option.value ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setActiveFilter(option.value)}
                                className="gap-1.5"
                            >
                                <option.icon className="h-4 w-4" />
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* New Task Button */}
                <Button className="gap-2" onClick={handleNewTask}>
                    <Plus className="h-4 w-4" />
                    New Task
                </Button>
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
                {sortedTasks.length === 0 ? (
                    <Card className="p-8 text-center">
                        <p className="text-muted-foreground">No tasks found</p>
                        <Button variant="link" onClick={handleNewTask}>
                            Create a new task
                        </Button>
                    </Card>
                ) : (
                    sortedTasks.map((task) => (
                        <Card
                            key={task.id}
                            className={cn(
                                'p-4 flex items-start gap-4 transition-opacity',
                                task.is_completed && 'opacity-60'
                            )}
                        >
                            <Checkbox
                                checked={task.is_completed}
                                onCheckedChange={() => handleToggleComplete(task.id)}
                                className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                                <p
                                    className={cn(
                                        'font-medium',
                                        task.is_completed && 'line-through text-muted-foreground'
                                    )}
                                >
                                    {task.title}
                                </p>
                                {task.description && (
                                    <p className="text-sm text-muted-foreground truncate mt-1">
                                        {task.description}
                                    </p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                    {task.lead_id && (
                                        <Link href={`/leads/${task.lead_id}`}>
                                            <Badge variant="outline" className="text-xs">
                                                {getLeadName(task.lead_id)}
                                            </Badge>
                                        </Link>
                                    )}
                                    {task.deal_id && (
                                        <Link href={`/deals/${task.deal_id}`}>
                                            <Badge variant="outline" className="text-xs">
                                                {getDealTitle(task.deal_id)}
                                            </Badge>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            {task.due_date && (
                                <Badge variant={getDateBadgeColor(task.due_date)}>
                                    {formatDate(task.due_date)}
                                </Badge>
                            )}
                        </Card>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="mt-4 text-sm text-muted-foreground">
                Showing {sortedTasks.length} of {tasks.length} tasks
            </div>

            {/* Task Form Drawer */}
            <TaskFormDrawer
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                task={editingTask}
                onSubmit={handleFormSubmit}
            />
        </AppLayout>
    )
}
