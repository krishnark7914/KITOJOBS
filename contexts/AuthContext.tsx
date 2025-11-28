'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';
import { getStoredUser, setStoredUser, mockUsers } from '@/lib/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on mount
        const storedUser = getStoredUser();
        setUser(storedUser);
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // Mock login - in production, this would call an API
        const foundUser = mockUsers.find(u => u.email === email);

        if (!foundUser) {
            throw new Error('Invalid email or password');
        }

        // In a real app, you'd verify the password here
        setUser(foundUser);
        setStoredUser(foundUser);
    };

    const signup = async (userData: Partial<User>, password: string) => {
        // Mock signup - in production, this would call an API
        const newUser: User = {
            id: Date.now().toString(),
            email: userData.email!,
            name: userData.name!,
            role: userData.role!,
            createdAt: new Date(),
            ...userData,
        };

        setUser(newUser);
        setStoredUser(newUser);
    };

    const loginWithGoogle = async (role: User['role']) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const googleUser: User = {
            id: 'google-user-123',
            name: 'Google User',
            email: 'google.user@example.com',
            role: role,
            profileImage: 'https://lh3.googleusercontent.com/a/default-user=s96-c', // Mock Google avatar
            // Assuming 'joinedDate' is equivalent to 'createdAt' in the existing User type
            createdAt: new Date(),
        };

        // The original User type doesn't have 'specialization', 'experience', 'hospitalName', 'location' directly.
        // To maintain type safety, these would typically be part of a 'profile' object or conditional types.
        // For this mock, we'll add them directly, assuming the User type can be extended or is flexible.
        if (role === 'doctor') {
            (googleUser as any).specialization = 'General Practitioner';
            (googleUser as any).experience = '5 years';
        } else { // Assuming 'patient' or other roles
            (googleUser as any).hospitalName = 'Google Health Center';
            (googleUser as any).location = 'Mountain View, CA';
        }

        setUser(googleUser);
        setStoredUser(googleUser); // Using existing setStoredUser
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        setStoredUser(null); // Using existing setStoredUser
    };

    const updateProfile = async (userData: Partial<User>) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            setStoredUser(updatedUser); // Using existing setStoredUser
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return null; // Or a loading spinner
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                loginWithGoogle, // Added loginWithGoogle
                logout,
                updateProfile,
                isLoading, // Added isLoading
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
