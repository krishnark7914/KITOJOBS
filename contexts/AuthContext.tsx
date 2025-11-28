'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User, AuthContextType } from '@/types';
import { getStoredUser, setStoredUser, mockUsers } from '@/lib/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            if (status === 'loading') return;

            if (session?.user) {
                // Check if we have a stored user profile for this email
                const storedUser = getStoredUser();

                if (storedUser && storedUser.email === session.user.email) {
                    setUser(storedUser);
                } else {
                    // New Google user or first time login on this device
                    // Check for pending role from login/signup flow
                    const pendingRole = localStorage.getItem('pendingRole') as User['role'] | null;
                    const role = pendingRole || 'doctor'; // Default to doctor if no role found

                    const newUser: User = {
                        id: session.user.email || 'google-user',
                        name: session.user.name || 'Google User',
                        email: session.user.email || '',
                        role: role,
                        profileImage: session.user.image || undefined,
                        createdAt: new Date(),
                    };

                    // Add role-specific fields
                    if (role === 'doctor') {
                        (newUser as any).specialization = 'General Practitioner';
                        (newUser as any).experience = '0 years';
                    } else {
                        (newUser as any).hospitalName = 'New Hospital';
                        (newUser as any).location = 'Unknown';
                    }

                    setUser(newUser);
                    setStoredUser(newUser);
                    localStorage.removeItem('pendingRole'); // Clear pending role
                }
            } else {
                // No session, check local storage for non-Google login (if we still want to support it)
                // For now, we'll rely on session for Google auth, but keep local storage for mock auth compatibility
                const storedUser = getStoredUser();
                if (storedUser) {
                    setUser(storedUser);
                } else {
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, [session, status]);

    const login = async (email: string, password: string) => {
        // Mock login - in production, this would call an API
        const foundUser = mockUsers.find(u => u.email === email);

        if (!foundUser) {
            throw new Error('Invalid email or password');
        }

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
        localStorage.setItem('pendingRole', role);
        await signIn('google', { callbackUrl: '/' });
    };

    const logout = async () => {
        setUser(null);
        setStoredUser(null);
        await signOut({ callbackUrl: '/login' });
    };

    const updateProfile = async (userData: Partial<User>) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            setStoredUser(updatedUser);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                loginWithGoogle,
                logout,
                updateProfile,
                isLoading,
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
