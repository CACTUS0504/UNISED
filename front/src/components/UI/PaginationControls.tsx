import { Pagination } from 'antd'
import { Pagination as PaginationType } from '@/types/api'

interface PaginationControlsProps {
    pagination: PaginationType
    onPageChange: (page: number) => void
}

export default function PaginationControls({ pagination, onPageChange }: PaginationControlsProps) {
    return (
        <Pagination
            current={pagination.currentPage}
            total={pagination.totalItems}
            pageSize={pagination.itemsPerPage}
            onChange={onPageChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Всего ${total} записей`}
            style={{ marginTop: 16, textAlign: 'right' }}
        />
    )
}