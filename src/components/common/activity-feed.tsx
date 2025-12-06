import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ActivityItem {
    id: string
    type: 'deal' | 'lead' | 'task' | 'note'
    description: string
    timestamp: string
}

interface ActivityFeedProps {
    activities: ActivityItem[]
    className?: string
}

const typeColors = {
    deal: 'bg-purple-500',
    lead: 'bg-blue-500',
    task: 'bg-green-500',
    note: 'bg-yellow-500',
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={activity.id} className="flex gap-3">
                            {/* Timeline dot and line */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        'h-2 w-2 rounded-full mt-2',
                                        typeColors[activity.type]
                                    )}
                                />
                                {index < activities.length - 1 && (
                                    <div className="w-px flex-1 bg-border" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-4">
                                <p className="text-sm">{activity.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {activity.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
