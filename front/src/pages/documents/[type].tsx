import { useRouter } from 'next/router'
import { Breadcrumb, Card, Spin } from 'antd'
import DocumentList from '@/components/Documents/DocumentList'
import useDocuments from '@/hooks/useDocuments'
import { HomeOutlined } from '@ant-design/icons'

export default function DocumentTypePage() {
    const router = useRouter()
    const { type } = router.query as { type: string }

    const { documents, loading, pagination } = useDocuments(type)

    const documentTypes = {
        inbox: 'Входящие документы',
        outbox: 'Исходящие документы',
        drafts: 'Черновики',
        pending: 'Документы на согласовании',
        completed: 'Завершенные документы',
        templates: 'Шаблоны документов',
    }

    return (
        <>
            <Breadcrumb
                style={{ marginBottom: 16 }}
                items={[
                    { href: '/', title: <HomeOutlined /> },
                    { title: documentTypes[type as keyof typeof documentTypes] || type },
                ]}
            />

            <Card title={documentTypes[type as keyof typeof documentTypes] || type}>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <DocumentList
                        documents={documents}
                        pagination={pagination}
                        onDocumentSelect={(id) => router.push(`/documents/${type}/${id}`)}
                    />
                )}
            </Card>
        </>
    )
}