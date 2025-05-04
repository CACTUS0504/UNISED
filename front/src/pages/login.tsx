import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Typography, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@/styles/Login.module.css';

const { Title } = Typography;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                    Вход в систему документооборота
                </Title>

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={() => console.log('aboba')}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Введите имя пользователя' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Имя пользователя"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Пароль"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}