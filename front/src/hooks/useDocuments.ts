import { useState, useEffect } from 'react'
import { mockApi } from '@/utils/api'
import { Document } from '@/types/document'

interface Pagination {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
}

export default function useDocuments(type: string) {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1,
    })

    const fetchDocuments = async (page = 1) => {
        setLoading(true)
        try {
            const response = await mockApi.getDocuments(type, page, pagination.itemsPerPage)
            setDocuments(response.data)
            setPagination(response.pagination)
        } catch (error) {
            console.error('Error fetching documents:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDocuments()
    }, [type])

    const handlePageChange = (page: number) => {
        fetchDocuments(page)
    }

    return {
        documents,
        loading,
        pagination,
        handlePageChange,
        refresh: () => fetchDocuments(pagination.currentPage),
    }
}