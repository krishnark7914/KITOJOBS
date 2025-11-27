'use client';

import { useState } from 'react';
import { getStoredJobs } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Briefcase, MapPin, DollarSign, Clock, Search } from 'lucide-react';
import { formatSalary, timeAgo } from '@/lib/utils';
import { Job } from '@/types';

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs] = useState<Job[]>(getStoredJobs());

    const filteredJobs = jobs.filter((job) => {
        if (!searchQuery) return job.isActive;
        const query = searchQuery.toLowerCase();
        return (
            job.isActive &&
            (job.title.toLowerCase().includes(query) ||
                job.hospitalName.toLowerCase().includes(query) ||
                job.location.toLowerCase().includes(query) ||
                job.specialization.toLowerCase().includes(query))
        );
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Browse Jobs</h1>
                <p className="text-muted-foreground mt-2">
                    Find your next opportunity in healthcare
                </p>
            </div>

            {/* Search */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by title, hospital, location, or specialization..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </p>

            {/* Job listings */}
            <div className="grid gap-4">
                {filteredJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <CardTitle className="text-xl">{job.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-4 text-base">
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="h-4 w-4" />
                                            {job.hospitalName}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {job.location}
                                        </span>
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary" className="capitalize">
                                    {job.jobType.replace('-', ' ')}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {job.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <DollarSign className="h-4 w-4" />
                                        {formatSalary(job.salaryMin, job.salaryMax)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {timeAgo(job.postedDate)}
                                    </span>
                                </div>
                                <Button asChild>
                                    <Link href={`/jobs/${job.id}`}>View Details</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredJobs.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium">No jobs found</p>
                            <p className="text-sm text-muted-foreground">
                                Try adjusting your search criteria
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
