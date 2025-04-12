import { Layout, Menu, Typography, Spin } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchDocumentTypes } from '@/services/documentTypes';
import { DocumentType } from '@/types/document';

const { Sider } = Layout;
const { Title } = Typography;

export default function SideNav() {
    const router = useRouter();
    const [types, setTypes] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTypes = async () => {
            try {
                const data = await fetchDocumentTypes();
                setTypes(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load document types');
            } finally {
                setLoading(false);
            }
        };

        loadTypes();
    }, []);

    if (error) {
        return (
            <Sider width={250} theme="light">
                <div style={{ padding: 16, color: 'red' }}>{error}</div>
            </Sider>
        );
    }

    return (
        <Sider width={250} theme="light" breakpoint="lg" collapsedWidth="0">
            <div style={{ padding: '16px 24px' }}>
                <Title level={4} style={{ margin: 0 }}>
                    Документооборот ВУЗа
                </Title>
            </div>

            {loading ? (
                <div style={{ padding: 16, textAlign: 'center' }}>
                    <Spin />
                </div>
            ) : (
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[router.query.type as string || '']}
                    items={types.map(type => ({
                        key: type.id,
                        icon: <FolderOutlined />,
                        label: type.name,
                        onClick: () => router.push(`/documents/${type.id}`),
                    }))}
                />
            )}
        </Sider>
    );
}