import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import AppLayout from '@/components/layout/AppLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'KITO - Healthcare Job Portal',
    description: 'Connect doctors with healthcare facilities. Find your next opportunity or hire top medical talent.',
    keywords: ['healthcare jobs', 'doctor jobs', 'hospital recruitment', 'medical careers'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <AuthProvider>
                    <AppLayout>{children}</AppLayout>
                </AuthProvider>
            </body>
        </html>
    )
}
