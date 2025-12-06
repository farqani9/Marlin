'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import {
    LayoutDashboard,
    Users,
    Briefcase,
    CheckSquare,
    Settings,
    Plus,
    Search,
} from 'lucide-react'

export function CommandPalette() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const runCommand = useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Navigation">
                    <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Go to Dashboard</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push('/leads'))}>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Go to Leads</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push('/deals'))}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Go to Deals</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push('/tasks'))}>
                        <CheckSquare className="mr-2 h-4 w-4" />
                        <span>Go to Tasks</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Go to Settings</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Actions">
                    <CommandItem onSelect={() => runCommand(() => console.log('Create lead'))}>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Create Lead</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => console.log('Create deal'))}>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Create Deal</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => console.log('Create task'))}>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Create Task</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Search">
                    <CommandItem onSelect={() => runCommand(() => console.log('Search leads'))}>
                        <Search className="mr-2 h-4 w-4" />
                        <span>Search Leads...</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => console.log('Search deals'))}>
                        <Search className="mr-2 h-4 w-4" />
                        <span>Search Deals...</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
