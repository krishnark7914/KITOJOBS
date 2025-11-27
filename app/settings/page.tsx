'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your account preferences
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <SettingsIcon className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>
                                Additional settings will be available soon
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This page is under construction. Check back later for notification preferences,
                        privacy settings, and more.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
