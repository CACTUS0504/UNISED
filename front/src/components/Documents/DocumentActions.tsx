import { Space, Button } from 'antd';

interface DocumentActionsProps {
    onSave: () => void;
    onCancel: () => void;
    saveText?: string;
    cancelText?: string;
}

export default function DocumentActions({
                                            onSave,
                                            onCancel,
                                            saveText = 'Сохранить',
                                            cancelText = 'Отмена'
                                        }: DocumentActionsProps) {
    return (
        <Space style={{ float: 'right', marginTop: '-20px' }}>
            <Button onClick={onCancel}>
                {cancelText}
            </Button>
            <Button type="primary" onClick={onSave}>
                {saveText}
            </Button>
        </Space>
    );
}