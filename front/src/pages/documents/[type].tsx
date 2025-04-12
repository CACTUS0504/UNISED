import { useRouter } from 'next/router';
import { Breadcrumb, Card, Spin, Typography } from 'antd';
import DocumentList from '@/components/Documents/DocumentList';
import useDocuments from '@/hooks/useDocuments';
import { HomeOutlined } from '@ant-design/icons';
import { fetchDocumentTypeById } from '@/services/documentTypes';
import { useEffect, useState } from 'react';
import { DocumentType } from '@/types/document';

const { Title } = Typography;

export default function DocumentTypePage() {
    const router = useRouter();
    const { type: typeId } = router.query as { type: string };
    const [documentType, setDocumentType] = useState<DocumentType | null>(null);
    const [loadingType, setLoadingType] = useState(true);

    const { documents, loading, pagination } = useDocuments(typeId);

    useEffect(() => {
        if (typeId) {
            const loadType = async () => {
                try {
                    const type = await fetchDocumentTypeById(typeId);
                    setDocumentType(type);
                } catch (err) {
                    console.error('Failed to load document type:', err);
                } finally {
                    setLoadingType(false);
                }
            };
            loadType();
        }
    }, [typeId]);

    return (
        <>
            <Breadcrumb
                style={{ marginBottom: 16 }}
                items={[
                    { href: '/', title: <HomeOutlined /> },
                    { title: loadingType ? 'Загрузка...' : documentType?.name || 'Неизвестный тип' },
                ]}
            />

            <Card title={documentType?.name || 'Документы'}>
                {loading || loadingType ? (
                    <Spin size="large" />
                ) : (
                    <DocumentList
                        documents={documents}
                        pagination={pagination}
                        onDocumentSelect={(id) => router.push(`/documents/${typeId}/${id}`)}
                    />
                )}
            </Card>
        </>
    );
}