export interface DocumentType {
    id: string;
    name: string;
    description?: string;
    fields: DocumentField[];
    layout: DocumentLayout;
    createdAt: string;
}

export interface DocumentField {
    name: string;
    type: 'text' | 'number' | 'date' | 'select' | 'textarea';
    required: boolean;
    options?: string[];
}

export interface DocumentLayout {
    // Определите структуру вашего layout
    sections: Array<{
        title: string;
        fields: string[]; // field names
    }>;
}