import { useState, useEffect } from 'react';
import { mockApi } from '@/utils/api';
import { Document } from '@/types/document';
import { Pagination } from '@/types/api';

export default function useDocuments(typeId: string) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1,
    });

    const fetchDocuments = async (page = 1) => {
        setLoading(true);
        try {
            // Здесь нужно заменить mockApi на реальный вызов к вашему ASP.NET API
            // Например:
            // const response = await fetch(`/api/documents?type=${typeId}&page=${page}`);
            // const data = await response.json();

            // Временно используем мок данные:
            const response = await mockApi.getDocuments(typeId, page, pagination.itemsPerPage);
            setDocuments(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error('Error fetching documents:', error);
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
        pagination,
        handlePageChange,
        refresh: () => fetchDocuments(pagination.currentPage),
    };
}