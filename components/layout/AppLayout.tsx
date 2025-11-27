'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { isAuthenticated } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <div className="flex">
                {isAuthenticated && (
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                )}

                <main
                    className={`flex-1 transition-all duration-300 ${isAuthenticated ? 'md:ml-64' : ''
                        }`}
                >
                    <div className="container mx-auto p-4 md:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
