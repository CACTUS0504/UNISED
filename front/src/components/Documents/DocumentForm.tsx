import { Form, Button, Space, Modal, Tabs, Row, Col, Divider, message } from 'antd';
import { useEffect, useState } from 'react';
import { fetchDocumentTypeById } from '@/services/documentTypes';
import { DocumentType } from '@/types/document';
import DocumentField from '@/components/Documents/DocumentField';
import DocumentActions from '@/components/Documents/DocumentActions';
import dayjs from 'dayjs';

const { TabPane } = Tabs;

interface DocumentFormProps {
    documentTypeId: string;
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => Promise<void>;
}

export default function DocumentForm({ documentTypeId, onSubmit, onCancel, visible }: DocumentFormProps) {
    const [form] = Form.useForm();
    const [documentType, setDocumentType] = useState<DocumentType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (!visible) return;

        const loadDocumentType = async () => {
            try {
                const type = await fetchDocumentTypeById(documentTypeId);
                setDocumentType(type);
                form.resetFields();
            } catch (error) {
                console.error('Failed to load document type:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDocumentType();
    }, [documentTypeId, visible]);

    const onFinish = async (values: any) => {
        try {
            // Подготовка данных с корректными типами
            const requestData = {
                typeId: documentTypeId,
                data: Object.fromEntries(
                    Object.entries(values.fields || {}).map(([key, value]) => {
                        const field = documentType?.fields.find(f => f.name === key);
                        return [
                            key,
                            field?.fieldType === 'datetime' && value
                                ? dayjs(value).toISOString()
                                : value
                        ];
                    })
                ),
                attachments: values.attachments || []
            };

            message.success('Документ успешно создан');
            await onSubmit(values);
            form.resetFields();
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'Неизвестная ошибка');
        }
    };

    const renderTabContent = (tab: any) => {
        if (!documentType) return null;

        return (
            <div key={tab.name}>
                {tab.rows.map((row: any, rowIndex: number) => (
                    <Row gutter={16} key={rowIndex}>
                        {row.fields
                            .sort((a: any, b: any) => a.order - b.order)
                            .map((field: any) => {
                                const fieldConfig = documentType.fields.find(f => f.name === field.name);
                                if (!fieldConfig) return null;

                                return (
                                    <Col
                                        span={24 / row.fields.length}
                                        key={field.name}
                                    >
                                        <DocumentField
                                            field={fieldConfig}
                                            name={['fields', field.name]}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                ))}
            </div>
        );
    };

    return (
        <Modal
            title={`Создание документа: ${documentType?.name || ''}`}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
            destroyOnClose
        >
            {loading ? (
                <div>Загрузка формы...</div>
            ) : documentType ? (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        fields: Object.fromEntries(
                            documentType?.fields.map(field => [
                                field.name,
                                field.fieldType === 'bool'
                                    ? false
                                    : field.fieldType === 'datetime' && document.fields?.[field.name]
                                        ? dayjs(document.fields[field.name])
                                        : document.fields?.[field.name] ?? undefined
                            ]) || []
                        )
                    }}
                >
                    <Tabs defaultActiveKey="0">
                        {documentType.layout.tabs.map((tab, index) => (
                            <TabPane tab={tab.name} key={index.toString()}>
                                {renderTabContent(tab)}
                            </TabPane>
                        ))}
                    </Tabs>

                    <Divider />

                    <DocumentActions
                        onSave={() => form.submit()}
                        onCancel={onCancel}
                        saveText="Создать документ"
                    />
                </Form>
            ) : (
                <div>Не удалось загрузить тип документа</div>
            )}
        </Modal>
    );
}