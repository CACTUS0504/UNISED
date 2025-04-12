import { Layout, Dropdown, Avatar, Badge, Space, Typography } from 'antd'
import { BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header: AntHeader } = Layout
const { Text } = Typography

const items = [
    {
        key: 'profile',
        label: 'Профиль',
        icon: <UserOutlined />,
    },
    {
        key: 'logout',
        label: 'Выйти',
        icon: <LogoutOutlined />,
    },
]

export default function Header() {
    return (
        <AntHeader style={{ background: '#fff', padding: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 24px' }}>
                <Space size="large">
                    <Badge count={5}>
                        <BellOutlined style={{ fontSize: 16 }} />
                    </Badge>
                    <Dropdown menu={{ items }} placement="bottomRight">
                        <Space>
                            <Avatar icon={<UserOutlined />} />
                            <Text strong>Иванов И.И.</Text>
                            <Text type="secondary">Администратор</Text>
                        </Space>
                    </Dropdown>
                </Space>
            </div>
        </AntHeader>
    )
}