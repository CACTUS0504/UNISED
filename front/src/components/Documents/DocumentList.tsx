import { List, Pagination, Button, Space, Tag, Typography } from 'antd'
import { Document } from '@/types/document'
import { Pagination as PaginationType } from '@/types/api'

interface DocumentListProps {
    documents: Document[]
    pagination: PaginationType
    onDocumentSelect: (id: string) => void
}

export default function DocumentList({ documents, pagination, onDocumentSelect }: DocumentListProps) {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <List
                dataSource={documents}
                renderItem={(doc) => (
                    <List.Item
                        actions={[
                            <Button type="link" onClick={() => onDocumentSelect(doc.id)}>
                                Открыть
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={<Typography.Text strong>{doc.title}</Typography.Text>}
                            description={
                                <Space>
                                    <Tag color="blue">{doc.type}</Tag>
                                    <Typography.Text type="secondary">{doc.regNumber}</Typography.Text>
                                    <Typography.Text>{doc.author}</Typography.Text>
                                    <Typography.Text type="secondary">{doc.date}</Typography.Text>
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