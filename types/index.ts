// TypeScript type definitions for KITO

export type UserRole = 'doctor' | 'hospital';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'locum';

export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    profileImage?: string;
    createdAt: Date;
    // Doctor-specific fields
    specialization?: string;
    experience?: number;
    qualifications?: string[];
    licenseNumber?: string;
    bio?: string;
    skills?: string[];
    // Hospital-specific fields
    hospitalName?: string;
    hospitalType?: string;
    hospitalSize?: string;
    address?: string;
    departments?: string[];
    facilities?: string[];
    about?: string;
}

export interface Job {
    id: string;
    title: string;
    hospitalId: string;
    hospitalName: string;
    hospitalLogo?: string;
    description: string;
    requirements: string[];
    benefits: string[];
    specialization: string;
    jobType: JobType;
    location: string;
    salaryMin: number;
    salaryMax: number;
    postedDate: Date;
    applicationDeadline?: Date;
    isActive: boolean;
}

export interface Application {
    id: string;
    jobId: string;
    doctorId: string;
    doctorName: string;
    doctorEmail: string;
    coverLetter: string;
    resume?: string;
    status: ApplicationStatus;
    appliedDate: Date;
    reviewedDate?: Date;
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: Date;
    link?: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: any, password: string) => Promise<void>;
    loginWithGoogle: (role: UserRole) => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<void>;
    isLoading: boolean;
    isAuthenticated: boolean;
}
