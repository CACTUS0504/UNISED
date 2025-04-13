export type DocumentStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'completed' | 'active' | 'deleted';

export type FieldType = 'string' | 'number' | 'datetime' | 'bool' | 'select';

export interface DocumentTypeField {
    name: string;
    fieldType: FieldType;
    isRequired: boolean;
    description?: string;
    options?: string[];
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
        fieldType: 'string' | 'number' | 'datetime' | 'boolean' | 'select';
        isRequired: boolean;
        description?: string;
        options?: string[];
    }>;
    createdAt: string;
}

export interface Document {
    id: string;
    typeId: string;
    title: string;
    fields: Record<string, any>;
    attachments?: string[];
    status: DocumentStatus;
    createdAt: string;
    updatedAt?: string;
    author?: string;
    regNumber?: string;
}