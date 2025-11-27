'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Briefcase } from 'lucide-react';

export default function MyApplicationsPage() {
    const { user } = useAuth();

    if (user?.role !== 'doctor') {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-muted-foreground">This page is only for doctor accounts</p>
            </div>
        );
    }

    // Mock applications - in a real app, this would come from an API
    const applications: any[] = [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
                <p className="text-muted-foreground mt-2">
                    Track your job applications and their status
                </p>
            </div>

            <div className="grid gap-4">
                {applications.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium">No applications yet</p>
                            <p className="text-sm text-muted-foreground mb-4">
                                Start applying to jobs to see them here
                            </p>
                            <Button asChild>
                                <Link href="/jobs">Browse Jobs</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    applications.map((app) => (
                        <Card key={app.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-xl">{app.jobTitle}</CardTitle>
                                        <CardDescription>{app.hospitalName}</CardDescription>
                                    </div>
                                    <Badge variant="secondary">{app.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/jobs/${app.jobId}`}>
                                        <Briefcase className="mr-2 h-4 w-4" />
                                        View Job
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
