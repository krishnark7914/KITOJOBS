'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, FileText, PlusCircle, TrendingUp, Users } from 'lucide-react';
import { getStoredJobs } from '@/lib/mockData';

export default function HomePage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated || !user) {
        return null;
    }

    const jobs = getStoredJobs();
    const activeJobs = jobs.filter(j => j.isActive);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back, {user.name}!
                </h1>
                <p className="text-muted-foreground mt-2">
                    {user.role === 'doctor'
                        ? 'Find your next career opportunity'
                        : 'Manage your job postings and find top talent'}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {user.role === 'doctor' ? 'Available Jobs' : 'Active Postings'}
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeJobs.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {user.role === 'doctor' ? 'Open positions' : 'Currently hiring'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {user.role === 'doctor' ? 'Applications' : 'Total Views'}
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {user.role === 'doctor' ? '0' : '1.2k'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {user.role === 'doctor' ? 'Pending review' : 'This month'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                        {user.role === 'doctor'
                            ? 'Get started with your job search'
                            : 'Manage your recruitment process'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    {user.role === 'doctor' ? (
                        <>
                            <Button asChild>
                                <Link href="/jobs">
                                    <Briefcase className="mr-2 h-4 w-4" />
                                    Browse Jobs
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/profile">
                                    <Users className="mr-2 h-4 w-4" />
                                    Update Profile
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button asChild>
                                <Link href="/jobs/new">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Post a Job
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/my-jobs">
                                    <FileText className="mr-2 h-4 w-4" />
                                    View My Posts
                                </Link>
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Recent Jobs */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Job Postings</CardTitle>
                    <CardDescription>Latest opportunities in healthcare</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activeJobs.slice(0, 3).map((job) => (
                            <div
                                key={job.id}
                                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium">{job.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {job.hospitalName} • {job.location}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/jobs/${job.id}`}>View</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
