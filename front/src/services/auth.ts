interface User {
    id: string;
    name: string;
    role: string;
    token: string;
}

export const signIn = async (
    username: string,
    password: string
): Promise<User | null> => {
    // Здесь должна быть реальная проверка учетных данных
    // Пример заглушки:
    if (username === 'admin' && password === 'admin') {
        return {
            id: '1',
            name: 'Администратор',
            role: 'admin',
            token: 'fake-jwt-token'
        };
    }
    return null;
};

export const getToken = (): string | null => {
    // Реализация получения токена из cookies/localStorage
    return typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null;
};

export const logout = async (): Promise<void> => {
    // Очищаем токен
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};