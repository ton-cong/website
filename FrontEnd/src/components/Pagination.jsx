import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Pagination = ({
    currentPage = 0,
    totalPages = 0,
    totalElements = 0,
    pageSize = 10,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [5, 10, 20, 50],
}) => {
    if (totalPages <= 0) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 0; i < totalPages; i++) pages.push(i);
        } else {
            pages.push(0);
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(totalPages - 2, currentPage + 1);

            if (currentPage <= 2) {
                start = 1;
                end = Math.min(maxVisible - 1, totalPages - 2);
            } else if (currentPage >= totalPages - 3) {
                start = Math.max(1, totalPages - maxVisible);
                end = totalPages - 2;
            }

            if (start > 1) pages.push('...');
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < totalPages - 2) pages.push('...');
            pages.push(totalPages - 1);
        }
        return pages;
    };

    const startItem = currentPage * pageSize + 1;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
            {/* Info + Page Size */}
            <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>
                    Hiển thị <span className="font-semibold text-slate-700">{startItem}-{endItem}</span> / <span className="font-semibold text-slate-700">{totalElements}</span>
                </span>
                {onPageSizeChange && (
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                    >
                        {pageSizeOptions.map(opt => (
                            <option key={opt} value={opt}>{opt} / trang</option>
                        ))}
                    </select>
                )}
            </div>

            {/* Page Buttons */}
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-500 disabled:hover:border-slate-200 transition-all duration-200"
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                </button>

                {getPageNumbers().map((page, idx) =>
                    page === '...' ? (
                        <span key={`dots-${idx}`} className="px-2 py-1 text-slate-400">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === page
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                    : 'border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
                                }`}
                        >
                            {page + 1}
                        </button>
                    )
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-500 disabled:hover:border-slate-200 transition-all duration-200"
                >
                    <ChevronRightIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
