import { useState, useEffect } from 'react';
import { Document } from '@/types/document';
import { Pagination } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5160/api';

// Функция для форматирования даты
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
        ? 'Дата не указана'
        : date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
};

export default function useDocuments(typeId: string) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const refresh = async () => {
        await fetchDocuments();
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1,
    });

    const fetchDocuments = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${API_URL}/documents/type/${typeId}?page=${page}&pageSize=${pagination.itemsPerPage}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const transformedDocs = data.map((doc: any) => ({
                id: doc.id,
                typeId: doc.typeId,
                title: doc.data['Название'] || `Документ ${doc.id.substring(0, 8)}`,
                fields: doc.data,
                rawDate: doc.createdAt, // Сохраняем оригинальную дату
                createdAt: formatDate(doc.createdAt), // Форматированная дата
                status: doc.isDeleted ? 'deleted' : 'active',
            }));

            setDocuments(transformedDocs);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось загрузить документы');
            console.error('Error fetching documents:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typeId) {
            fetchDocuments();
        }
    }, [typeId]);

    const handlePageChange = (page: number) => {
        fetchDocuments(page);
    };

    return {
        documents,
        loading,
        error,
        pagination,
        handlePageChange,
        refresh
    };
}