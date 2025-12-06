'use client'

import { cn } from '@/lib/utils'
import { LayoutList, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ViewMode = 'list' | 'board'

interface ViewToggleProps {
    value: ViewMode
    onChange: (value: ViewMode) => void
    className?: string
}

export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
    return (
        <div className={cn('flex items-center rounded-md border p-1', className)}>
            <Button
                variant={value === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2"
                onClick={() => onChange('list')}
            >
                <LayoutList className="h-4 w-4 mr-1" />
                List
            </Button>
            <Button
                variant={value === 'board' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2"
                onClick={() => onChange('board')}
            >
                <LayoutGrid className="h-4 w-4 mr-1" />
                Board
            </Button>
        </div>
    )
}
