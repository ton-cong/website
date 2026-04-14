import React, { useEffect, useState } from 'react';
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
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyComment, setReplyComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);

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
        if (!window.confirm("Bạn có chắc muốn xóa đánh giá/phản hồi này?")) return;
        try {
            await reviewApi.delete(id);
            toast.success("Đã xóa thành công");
            fetchReviews();
        } catch (error) {
            toast.error("Không thể xóa");
        }
    };

    const handleSubmitReply = async (e, parentId, productId) => {
        e.preventDefault();
        setReviewLoading(true);
        try {
            await reviewApi.add({
                productId: productId,
                rating: 5,
                comment: replyComment,
                parentId: parentId
            });
            toast.success("Đã gửi phản hồi");
            setReplyComment('');
            setReplyingTo(null);
            fetchReviews();
        } catch (error) {
            toast.error("Không thể gửi phản hồi");
        } finally {
            setReviewLoading(false);
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
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nội dung đánh giá</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Phản hồi từ admin</th>
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
                                        <div className="flex items-center gap-0.5 whitespace-nowrap">
                                            {renderStars(review.rating)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px] break-words">{review.comment}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600 max-w-[250px] align-top">
                                        {/* Display Replies */}
                                        {review.replies && review.replies.length > 0 ? (
                                            <div className="space-y-2">
                                                {review.replies.map(reply => (
                                                    <div key={reply.id} className="bg-indigo-50/80 p-2.5 flex items-start justify-between rounded-lg relative group border border-indigo-100">
                                                        <p className="text-sm text-indigo-900 break-words pr-2">{reply.comment}</p>
                                                        <button
                                                            onClick={() => handleDelete(reply.id)}
                                                            className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-white rounded-md shadow-sm"
                                                            title="Xóa phản hồi"
                                                        >
                                                            <TrashIcon className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            replyingTo !== review.id && <span className="text-slate-400 italic text-xs block py-1">Chưa có phản hồi</span>
                                        )}

                                        {/* Reply Form */}
                                        {replyingTo === review.id && (
                                            <form onSubmit={(e) => handleSubmitReply(e, review.id, review.productId)} className="mt-2 flex flex-col gap-2">
                                                <textarea
                                                    value={replyComment}
                                                    onChange={(e) => setReplyComment(e.target.value)}
                                                    placeholder="Nhập phản hồi..."
                                                    className="w-full px-3 py-2 text-sm border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                                    rows="2"
                                                    required
                                                />
                                                <div className="flex justify-start gap-2">
                                                    <button
                                                        type="submit"
                                                        disabled={reviewLoading || !replyComment.trim()}
                                                        className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                                                    >
                                                        {reviewLoading ? 'Đang gửi...' : 'Gửi'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setReplyingTo(null); setReplyComment(''); }}
                                                        className="px-3 py-1 text-xs text-slate-600 border border-slate-300 hover:bg-slate-100 rounded-md transition-colors"
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-right align-top">
                                        <div className="flex justify-end gap-2 items-start">
                                            {(!review.replies || review.replies.length === 0) && replyingTo !== review.id && (
                                                <button
                                                    onClick={() => setReplyingTo(review.id)}
                                                    className="p-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg transition-colors"
                                                    title="Thêm phản hồi"
                                                >
                                                    <span className="text-xs font-medium px-1">Phản hồi</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(review.id)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Xóa đánh giá"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
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
