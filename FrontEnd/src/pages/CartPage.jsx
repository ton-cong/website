import { useCart } from '../context/CartContext';
import { TrashIcon, ArrowLeftIcon, ShoppingCartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CartPage = () => {
    const { cart, removeFromCart, updateCartItemQuantity, clearCart, cartLoading } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (cartLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center">
                <div className="bg-blue-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCartIcon className="h-14 w-14 text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Giỏ hàng trống</h2>
                <p className="text-slate-500 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                <Link to="/"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-200">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    const subtotal = cart.totalPrice || cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 5_000_000 ? 0 : 30_000;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        if (!isAuthenticated) {
            toast.warning('Vui lòng đăng nhập để thanh toán');
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };

    return (
        <div className="max-w-6xl mx-auto py-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <ShoppingCartIcon className="h-7 w-7 text-blue-600" />
                Giỏ hàng của bạn
                <span className="text-base font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {cart.items.length} sản phẩm
                </span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart items */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {cart.items.map((item) => (
                                <div key={item.id} className="p-5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors group">
                                    <div className="w-20 h-20 bg-slate-100 rounded-xl flex-shrink-0 overflow-hidden">
                                        {item.productImage || item.imageUrl ? (
                                            <img src={item.productImage || item.imageUrl} alt={item.productName}
                                                className="w-full h-full object-contain p-1" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">No img</div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <Link to={`/products/${item.productId}`}
                                            className="font-semibold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 text-sm">
                                            {item.productName}
                                        </Link>
                                        <p className="text-blue-600 font-bold text-base mt-0.5">{item.price?.toLocaleString('vi-VN')}đ</p>
                                        
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden w-24">
                                                <button 
                                                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors disabled:opacity-50"
                                                >
                                                    <MinusIcon className="h-3 w-3" />
                                                </button>
                                                <input 
                                                    type="text" 
                                                    value={item.quantity} 
                                                    readOnly
                                                    className="w-8 h-8 text-center text-sm font-medium text-slate-900 focus:outline-none"
                                                />
                                                <button 
                                                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <PlusIcon className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right flex-shrink-0">
                                        <p className="font-bold text-slate-900">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                                        <button onClick={() => removeFromCart(item.id)}
                                            className="mt-2 text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors ml-auto">
                                            <TrashIcon className="h-3.5 w-3.5" /> Xóa
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">
                                <ArrowLeftIcon className="h-4 w-4" /> Tiếp tục mua sắm
                            </Link>
                            <button onClick={clearCart}
                                className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                <TrashIcon className="h-4 w-4" /> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>

                {/* Order summary */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-20">
                        <h3 className="font-bold text-slate-900 mb-5 text-base">Tóm tắt đơn hàng</h3>
                        <div className="space-y-3 text-sm text-slate-600">
                            <div className="flex justify-between">
                                <span>Tạm tính ({cart.items.length} SP)</span>
                                <span className="font-medium text-slate-900">{subtotal.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phí vận chuyển</span>
                                <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium text-slate-900'}>
                                    {shipping === 0 ? 'Miễn phí' : shipping.toLocaleString('vi-VN') + 'đ'}
                                </span>
                            </div>
                            {shipping === 0 && (
                                <p className="text-xs text-green-600 bg-green-50 rounded-lg px-3 py-2">
                                    🎉 Bạn được miễn phí vận chuyển!
                                </p>
                            )}
                            {shipping > 0 && (
                                <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
                                    Mua thêm {(5_000_000 - subtotal).toLocaleString('vi-VN')}đ để được miễn phí vận chuyển
                                </p>
                            )}
                        </div>
                        <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between items-center">
                            <span className="font-bold text-slate-900">Tổng cộng</span>
                            <span className="text-xl font-bold text-blue-600">{total.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <button onClick={handleCheckout}
                            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200 text-sm">
                            Tiến hành thanh toán →
                        </button>
                        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-400">
                            <span>🔒 Thanh toán an toàn</span>
                            <span>•</span>
                            <span>🚚 Giao hàng nhanh</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
