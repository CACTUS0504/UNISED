import { Card, Typography, Button } from 'antd'
import { useRouter } from 'next/router'
import { HomeOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export default function Home() {
    const router = useRouter()

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                <HomeOutlined /> Система электронного документооборота ВУЗа
            </Title>

            <Card>
                <Paragraph>
                    Добро пожаловать в систему электронного документооборота. Здесь вы можете работать с
                    входящими и исходящими документами, создавать новые документы и отслеживать процессы
                    согласования.
                </Paragraph>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => router.push('/documents/inbox')}
                    >
                        Перейти к документам
                    </Button>
                </div>
            </Card>
        </div>
    )
}