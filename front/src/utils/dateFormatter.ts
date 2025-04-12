export const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return 'Дата не указана';
        }

        // Вариант 1: Полный формат с временем
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Вариант 2: Только дата
        // return date.toLocaleDateString('ru-RU');

        // Вариант 3: Кастомный формат
        // return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    } catch {
        return 'Дата не указана';
    }
};