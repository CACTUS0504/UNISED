import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '@/services/auth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { username, password } = req.body;

        // Здесь должна быть ваша логика проверки учетных данных
        const user = await signIn(username, password);

        if (!user) {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }

        // Устанавливаем cookie с токеном (пример для JWT)
        res.setHeader('Set-Cookie', `token=${user.token}; Path=/; HttpOnly`);
        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}