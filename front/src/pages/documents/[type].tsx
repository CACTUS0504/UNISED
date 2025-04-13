import { useRouter } from 'next/router';
import { Breadcrumb, Card, Spin, Button, message } from 'antd';
import DocumentList from '@/components/Documents/DocumentList';
import useDocuments from '@/hooks/useDocuments';
import { HomeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import DocumentForm from '@/components/Documents/DocumentForm';

export default function DocumentTypePage() {
    const router = useRouter();
    const { type: typeId } = router.query as { type: string };
    const { documents, loading, pagination, refresh } = useDocuments(typeId);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);

    const handleCreate = () => setIsFormVisible(true);
    const handleCancel = () => setIsFormVisible(false);

    const handleSubmit = async (values: any) => {
        setFormSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    typeId,
                    data: values.fields,
                    attachments: values.attachments || []
                }),
            });

            if (!response.ok) throw new Error(await response.text());

            message.success('Документ создан');
            setIsFormVisible(false);
            await refresh(); // Функция из useDocuments
        } catch (error) {
            message.error(`Ошибка: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <>
            <Breadcrumb
                style={{ marginBottom: 16 }}
                items={[
                    { href: '/', title: <HomeOutlined /> },
                    { title: 'Документы' },
                ]}
            />

            <Card
                title="Документы"
                extra={
                    <Button
                        type="primary"
                        onClick={() => setIsFormVisible(true)}
                    >
                        Создать документ
                    </Button>
                }
            >
                <DocumentList
                    documents={documents}
                    pagination={pagination}
                    onDocumentSelect={(id) => router.push(`/documents/${typeId}/${id}`)}
                    loading={loading}
                />
            </Card>

            <DocumentForm
                documentTypeId={typeId}
                onSubmit={handleSubmit}
                onCancel={() => setIsFormVisible(false)}
                visible={isFormVisible}
            />
        </>
    );
}