import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productApi from '../api/productApi';
import reviewApi from '../api/reviewApi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { StarIcon, ShoppingBagIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(false);
    const { addToCart } = useCart();
    const { isAuthenticated, user } = useAuth();

    // Review form state
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const data = await productApi.getById(id);
            setProduct(data?.result || data);
        } catch (error) {
            console.error("Failed to fetch product", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const data = await reviewApi.getByProduct(id);
            setReviews(data?.result || data || []);
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        }
    };

    const handleAddToCart = () => {
        addToCart(product.id, 1);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.warning("Vui lòng đăng nhập để đánh giá");
            return;
        }
        setReviewLoading(true);
        try {
            await reviewApi.create({
                productId: parseInt(id),
                rating,
                comment,
            });
            toast.success("Đánh giá thành công!");
            setComment('');
            setRating(5);
            setShowReviewForm(false);
            fetchReviews();
        } catch (error) {
            toast.error("Không thể gửi đánh giá");
        } finally {
            setReviewLoading(false);
        }
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    if (loading) return <div className="text-center py-20">Đang tải...</div>;
    if (!product) return <div className="text-center py-20">Không tìm thấy sản phẩm.</div>;

    return (
        <div className="space-y-12">
            {/* Product Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in-up">
                {/* Image Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex items-center justify-center min-h-[400px]">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="max-h-[500px] w-full object-contain hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="text-slate-300 text-6xl font-thin">No Image</div>
                    )}
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                                {product.category || 'Sản phẩm'}
                            </span>
                            {product.status !== 'OUT_OF_STOCK' ? (
                                <span className="text-green-600 flex items-center text-sm font-medium">
                                    <CheckCircleIcon className="w-4 h-4 mr-1" /> Còn hàng
                                </span>
                            ) : (
                                <span className="text-red-500 text-sm font-medium">Hết hàng</span>
                            )}
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900">{product.name}</h1>

                        <div className="flex items-center mt-4 space-x-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-slate-200'}`} />
                                ))}
                            </div>
                            <span className="text-slate-500 text-sm">{averageRating} ({reviews.length} đánh giá)</span>
                        </div>
                    </div>

                    <div className="text-4xl font-bold text-slate-900">
                        {product.price?.toLocaleString()}đ
                    </div>

                    <p className="text-slate-600 leading-relaxed border-t border-b border-slate-100 py-6">
                        {product.description}
                    </p>

                    <div className="flex space-x-4">
                        <Button
                            size="lg"
                            onClick={handleAddToCart}
                            disabled={product.status === 'OUT_OF_STOCK'}
                            className="flex-1 py-4 text-lg flex items-center justify-center space-x-2"
                        >
                            <ShoppingBagIcon className="h-6 w-6" />
                            <span>Thêm vào giỏ</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Đánh giá sản phẩm</h2>
                    {isAuthenticated && (
                        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                            {showReviewForm ? 'Hủy' : 'Viết đánh giá'}
                        </Button>
                    )}
                </div>

                {/* Review Form */}
                {showReviewForm && (
                    <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-slate-50 rounded-xl">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Đánh giá</label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none"
                                    >
                                        {star <= rating ? (
                                            <StarIcon className="h-8 w-8 text-yellow-400" />
                                        ) : (
                                            <StarOutline className="h-8 w-8 text-slate-300" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nhận xét</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                rows="3"
                                required
                            />
                        </div>
                        <Button type="submit" disabled={reviewLoading}>
                            {reviewLoading ? 'Đang gửi...' : 'Gửi đánh giá'}
                        </Button>
                    </form>
                )}

                {/* Review List */}
                {reviews.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">Chưa có đánh giá nào cho sản phẩm này.</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="border-b border-slate-100 pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                            {review.userName?.charAt(0) || review.userEmail?.charAt(0) || 'U'}
                                        </div>
                                        <span className="font-medium text-slate-900">{review.userName || review.userEmail || 'Người dùng'}</span>
                                    </div>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-slate-200'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-600">{review.comment}</p>
                                <p className="text-xs text-slate-400 mt-1">
                                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN') : ''}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;
