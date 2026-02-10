import { useEffect, useState } from 'react';
import reviewApi from '../../api/reviewApi';
import { toast } from 'react-toastify';
import { TrashIcon, StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'; // Rename to avoid conflict
import Button from '../../components/Button';

const AdminReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await reviewApi.getAll();
            setReviews(response?.result || response || []);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh sách đánh giá");
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
        return (
            <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => (
                    <StarIcon key={index} className={`h-4 w-4 ${index < rating ? 'fill-current' : 'text-gray-300'}`} />
                ))}
            </div>
        );
    };

    const filteredReviews = reviews.filter(review =>
        review.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Quản lý đánh giá</h1>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo sản phẩm, email hoặc nội dung..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Sản phẩm</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Đánh giá</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Nội dung</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredReviews.map((review) => (
                                <tr key={review.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                        {review.productName || 'Unknown Product'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {review.userEmail || review.userName || 'Unknown User'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {renderStars(review.rating)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <div className="max-w-xs truncate" title={review.comment}>{review.comment}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Xóa đánh giá"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredReviews.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        {searchTerm ? 'Không tìm thấy đánh giá phù hợp' : 'Chưa có đánh giá nào'}
                    </div>
                )}
            </div>
            <div className="mt-4 text-sm text-slate-500">
                Hiển thị {filteredReviews.length} / {reviews.length} đánh giá
            </div>
        </div>
    );
};

export default AdminReviewList;
