import { useState, useEffect } from 'react'
import { mockApi } from '@/utils/api'
import { Document } from '@/types/document'

export default function useDocument(id: string) {
    const [document, setDocument] = useState<Document | null>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    const fetchDocument = async () => {
        setLoading(true)
        try {
            const response = await mockApi.getDocument(id)
            setDocument(response)
        } catch (error) {
            console.error('Error fetching document:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateDocument = async (values: Partial<Document>) => {
        setUpdating(true)
        try {
            await mockApi.updateDocument(id, values)
            setDocument((prev) => (prev ? { ...prev, ...values } : null))
            return true
        } catch (error) {
            console.error('Error updating document:', error)
            return false
        } finally {
            setUpdating(false)
        }
    }

    const startWorkflow = async (workflowType: string) => {
        try {
            await mockApi.startWorkflow(id, workflowType)
            return true
        } catch (error) {
            console.error('Error starting workflow:', error)
            return false
        }
    }

    useEffect(() => {
        fetchDocument()
    }, [id])

    return {
        document,
        loading,
        updating,
        updateDocument,
        startWorkflow,
        refresh: fetchDocument,
    }
}