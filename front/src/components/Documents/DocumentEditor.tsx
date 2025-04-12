import { Form, Input, DatePicker, Button, Space, Card } from 'antd'
import { Document } from '@/types/document'

const { TextArea } = Input

interface DocumentEditorProps {
    document: Document
    onSave: (values: Partial<Document>) => void
}

export default function DocumentEditor({ document, onSave }: DocumentEditorProps) {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        onSave(values)
    }

    return (
        <Form
            form={form}
            initialValues={document}
            layout="vertical"
            onFinish={onFinish}
        >
            <Card title="Редактирование документа">
                <Form.Item
                    label="Название документа"
                    name="title"
                    rules={[{ required: true, message: 'Введите название документа' }]}
                >
                    <Input placeholder="Введите название документа" />
                </Form.Item>

                <Form.Item
                    label="Содержание"
                    name="content"
                    rules={[{ required: true, message: 'Введите содержание документа' }]}
                >
                    <TextArea rows={8} placeholder="Введите содержание документа" />
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
    )
}