'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TaskItem {
    id: string
    title: string
    dueDate: string
    linkedEntity?: {
        type: 'lead' | 'deal'
        name: string
    }
    isCompleted: boolean
}

interface TaskListProps {
    tasks: TaskItem[]
    onToggle?: (id: string) => void
    className?: string
}

export function TaskList({ tasks, onToggle, className }: TaskListProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-lg font-medium">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-start gap-3 rounded-md p-2 hover:bg-muted/50 transition-colors"
                        >
                            {/* Checkbox */}
                            <button
                                onClick={() => onToggle?.(task.id)}
                                className={cn(
                                    'mt-0.5 h-4 w-4 rounded border flex-shrink-0 transition-colors',
                                    task.isCompleted
                                        ? 'bg-primary border-primary'
                                        : 'border-muted-foreground hover:border-primary'
                                )}
                            >
                                {task.isCompleted && (
                                    <svg
                                        className="h-4 w-4 text-primary-foreground"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </button>

                            {/* Task content */}
                            <div className="flex-1 min-w-0">
                                <p
                                    className={cn(
                                        'text-sm',
                                        task.isCompleted && 'line-through text-muted-foreground'
                                    )}
                                >
                                    {task.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-muted-foreground">
                                        {task.dueDate}
                                    </span>
                                    {task.linkedEntity && (
                                        <span
                                            className={cn(
                                                'text-xs px-1.5 py-0.5 rounded',
                                                task.linkedEntity.type === 'lead'
                                                    ? 'bg-blue-500/10 text-blue-500'
                                                    : 'bg-purple-500/10 text-purple-500'
                                            )}
                                        >
                                            {task.linkedEntity.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
