export interface Pagination {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
}

export interface ApiResponse<T> {
    data: T
    pagination: Pagination
    success: boolean
    message?: string
}