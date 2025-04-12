import { Layout, Menu, Typography } from 'antd'
import {
    FileOutlined,
    InboxOutlined,
    SendOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    FolderOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'

const { Sider } = Layout
const { Title } = Typography

export default function SideNav() {
    const router = useRouter()

    const menuItems = [
        {
            key: 'inbox',
            icon: <InboxOutlined />,
            label: 'Входящие',
        },
        {
            key: 'outbox',
            icon: <SendOutlined />,
            label: 'Исходящие',
        },
        {
            key: 'drafts',
            icon: <FileOutlined />,
            label: 'Черновики',
        },
        {
            key: 'pending',
            icon: <ClockCircleOutlined />,
            label: 'На согласовании',
        },
        {
            key: 'completed',
            icon: <CheckCircleOutlined />,
            label: 'Завершенные',
        },
        {
            key: 'templates',
            icon: <FolderOutlined />,
            label: 'Шаблоны',
        },
    ]

    return (
        <Sider width={250} theme="light" breakpoint="lg" collapsedWidth="0">
            <div style={{ padding: '16px 24px' }}>
                <Title level={4} style={{ margin: 0 }}>
                    Документооборот ВУЗа
                </Title>
            </div>
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[router.pathname.split('/')[2] || 'inbox']}
                items={menuItems}
                onSelect={({ key }) => router.push(`/documents/${key}`)}
            />
        </Sider>
    )
}