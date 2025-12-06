'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TopBarProps {
    title: string
}

export function TopBar({ title }: TopBarProps) {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Page Title */}
            <h1 className="text-xl font-semibold">{title}</h1>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-muted-foreground"
                    onClick={() => {
                        // TODO: Open command palette
                        console.log('Open search')
                    }}
                >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search...</span>
                    <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
            </div>
        </header>
    )
}
