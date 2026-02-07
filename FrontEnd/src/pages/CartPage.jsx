import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, cartLoading } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (cartLoading) return <div className="text-center py-20">Đang tải giỏ hàng...</div>;

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
        return (
            <div className="text-center py-20 space-y-4">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrashIcon className="h-10 w-10 text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Giỏ hàng trống</h2>
                <p className="text-slate-500">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                <Link to="/">
                    <Button variant="primary" className="mt-8">
                        Tiếp tục mua sắm
                    </Button>
                </Link>
            </div>
        );
    }

    const subtotal = cart.totalPrice || cart.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (!isAuthenticated) {
            toast.warning("Vui lòng đăng nhập để thanh toán");
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                Giỏ hàng của bạn
                <span className="ml-3 text-lg font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {cart.cartItems.length} sản phẩm
                </span>
            </h1>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {cart.cartItems.map((item) => (
                        <div key={item.id} className="p-6 flex items-center md:items-start space-x-6 hover:bg-slate-50 transition-colors">
                            {/* Product Image */}
                            <div className="w-24 h-24 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden">
                                {item.productImage || item.imageUrl ? (
                                    <img src={item.productImage || item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        <Link to={`/products/${item.productId}`} className="hover:text-indigo-600 transition-colors">
                                            {item.productName}
                                        </Link>
                                    </h3>
                                    <p className="text-lg font-bold text-slate-900">{(item.price * item.quantity).toLocaleString()}đ</p>
                                </div>
                                <p className="text-slate-500 text-sm mt-1">
                                    {item.price?.toLocaleString()}đ x {item.quantity}
                                </p>
                                <div className="mt-4 flex items-center space-x-4">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 text-sm font-medium hover:text-red-600 flex items-center transition-colors"
                                    >
                                        <TrashIcon className="h-4 w-4 mr-1" /> Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-50 p-8 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-slate-600">Tổng cộng</span>
                        <span className="text-2xl font-bold text-indigo-600">{subtotal.toLocaleString()}đ</span>
                    </div>
                    <div className="flex space-x-4">
                        <Button
                            variant="secondary"
                            className="w-full py-4 text-center justify-center"
                            onClick={clearCart}
                        >
                            Xóa giỏ hàng
                        </Button>
                        <Button
                            className="w-full py-4 text-center justify-center shadow-indigo-600/25 shadow-xl"
                            onClick={handleCheckout}
                        >
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <Link to="/" className="inline-flex items-center text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" /> Tiếp tục mua sắm
                </Link>
            </div>
        </div>
    );
};

export default CartPage;
