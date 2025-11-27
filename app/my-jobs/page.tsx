'use client';

import { useAuth } from '@/contexts/AuthContext';
import { getStoredJobs } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Briefcase, MapPin, DollarSign, Edit, Trash2 } from 'lucide-react';
import { formatSalary, timeAgo } from '@/lib/utils';

export default function MyJobsPage() {
    const { user } = useAuth();
    const jobs = getStoredJobs();
    const myJobs = jobs.filter((job) => job.hospitalId === user?.id);

    if (user?.role !== 'hospital') {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-muted-foreground">This page is only for hospital accounts</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Job Posts</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your job postings and track applications
                    </p>
                </div>
                <Button asChild>
                    <Link href="/jobs/new">Post New Job</Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {myJobs.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium">No job posts yet</p>
                            <p className="text-sm text-muted-foreground mb-4">
                                Start by creating your first job posting
                            </p>
                            <Button asChild>
                                <Link href="/jobs/new">Post a Job</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    myJobs.map((job) => (
                        <Card key={job.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-xl">{job.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4" />
                                                {formatSalary(job.salaryMin, job.salaryMax)}
                                            </span>
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={job.isActive ? 'success' : 'secondary'}>
                                            {job.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                        <Badge variant="outline" className="capitalize">
                                            {job.jobType.replace('-', ' ')}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Posted {timeAgo(job.postedDate)}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/jobs/${job.id}`}>
                                            <Briefcase className="mr-2 h-4 w-4" />
                                            View
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
