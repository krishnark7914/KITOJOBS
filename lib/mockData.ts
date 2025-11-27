import { Job, User, Notification } from '@/types';

// Mock users
export const mockUsers: User[] = [
    {
        id: '1',
        email: 'dr.smith@example.com',
        name: 'Dr. Sarah Smith',
        role: 'doctor',
        profileImage: '',
        specialization: 'Cardiology',
        experience: 8,
        qualifications: ['MD', 'FACC', 'Board Certified'],
        licenseNumber: 'MD123456',
        bio: 'Experienced cardiologist with a focus on interventional cardiology and heart failure management.',
        skills: ['Echocardiography', 'Cardiac Catheterization', 'Heart Failure Management'],
        createdAt: new Date('2024-01-15'),
    },
    {
        id: '2',
        email: 'hospital@citymed.com',
        name: 'Admin User',
        role: 'hospital',
        profileImage: '',
        hospitalName: 'City Medical Center',
        hospitalType: 'General Hospital',
        hospitalSize: '500+ beds',
        address: '123 Medical Plaza, New York, NY 10001',
        departments: ['Emergency', 'Cardiology', 'Neurology', 'Pediatrics', 'Surgery'],
        facilities: ['ICU', 'NICU', 'Cath Lab', 'MRI', 'CT Scan'],
        about: 'Leading healthcare provider serving the community for over 50 years.',
        createdAt: new Date('2024-01-10'),
    },
];

// Mock jobs
export const mockJobs: Job[] = [
    {
        id: '1',
        title: 'Cardiologist - Full Time',
        hospitalId: '2',
        hospitalName: 'City Medical Center',
        description: 'We are seeking an experienced Cardiologist to join our growing cardiology department. The ideal candidate will have expertise in both invasive and non-invasive cardiology procedures.',
        requirements: [
            'MD degree with cardiology specialization',
            'Board certification in Cardiology',
            'Minimum 3 years of experience',
            'Active medical license',
            'Excellent communication skills',
        ],
        benefits: [
            'Competitive salary package',
            'Health insurance',
            'Retirement plan',
            'CME allowance',
            'Paid time off',
        ],
        specialization: 'Cardiology',
        jobType: 'full-time',
        location: 'New York, NY',
        salaryMin: 250000,
        salaryMax: 350000,
        postedDate: new Date('2024-11-20'),
        applicationDeadline: new Date('2024-12-31'),
        isActive: true,
    },
    {
        id: '2',
        title: 'Emergency Medicine Physician',
        hospitalId: '2',
        hospitalName: 'City Medical Center',
        description: 'Join our busy Emergency Department team. We handle over 50,000 visits annually and are looking for dedicated EM physicians.',
        requirements: [
            'MD or DO degree',
            'Board certified in Emergency Medicine',
            'ACLS and PALS certification',
            'Strong decision-making skills',
            'Team player',
        ],
        benefits: [
            'Competitive compensation',
            'Malpractice insurance',
            'Health and dental coverage',
            'Flexible scheduling',
            'Sign-on bonus',
        ],
        specialization: 'Emergency Medicine',
        jobType: 'full-time',
        location: 'New York, NY',
        salaryMin: 280000,
        salaryMax: 320000,
        postedDate: new Date('2024-11-22'),
        isActive: true,
    },
    {
        id: '3',
        title: 'Pediatrician - Part Time',
        hospitalId: '2',
        hospitalName: 'City Medical Center',
        description: 'Part-time opportunity for a pediatrician in our outpatient clinic. Perfect for work-life balance.',
        requirements: [
            'MD with pediatrics specialization',
            'Board certified',
            'Minimum 2 years experience',
            'Excellent bedside manner',
        ],
        benefits: [
            'Flexible hours',
            'Pro-rated benefits',
            'Supportive team environment',
            'Modern facilities',
        ],
        specialization: 'Pediatrics',
        jobType: 'part-time',
        location: 'New York, NY',
        salaryMin: 120000,
        salaryMax: 160000,
        postedDate: new Date('2024-11-18'),
        isActive: true,
    },
];

// Helper functions for localStorage
export const getStoredUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('kito_user');
    if (!stored) return null;
    const user = JSON.parse(stored);
    // Convert date strings back to Date objects
    user.createdAt = new Date(user.createdAt);
    return user;
};

export const setStoredUser = (user: User | null) => {
    if (typeof window === 'undefined') return;
    if (user) {
        localStorage.setItem('kito_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('kito_user');
    }
};

export const getStoredJobs = (): Job[] => {
    if (typeof window === 'undefined') return mockJobs;
    const stored = localStorage.getItem('kito_jobs');
    if (!stored) return mockJobs;
    const jobs = JSON.parse(stored);
    // Convert date strings back to Date objects
    return jobs.map((job: any) => ({
        ...job,
        postedDate: new Date(job.postedDate),
        applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline) : undefined,
    }));
};

export const setStoredJobs = (jobs: Job[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kito_jobs', JSON.stringify(jobs));
};
