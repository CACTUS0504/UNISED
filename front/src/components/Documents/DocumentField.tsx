import { Form, Input, DatePicker, Select, Checkbox, Typography, InputNumber } from 'antd';
import { FieldType } from '@/types/document';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Text } = Typography;

interface DocumentFieldProps {
    field: {
        name: string;
        fieldType: FieldType;
        isRequired: boolean;
        description?: string;
        options?: string[];
    };
    name: string[];
}

export default function DocumentField({ field, name }: DocumentFieldProps) {
    const transformValue = (value: any, fieldType: FieldType) => {
        switch (fieldType) {
            case 'number':
                return value !== undefined && value !== null ? Number(value) : null;
            case 'bool':
                return value || false;
            default:
                return value;
        }
    };

    const normalizeValue = (e: any, fieldType: FieldType) => {
        if (fieldType === 'bool') return e.target.checked;
        if (fieldType === 'select') return e;
        return e.target?.value ?? e;
    };

    const renderField = () => {
        switch (field.fieldType) {
            case 'string':
                return <Input placeholder={field.description} />;
            case 'number':
                return <InputNumber style={{ width: '100%' }} />;
            case 'datetime':
                return (
                    <DatePicker
                        showTime
                        style={{ width: '100%' }}
                        format="DD.MM.YYYY HH:mm"
                    />
                );
            case 'bool':
                return <Checkbox>{field.description}</Checkbox>;
            case 'select':
                return (
                    <Select
                        placeholder={field.description}
                        options={field.options?.map(opt => ({ value: opt, label: opt }))}
                    />
                );
            default:
                return <Input placeholder={field.description} />;
        }
    };

    return (
        <Form.Item
            name={name}
            label={<Text strong>{field.name}</Text>}
            tooltip={field.description}
            valuePropName={field.fieldType === 'bool' ? 'checked' : 'value'}
            normalize={(value) => transformValue(value, field.fieldType)}
            getValueFromEvent={(e) => normalizeValue(e, field.fieldType)}
            rules={[
                {
                    required: field.isRequired,
                    message: `Поле "${field.name}" обязательно для заполнения`,
                    validator: (_, value) => {
                        if (field.isRequired && (value === undefined || value === null)) {
                            return Promise.reject();
                        }
                        return Promise.resolve();
                    }
                }
            ]}
        >
            {renderField()}
        </Form.Item>
    );
}