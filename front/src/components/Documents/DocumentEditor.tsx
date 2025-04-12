import { Form, Input, DatePicker, Button, Space, Card, Tabs, Row, Col, Select, Typography, Divider, Checkbox } from 'antd';
import { Document, DocumentType } from '@/types/document';
import { useEffect, useState } from 'react';
import { fetchDocumentTypeById } from '@/services/documentTypes';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Text } = Typography;

interface DocumentEditorProps {
    document: Document;
    documentTypeId: string;
    onSave: (values: Partial<Document>) => void;
}

const fieldComponents = {
    string: (field: any) => <Input placeholder={field.description || ''} />,
    number: (field: any) => <Input type="number" placeholder={field.description || ''} />,
    datetime: (field: any) => <DatePicker showTime style={{ width: '100%' }} />,
    bool: (field: any) => <Checkbox />,
};

export default function DocumentEditor({ document, documentTypeId, onSave }: DocumentEditorProps) {
    const [form] = Form.useForm();
    const [documentType, setDocumentType] = useState<DocumentType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDocumentType = async () => {
            try {
                const type = await fetchDocumentTypeById(documentTypeId);
                setDocumentType(type);
            } catch (error) {
                console.error('Failed to load document type:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDocumentType();
    }, [documentTypeId]);

    const onFinish = (values: any) => {
        const processedValues = {
            ...values,
            fields: Object.fromEntries(
                Object.entries(values.fields || {}).map(([key, value]) => {
                    const fieldConfig = documentType?.fields.find(f => f.name === key);
                    if (fieldConfig?.fieldType === 'bool') {
                        return [key, value === undefined ? undefined : !!value];
                    }
                    return [key, value];
                })
            )
        };
        onSave(processedValues);
    };

    const renderField = (fieldName: string) => {
        if (!documentType) return null;

        const fieldConfig = documentType.fields.find(f => f.name === fieldName);
        if (!fieldConfig) return null;

        const fieldType = fieldConfig.fieldType.toLowerCase();

        if (fieldType === 'bool') {
            return (
                <Form.Item
                    key={fieldName}
                    name={['fields', fieldName]}
                    label={" "}
                    valuePropName="checked"
                    initialValue={document.fields?.[fieldName] ?? undefined}
                    getValueFromEvent={(e) => e.target.checked}
                >
                    <Checkbox>
                        {fieldName}
                    </Checkbox>
                </Form.Item>
            );
        }

        const Component = fieldComponents[fieldType] || fieldComponents.string;
        return (
            <Form.Item
                key={fieldName}
                name={['fields', fieldName]}
                label={fieldName}
                rules={[{ required: fieldConfig.isRequired, message: `Поле "${fieldName}" обязательно` }]}
            >
                {Component(fieldConfig)}
            </Form.Item>
        );
    };

    const renderTabContent = (tab: any) => {
        return (
            <div key={tab.name}>
                {tab.rows.map((row: any, rowIndex: number) => (
                    <Row gutter={16} key={rowIndex}>
                        {row.fields
                            .sort((a: any, b: any) => a.order - b.order)
                            .map((field: any) => (
                                <Col
                                    span={24 / row.fields.length}
                                    key={field.name}
                                >
                                    {renderField(field.name)}
                                </Col>
                            ))}
                    </Row>
                ))}
            </div>
        );
    };

    if (loading) {
        return <div>Загрузка типа документа...</div>;
    }

    if (!documentType) {
        return <div>Не удалось загрузить тип документа</div>;
    }

    return (
        <Form
            form={form}
            initialValues={{
                ...document,
                fields: {
                    ...Object.fromEntries(
                        documentType.fields
                            .filter(f => f.fieldType === 'bool')
                            .map(f => [
                                f.name,
                                document.fields?.[f.name] ?? undefined
                            ])
                    ),
                    ...(document.fields || {})
                },
            }}
            layout="vertical"
            onFinish={onFinish}
        >
            <Card title={`Редактирование документа: ${documentType.name}`}>
                <Tabs defaultActiveKey="0">
                    {documentType.layout.tabs.map((tab, index) => (
                        <TabPane tab={tab.name} key={index.toString()}>
                            {renderTabContent(tab)}
                        </TabPane>
                    ))}
                </Tabs>

                <Divider />

                <Form.Item
                    label="Комментарий"
                    name="comment"
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Space>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                    <Button type="default">
                        Отмена
                    </Button>
                </Space>
            </Card>
        </Form>
    );
}