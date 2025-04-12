import type { AppProps } from 'next/app'
import { Layout, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import SideNav from '@/components/Layout/SideNav'
import Header from '@/components/Layout/Header'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StyleProvider hashPriority="high">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1890ff',
                        borderRadius: 4,
                    },
                }}
            >
                <Layout style={{ minHeight: '100vh' }}>
                    <SideNav />
                    <Layout>
                        <Header />
                        <Layout.Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                            <Component {...pageProps} />
                        </Layout.Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </StyleProvider>
    )
}