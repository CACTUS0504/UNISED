// Заглушки для API
export const mockApi = {
    getDocuments: async (type: string, page = 1, pageSize = 10) => {
        // Имитация задержки сети
        await new Promise((resolve) => setTimeout(resolve, 500))

        const mockDocuments: Document[] = Array.from({ length: 45 }, (_, i) => ({
            id: `doc-${type}-${i + (page - 1) * pageSize}`,
            type,
            title: `Документ ${i + 1 + (page - 1) * pageSize}`,
            regNumber: `${type}-${1000 + i}`,
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            author: `Автор ${i % 5 + 1}`,
            status: ['draft', 'pending', 'approved', 'rejected', 'completed'][i % 5] as any,
            content: `Содержание документа ${i + 1}`,
        }))

        return {
            data: mockDocuments.slice(0, pageSize),
            pagination: {
                currentPage: page,
                itemsPerPage: pageSize,
                totalItems: 45,
                totalPages: Math.ceil(45 / pageSize),
            },
        }
    },

    getDocument: async (id: string) => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return {
            id,
            type: id.split('-')[1],
            title: `Документ ${id.split('-')[2]}`,
            regNumber: `${id.split('-')[1].toUpperCase()}-${1000 + parseInt(id.split('-')[2])}`,
            date: new Date().toLocaleDateString(),
            author: 'Иванов И.И.',
            status: 'draft',
            content: 'Полное содержание документа. Здесь может быть много текста и форматирования.',
            attachments: [
                { name: 'Приложение 1.pdf', size: '2.4 MB', url: '#' },
                { name: 'Дополнительные материалы.zip', size: '5.1 MB', url: '#' },
            ],
        }
    },

    updateDocument: async (id: string, data: Partial<Document>) => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return { success: true }
    },

    startWorkflow: async (id: string, workflowType: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return { success: true }
    },
}