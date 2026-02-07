import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import orderApi from '../api/orderApi';
import Button from '../components/Button';
import Input from '../components/Input';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
    const { cart, clearCart, refreshCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        address: user?.address || '',
        note: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateTotal = () => {
        if (!cart?.items) return 0;
        return cart.totalPrice || cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error("Vui lòng đăng nhập để đặt hàng");
            navigate('/login');
            return;
        }

        // Validate form
        if (!formData.fullName || !formData.phone || !formData.address) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        setLoading(true);
        try {
            // Backend OrderRequest expects: { fullName, phone, address, note }
            const orderData = {
                fullName: formData.fullName,
                phone: formData.phone,
                address: formData.address,
                note: formData.note || '',
            };

            await orderApi.create(orderData);
            toast.success("Đặt hàng thành công!");

            // Refresh cart to clear it (backend already clears cart after order)
            if (refreshCart) {
                await refreshCart();
            }

            navigate('/orders');
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error(error.response?.data?.message || "Đặt hàng thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    if (!cart?.items?.length) {
        return (
            <div className="max-w-2xl mx-auto py-16 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Giỏ hàng trống</h2>
                <p className="text-slate-500 mb-6">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
                <Button onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Thanh toán</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Form */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <h2 className="text-xl font-semibold text-slate-900 mb-6">Thông tin giao hàng</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Họ và tên"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Nhập họ và tên người nhận"
                            required
                        />
                        <Input
                            label="Số điện thoại"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                            required
                        />
                        <Input
                            label="Địa chỉ giao hàng"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú</label>
                            <textarea
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                rows="3"
                                placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
                            />
                        </div>
                        <Button type="submit" className="w-full py-3" disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                        </Button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 h-fit">
                    <h2 className="text-xl font-semibold text-slate-900 mb-6">Đơn hàng của bạn</h2>
                    <div className="space-y-4">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.productImage || item.imageUrl || 'https://via.placeholder.com/50'}
                                        alt={item.productName}
                                        className="w-12 h-12 object-cover rounded-lg"
                                    />
                                    <div>
                                        <p className="font-medium text-slate-900">{item.productName}</p>
                                        <p className="text-sm text-slate-500">
                                            {item.price?.toLocaleString()}đ x {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold text-slate-900">
                                    {(item.price * item.quantity).toLocaleString()}đ
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
                        <div className="flex justify-between text-slate-600">
                            <span>Tạm tính:</span>
                            <span>{calculateTotal().toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Phí vận chuyển:</span>
                            <span className="text-green-600">Miễn phí</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-slate-100">
                            <span>Tổng cộng:</span>
                            <span className="text-indigo-600">{calculateTotal().toLocaleString()}đ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
