import { Sidebar } from './sidebar'
import { TopBar } from './topbar'

interface AppLayoutProps {
    children: React.ReactNode
    title: string
}

export function AppLayout({ children, title }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="pl-60">
                {/* Top Bar */}
                <TopBar title={title} />

                {/* Page Content */}
                <main className="p-6">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
