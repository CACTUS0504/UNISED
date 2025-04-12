import { List, Pagination, Button, Space, Tag, Typography } from 'antd'
import { Document } from '@/types/document'
import { Pagination as PaginationType } from '@/types/api'

interface DocumentListProps {
    documents: Document[]
    pagination: PaginationType
    onDocumentSelect: (id: string) => void
}

export default function DocumentList({documents, pagination, onDocumentSelect, loading, error}: DocumentListProps)
    {
        if (error) {
            return <div style={{ color: 'red', padding: 16 }}>{error}</div>;
    }
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <List
                loading={loading}
                dataSource={documents}
                renderItem={(doc) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                onClick={() => onDocumentSelect(doc.id)}
                            >
                                Открыть
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={<Typography.Text strong>{doc.title}</Typography.Text>}
                            description={
                                <Space wrap>
                                    <Tag color={doc.status === 'active' ? 'green' : 'red'}>
                                        {doc.status === 'active' ? 'Активен' : 'Удален'}
                                    </Tag>
                                    <Typography.Text type="secondary">
                                        {doc.regNumber || `ID: ${doc.id.substring(0, 8)}`}
                                    </Typography.Text>
                                    <Typography.Text>{doc.author || 'Система'}</Typography.Text>
                                    <Typography.Text type="secondary">
                                        {doc.createdAt}
                                    </Typography.Text>
                                </Space>
                            }
                        />
                    </List.Item>
                )}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    current={pagination.currentPage}
                    total={pagination.totalItems}
                    pageSize={pagination.itemsPerPage}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `Всего ${total} документов`}
                />
            </div>
        </Space>
    )
}