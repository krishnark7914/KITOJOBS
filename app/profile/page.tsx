'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { User, Building } from 'lucide-react';

export default function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        // Doctor fields
        specialization: user?.specialization || '',
        experience: user?.experience || 0,
        licenseNumber: user?.licenseNumber || '',
        bio: user?.bio || '',
        // Hospital fields
        hospitalName: user?.hospitalName || '',
        hospitalType: user?.hospitalType || '',
        address: user?.address || '',
        about: user?.about || '',
    });

    const handleSave = async () => {
        setIsSaving(true);
        await updateProfile(formData);
        setIsEditing(false);
        setIsSaving(false);
    };

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your account information
                    </p>
                </div>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                    <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditing(false);
                                setFormData({
                                    name: user.name,
                                    email: user.email,
                                    specialization: user.specialization || '',
                                    experience: user.experience || 0,
                                    licenseNumber: user.licenseNumber || '',
                                    bio: user.bio || '',
                                    hospitalName: user.hospitalName || '',
                                    hospitalType: user.hospitalType || '',
                                    address: user.address || '',
                                    about: user.about || '',
                                });
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.profileImage} alt={user.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{user.name}</CardTitle>
                            <CardDescription className="text-base capitalize">
                                {user.role === 'doctor' ? (
                                    <span className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        Doctor {user.specialization && `• ${user.specialization}`}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <Building className="h-4 w-4" />
                                        Hospital {user.hospitalName && `• ${user.hospitalName}`}
                                    </span>
                                )}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="professional">Professional</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Your basic account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="professional" className="space-y-4">
                    {user.role === 'doctor' ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Professional Information</CardTitle>
                                <CardDescription>Your medical credentials and experience</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="specialization">Specialization</Label>
                                        <Input
                                            id="specialization"
                                            value={formData.specialization}
                                            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="experience">Years of Experience</Label>
                                        <Input
                                            id="experience"
                                            type="number"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="licenseNumber">License Number</Label>
                                    <Input
                                        id="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        disabled={!isEditing}
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Hospital Information</CardTitle>
                                <CardDescription>Your facility details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="hospitalName">Hospital Name</Label>
                                        <Input
                                            id="hospitalName"
                                            value={formData.hospitalName}
                                            onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="hospitalType">Hospital Type</Label>
                                        <Input
                                            id="hospitalType"
                                            value={formData.hospitalType}
                                            onChange={(e) => setFormData({ ...formData, hospitalType: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="about">About</Label>
                                    <Textarea
                                        id="about"
                                        value={formData.about}
                                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                        disabled={!isEditing}
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
