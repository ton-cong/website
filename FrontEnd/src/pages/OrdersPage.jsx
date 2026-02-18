import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import orderApi from '../api/orderApi';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const OrdersPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            const response = await orderApi.getMyOrders();
            setOrders(response?.result || response || []);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'processing': 'bg-blue-100 text-blue-800',
            'shipping': 'bg-purple-100 text-purple-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800',

            'PENDING': 'bg-yellow-100 text-yellow-800',
            'PROCESSING': 'bg-blue-100 text-blue-800',
            'SHIPPING': 'bg-purple-100 text-purple-800',
            'COMPLETED': 'bg-green-100 text-green-800',
            'CANCELLED': 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const texts = {
            'pending': 'Chờ xác nhận',
            'processing': 'Đang xử lý',
            'shipping': 'Đang giao',
            'completed': 'Đã giao',
            'cancelled': 'Đã hủy',

            'PENDING': 'Chờ xác nhận',
            'PROCESSING': 'Đang xử lý',
            'SHIPPING': 'Đang giao',
            'COMPLETED': 'Đã giao',
            'CANCELLED': 'Đã hủy',
        };
        return texts[status] || status;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Đơn hàng của tôi</h1>

            {orders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-100">
                    <ShoppingBagIcon className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg mb-6">Bạn chưa có đơn hàng nào.</p>
                    <Link
                        to="/"
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Mua sắm ngay
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-slate-500">Mã đơn hàng</p>
                                    <p className="font-bold text-slate-900 text-lg">#{order.id}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {getStatusText(order.status)}
                                </span>
                            </div>


                            <div className="mb-4 p-3 bg-slate-50 rounded-lg text-sm">
                                <p className="text-slate-600">
                                    <span className="font-medium">Người nhận:</span> {order.fullName}
                                </p>
                                <p className="text-slate-600">
                                    <span className="font-medium">SĐT:</span> {order.phone}
                                </p>
                                <p className="text-slate-600">
                                    <span className="font-medium">Địa chỉ:</span> {order.address}
                                </p>
                                {order.note && (
                                    <p className="text-slate-600">
                                        <span className="font-medium">Ghi chú:</span> {order.note}
                                    </p>
                                )}
                            </div>


                            <div className="border-t border-slate-100 pt-4 space-y-3">
                                {(order.items || order.orderItems || []).map((item, index) => (
                                    <div key={item.id || index} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.productImage || item.imageUrl || 'https://via.placeholder.com/40'}
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
                                        <p className="font-medium">{(item.price * item.quantity).toLocaleString()}đ</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : ''}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-500">Tổng cộng</p>

                                    <p className="text-xl font-bold text-indigo-600">
                                        {(order.totalPrice || order.totalAmount || 0).toLocaleString()}đ
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
