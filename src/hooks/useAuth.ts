// hooks/useAuth.ts
// Custom hook to manage authentication state and redirect logic

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/src/lib/auth-client';
import { toast } from 'sonner';

interface AuthUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    username: string;
    role: string;
    image?: string;
}

export const useAuth = () => {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await authClient.getSession();
                
                if (session?.data?.user) {
                    setUser(session.data.user as any);
                    setError(null);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setError('Failed to check authentication');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await authClient.signOut();
            setUser(null);
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (err) {
            toast.error('Failed to log out');
            console.error('Logout error:', err);
        }
    };

    const redirectByRole = (defaultPath = '/dashboard') => {
        if (!user) return;

        const userRole = user.role?.toUpperCase();
        if (userRole === 'ADMIN') {
            router.push('/admin-dashboard');
        } else if (userRole === 'CUSTOMER') {
            router.push('/dashboard');
        } else {
            router.push(defaultPath);
        }
    };

    return {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        logout,
        redirectByRole,
    };
};
