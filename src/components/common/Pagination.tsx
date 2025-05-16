// src/components/common/Pagination.tsx
import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const getPageNumbers = (currentPage: number, totalPages: number, siblingCount = 1): (number | string)[] => {
    const pages: (number | string)[] = []
    const firstPage = 1
    const lastPage = totalPages
    const left = Math.max(currentPage - siblingCount, firstPage)
    const right = Math.min(currentPage + siblingCount, lastPage)

    if (left > firstPage) {
        pages.push(firstPage)
        if (left > firstPage + 1) pages.push('...')
    }

    for (let page = left; page <= right; page++) {
        pages.push(page)
    }

    if (right < lastPage) {
        if (right < lastPage - 1) pages.push('...')
        pages.push(lastPage)
    }

    return pages
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = getPageNumbers(currentPage, totalPages)

    return (
        <nav className="flex items-center justify-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-1 bg-purple-800 hover:bg-purple-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FaChevronLeft className="text-xs mr-1" />
                Anterior
            </button>

            {pages.map((page, idx) => (
                <button
                    key={idx}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={page === '...'}
                    className={`px-3 py-1 rounded text-sm
            ${page === currentPage
                            ? 'bg-white text-purple-800 font-medium border border-purple-800'
                            : page === '...'
                                ? 'text-purple-300 cursor-default'
                                : 'bg-purple-800 text-white hover:bg-purple-600'}
          `}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-1 bg-purple-800 hover:bg-purple-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Próximo
                <FaChevronRight className="text-xs ml-1" />
            </button>
        </nav>
    )
}

export default Pagination
