import { useRouter } from 'next/router'
import { Breadcrumb, Card, Spin, Button, Space, message } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import DocumentEditor from '@/components/Documents/DocumentEditor'
import useDocument from '@/hooks/useDocument'

export default function DocumentPage() {
    const router = useRouter()
    const { type, id } = router.query as { type: string; id: string }

    const { document, loading, updateDocument, startWorkflow } = useDocument(id)

    const documentTypes = {
        inbox: 'Входящие документы',
        outbox: 'Исходящие документы',
        drafts: 'Черновики',
        pending: 'Документы на согласовании',
        completed: 'Завершенные документы',
        templates: 'Шаблоны документов',
    }

    const handleSave = async (values: any) => {
        try {
            await updateDocument(values)
            message.success('Документ сохранен')
        } catch (error) {
            message.error('Ошибка при сохранении документа')
        }
    }

    const handleStartApproval = async () => {
        try {
            await startWorkflow('approval')
            message.success('Процесс согласования запущен')
            router.push(`/documents/pending`)
        } catch (error) {
            message.error('Ошибка при запуске процесса')
        }
    }

    return (
        <>
            <Breadcrumb
                style={{ marginBottom: 16 }}
                items={[
                    { href: '/', title: <HomeOutlined /> },
                    { href: `/documents/${type}`, title: documentTypes[type as keyof typeof documentTypes] || type },
                    { title: document?.title || 'Документ' },
                ]}
            />

            {loading ? (
                <Spin size="large" />
            ) : document ? (
                <Card
                    title={document.title}
                    extra={
                        <Space>
                            <Button type="primary" onClick={handleStartApproval}>
                                На согласование
                            </Button>
                            <Button type="default">Печать</Button>
                        </Space>
                    }
                >
                    <DocumentEditor document={document} onSave={handleSave} />
                </Card>
            ) : (
                <Card>Документ не найден</Card>
            )}
        </>
    )
}