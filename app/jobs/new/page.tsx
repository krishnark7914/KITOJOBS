'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStoredJobs, setStoredJobs } from '@/lib/mockData';
import { Job, JobType } from '@/types';

export default function NewJobPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        specialization: '',
        jobType: '' as JobType | '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        requirements: '',
        benefits: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newJob: Job = {
            id: Date.now().toString(),
            title: formData.title,
            hospitalId: user!.id,
            hospitalName: user!.hospitalName || user!.name,
            description: formData.description,
            requirements: formData.requirements.split('\n').filter(r => r.trim()),
            benefits: formData.benefits.split('\n').filter(b => b.trim()),
            specialization: formData.specialization,
            jobType: formData.jobType as JobType,
            location: formData.location,
            salaryMin: parseInt(formData.salaryMin),
            salaryMax: parseInt(formData.salaryMax),
            postedDate: new Date(),
            isActive: true,
        };

        const jobs = getStoredJobs();
        setStoredJobs([...jobs, newJob]);

        setTimeout(() => {
            router.push('/my-jobs');
        }, 500);
    };

    if (user?.role !== 'hospital') {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-muted-foreground">Only hospitals can post jobs</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
                <p className="text-muted-foreground mt-2">
                    Fill in the details to create a job posting
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Job Information</CardTitle>
                        <CardDescription>Provide details about the position</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Cardiologist - Full Time"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="specialization">Specialization *</Label>
                                <Input
                                    id="specialization"
                                    placeholder="e.g., Cardiology"
                                    value={formData.specialization}
                                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="jobType">Job Type *</Label>
                                <Select
                                    value={formData.jobType}
                                    onValueChange={(value) => setFormData({ ...formData, jobType: value as JobType })}
                                >
                                    <SelectTrigger id="jobType">
                                        <SelectValue placeholder="Select job type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full-time">Full Time</SelectItem>
                                        <SelectItem value="part-time">Part Time</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                        <SelectItem value="locum">Locum</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <Input
                                id="location"
                                placeholder="e.g., New York, NY"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="salaryMin">Minimum Salary ($) *</Label>
                                <Input
                                    id="salaryMin"
                                    type="number"
                                    placeholder="e.g., 200000"
                                    value={formData.salaryMin}
                                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="salaryMax">Maximum Salary ($) *</Label>
                                <Input
                                    id="salaryMax"
                                    type="number"
                                    placeholder="e.g., 300000"
                                    value={formData.salaryMax}
                                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Job Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the role, responsibilities, and ideal candidate..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={6}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="requirements">Requirements (one per line) *</Label>
                            <Textarea
                                id="requirements"
                                placeholder="MD degree&#10;Board certification&#10;Minimum 3 years experience"
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                rows={6}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="benefits">Benefits (one per line) *</Label>
                            <Textarea
                                id="benefits"
                                placeholder="Competitive salary&#10;Health insurance&#10;Retirement plan"
                                value={formData.benefits}
                                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                                rows={6}
                                required
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isSubmitting} className="flex-1">
                                {isSubmitting ? 'Posting...' : 'Post Job'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
