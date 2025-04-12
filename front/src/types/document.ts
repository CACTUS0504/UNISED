export type DocumentStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'completed' | 'active' | 'deleted';

export interface Document {
    id: string;
    typeId: string;
    title: string;
    fields: Record<string, any>;
    status: DocumentStatus;
    rawDate: string; // Оригинальная дата в формате ISO
    createdAt: string; // Отформатированная дата
    updatedAt?: string;
    author?: string;
    regNumber?: string;
}

export interface DocumentType {
    id: string;
    name: string;
    description?: string;
    layout: {
        tabs: Array<{
            name: string;
            rows: Array<{
                fields: Array<{
                    name: string;
                    order: number;
                }>;
            }>;
        }>;
    };
    fields: Array<{
        name: string;
        fieldType: 'string' | 'number' | 'datetime' | 'bool' | 'select';
        isRequired: boolean;
        description?: string;
        options?: string[];
    }>;
    createdAt: string;
}