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

    const logout = () => {
        setUser(null);
        setStoredUser(null);
    };

    const updateProfile = async (userData: Partial<User>) => {
        if (!user) return;

        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        setStoredUser(updatedUser);
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
                logout,
                updateProfile,
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
