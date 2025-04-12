import { DocumentType } from '@/types/document';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchDocumentTypes = async (): Promise<DocumentType[]> => {
    const response = await fetch(`${API_URL}/documenttypes`);
    if (!response.ok) {
        throw new Error('Failed to fetch document types');
    }
    return response.json();
};

export const fetchDocumentTypeById = async (id: string): Promise<DocumentType> => {
    const response = await fetch(`${API_URL}/documenttypes/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch document type');
    }
    return response.json();
};