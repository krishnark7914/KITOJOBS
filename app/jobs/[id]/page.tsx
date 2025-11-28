'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getStoredJobs } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Briefcase, MapPin, DollarSign, Clock, Building, CheckCircle } from 'lucide-react';
import { formatSalary, timeAgo } from '@/lib/utils';
import { Job } from '@/types';

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [job, setJob] = useState<Job | null>(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        const jobs = getStoredJobs();
        const foundJob = jobs.find((j) => j.id === params.id);
        setJob(foundJob || null);
    }, [params.id]);

    const handleApply = () => {
        setIsApplying(true);
        // Simulate API call
        setTimeout(() => {
            setHasApplied(true);
            setIsApplying(false);
        }, 1000);
    };

    if (!job) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-muted-foreground">Job not found</p>
            </div>
        );
    }

    const isOwnJob = user?.role === 'hospital' && job.hospitalId === user.id;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="space-y-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    ← Back to jobs
                </Button>

                <div>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
                            <p className="text-xl text-muted-foreground mt-2">{job.hospitalName}</p>
                        </div>
                        <Badge variant="secondary" className="capitalize text-base px-4 py-2">
                            {job.jobType.replace('-', ' ')}
                        </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {formatSalary(job.salaryMin, job.salaryMax)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Posted {timeAgo(job.postedDate)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {job.specialization}
                        </span>
                    </div>
                </div>
            </div>

            {/* Job Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>

                    <div>
                        <h3 className="font-semibold mb-3">Requirements</h3>
                        <ul className="space-y-2">
                            {job.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-3">Benefits</h3>
                        <ul className="space-y-2">
                            {job.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Application Section */}
            {user?.role === 'doctor' && !isOwnJob && (
                <Card>
                    <CardHeader>
                        <CardTitle>Apply for this position</CardTitle>
                        <CardDescription>
                            Submit your application with a cover letter
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {hasApplied ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
                                <p className="text-muted-foreground">
                                    Your application has been sent to {job.hospitalName}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="coverLetter">Cover Letter</Label>
                                    <Textarea
                                        id="coverLetter"
                                        placeholder="Tell us why you're a great fit for this position..."
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        rows={6}
                                    />
                                </div>
                                <Button
                                    onClick={handleApply}
                                    disabled={isApplying || !coverLetter.trim()}
                                    className="w-full"
                                >
                                    {isApplying ? 'Submitting...' : 'Submit Application'}
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}

            {isOwnJob && (
                <Card>
                    <CardContent className="py-6">
                        <p className="text-center text-muted-foreground">
                            This is your job posting. You can edit it from the &quot;My Job Posts&quot; page.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
