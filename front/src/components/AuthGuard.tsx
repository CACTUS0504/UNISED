import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getToken } from '@/services/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
    }, [router]);

    return authorized ? <>{children}</> : null;
}