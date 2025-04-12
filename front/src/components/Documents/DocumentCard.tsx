import { Card, Descriptions, Tag, Typography } from 'antd'
import { Document } from '@/types/document'

const { Title, Text } = Typography

interface DocumentCardProps {
    document: Document
}

export default function DocumentCard({ document }: DocumentCardProps) {
    return (
        <Card title={<Title level={4}>{document.title}</Title>}>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Тип документа">
                    <Tag color="blue">{document.type}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Регистрационный номер">
                    <Text strong>{document.regNumber}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Дата создания">
                    <Text>{document.date}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Автор">
                    <Text>{document.author}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Статус">
                    <Tag color={document.status === 'draft' ? 'default' :
                        document.status === 'pending' ? 'orange' :
                            document.status === 'approved' ? 'green' : 'red'}>
                        {document.status === 'draft' ? 'Черновик' :
                            document.status === 'pending' ? 'На согласовании' :
                                document.status === 'approved' ? 'Утвержден' : 'Отклонен'}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}