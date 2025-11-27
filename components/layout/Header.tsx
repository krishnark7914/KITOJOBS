'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Moon, Sun, User, Settings, LogOut, Briefcase } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { user, logout, isAuthenticated } = useAuth();
    const pathname = usePathname();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDark(shouldBeDark);
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
                {/* Menu button for mobile */}
                {isAuthenticated && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2 md:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                )}

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        KITO
                    </span>
                </Link>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Right side actions */}
                <div className="flex items-center space-x-2">
                    {/* Theme toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="mr-2"
                    >
                        {isDark ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    {isAuthenticated ? (
                        /* User dropdown */
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user?.profileImage} alt={user?.name} />
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            {getInitials(user?.name || 'U')}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground capitalize">
                                            {user?.role} Account
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        /* Login/Signup buttons */
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" asChild>
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/signup">Sign up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
