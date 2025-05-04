import { Button } from 'antd';
import { useRouter } from 'next/router';
import { logout } from '@/services/auth';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    return (
        <Button danger onClick={handleLogout}>
            Выйти
        </Button>
    );
}