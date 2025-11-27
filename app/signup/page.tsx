'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase } from 'lucide-react';
import { UserRole } from '@/types';

export default function SignupPage() {
    const router = useRouter();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '' as UserRole | '',
        // Doctor fields
        specialization: '',
        // Hospital fields
        hospitalName: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.role) {
            setError('Please select an account type');
            return;
        }

        setIsLoading(true);

        try {
            const userData: any = {
                name: formData.name,
                email: formData.email,
                role: formData.role,
            };

            if (formData.role === 'doctor') {
                userData.specialization = formData.specialization;
            } else {
                userData.hospitalName = formData.hospitalName;
            }

            await signup(userData, formData.password);
            router.push('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <Briefcase className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Join KITO to find opportunities or hire talent
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="role">Account Type</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
                            >
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="doctor">Doctor</SelectItem>
                                    <SelectItem value="hospital">Hospital</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        {formData.role === 'doctor' && (
                            <div className="space-y-2">
                                <Label htmlFor="specialization">Specialization</Label>
                                <Input
                                    id="specialization"
                                    placeholder="e.g., Cardiology"
                                    value={formData.specialization}
                                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        {formData.role === 'hospital' && (
                            <div className="space-y-2">
                                <Label htmlFor="hospitalName">Hospital Name</Label>
                                <Input
                                    id="hospitalName"
                                    placeholder="e.g., City Medical Center"
                                    value={formData.hospitalName}
                                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                                    required
                                />
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Creating account...' : 'Sign up'}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline">
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
