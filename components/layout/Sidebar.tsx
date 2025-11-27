'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Home,
    Briefcase,
    FileText,
    PlusCircle,
    User,
    Settings,
    X,
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { user } = useAuth();
    const pathname = usePathname();

    const doctorNavItems = [
        { href: '/', label: 'Dashboard', icon: Home },
        { href: '/jobs', label: 'Browse Jobs', icon: Briefcase },
        { href: '/my-applications', label: 'My Applications', icon: FileText },
        { href: '/profile', label: 'Profile', icon: User },
        { href: '/settings', label: 'Settings', icon: Settings },
    ];

    const hospitalNavItems = [
        { href: '/', label: 'Dashboard', icon: Home },
        { href: '/jobs', label: 'All Jobs', icon: Briefcase },
        { href: '/my-jobs', label: 'My Job Posts', icon: FileText },
        { href: '/jobs/new', label: 'Post a Job', icon: PlusCircle },
        { href: '/profile', label: 'Profile', icon: User },
        { href: '/settings', label: 'Settings', icon: Settings },
    ];

    const navItems = user?.role === 'hospital' ? hospitalNavItems : doctorNavItems;

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 md:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Close button for mobile */}
                    <div className="flex items-center justify-between p-4 md:hidden">
                        <span className="text-lg font-semibold">Menu</span>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <Separator className="md:hidden" />

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User info at bottom */}
                    <div className="border-t p-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <User className="h-5 w-5" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium">{user?.name}</p>
                                <p className="truncate text-xs text-muted-foreground capitalize">
                                    {user?.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
