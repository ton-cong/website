import { useEffect, useState } from 'react';
import reviewApi from '../../api/reviewApi';
import { toast } from 'react-toastify';
import { TrashIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import Pagination from '../../components/Pagination';

const AdminReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('desc');

    useEffect(() => {
        fetchReviews();
    }, [currentPage, pageSize, sortBy, sortDir]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await reviewApi.getAll({
                page: currentPage,
                size: pageSize,
                sortBy,
                sortDir,
            });
            const data = response?.result || response;
            setReviews(data?.content || []);
            setTotalPages(data?.totalPages || 0);
            setTotalElements(data?.totalElements || 0);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải đánh giá");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa đánh giá này?")) return;
        try {
            await reviewApi.delete(id);
            toast.success("Đã xóa đánh giá");
            fetchReviews();
        } catch (error) {
            toast.error("Không thể xóa đánh giá");
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            i < rating
                ? <StarSolid key={i} className="h-4 w-4 text-yellow-400" />
                : <StarIcon key={i} className="h-4 w-4 text-slate-300" />
        ));
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDir('asc');
        }
        setCurrentPage(0);
    };

    const getSortIcon = (field) => {
        if (sortBy !== field) return '↕';
        return sortDir === 'asc' ? '↑' : '↓';
    };

    if (loading && reviews.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Quản lý đánh giá</h1>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600" onClick={() => handleSort('id')}>
                                    ID {getSortIcon('id')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sản phẩm</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Người đánh giá</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600" onClick={() => handleSort('rating')}>
                                    Đánh giá {getSortIcon('rating')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nội dung</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {reviews.map((review) => (
                                <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-slate-900">{review.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{review.productName || `SP #${review.productId}`}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{review.userName || 'N/A'}</p>
                                            <p className="text-xs text-slate-500">{review.userEmail || ''}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-0.5">
                                            {renderStars(review.rating)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500 max-w-[250px] truncate">{review.comment}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reviews.length === 0 && !loading && (
                    <div className="text-center py-12 text-slate-500">Không có đánh giá nào</div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(0); }}
                />
            </div>
        </div>
    );
};

export default AdminReviewList;
