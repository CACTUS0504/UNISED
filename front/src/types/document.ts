export type DocumentStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'completed'

export interface Document {
    id: string
    type: string
    title: string
    regNumber?: string
    date: string
    author: string
    status: DocumentStatus
    content: string
    attachments?: Array<{
        name: string
        size: string
        url: string
    }>
    workflow?: {
        currentStep: number
        steps: Array<{
            name: string
            approver: string
            status: 'pending' | 'approved' | 'rejected'
            date?: string
            comment?: string
        }>
    }
}

export interface DocumentType {
    id: string
    name: string
    description: string
    fields: Array<{
        name: string
        type: 'text' | 'number' | 'date' | 'select' | 'textarea'
        required: boolean
        options?: string[]
    }>
}