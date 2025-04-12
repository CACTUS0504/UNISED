import { Skeleton } from 'antd'

export default function LoadingSkeleton() {
    return (
        <div style={{ padding: 24 }}>
            <Skeleton active paragraph={{ rows: 8 }} />
        </div>
    )
}