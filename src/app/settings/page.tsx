'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Save, Building, Palette, Bell, Database } from 'lucide-react'

export default function SettingsPage() {
    const [workspaceName, setWorkspaceName] = useState('My Workspace')
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [darkMode, setDarkMode] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async () => {
        setIsSaving(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setIsSaving(false)
        toast.success('Settings saved successfully')
    }

    return (
        <AppLayout title="Settings">
            <div className="max-w-2xl space-y-6">
                {/* Workspace Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Workspace</CardTitle>
                        </div>
                        <CardDescription>
                            Configure your workspace settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="workspace-name">Workspace Name</Label>
                            <Input
                                id="workspace-name"
                                value={workspaceName}
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                placeholder="Enter workspace name"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Palette className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Appearance</CardTitle>
                        </div>
                        <CardDescription>
                            Customize the look and feel
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">
                                    Use dark theme for the interface
                                </p>
                            </div>
                            <Switch
                                checked={darkMode}
                                onCheckedChange={setDarkMode}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription>
                            Manage your notification preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive email updates about your tasks and deals
                                </p>
                            </div>
                            <Switch
                                checked={emailNotifications}
                                onCheckedChange={setEmailNotifications}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Data & Storage */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Database className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Data & Storage</CardTitle>
                        </div>
                        <CardDescription>
                            Manage your data and storage settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Leads</p>
                                <p className="text-sm text-muted-foreground">5 records</p>
                            </div>
                            <Button variant="outline" size="sm">Export</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Deals</p>
                                <p className="text-sm text-muted-foreground">4 records</p>
                            </div>
                            <Button variant="outline" size="sm">Export</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Tasks</p>
                                <p className="text-sm text-muted-foreground">4 records</p>
                            </div>
                            <Button variant="outline" size="sm">Export</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>
                            Irreversible actions for your workspace
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Delete all data</p>
                                <p className="text-sm text-muted-foreground">
                                    Permanently delete all leads, deals, and tasks
                                </p>
                            </div>
                            <Button variant="destructive" size="sm">
                                Delete All
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                        <Save className="h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    )
}
