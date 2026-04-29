import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import orderApi from '../api/orderApi';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShoppingBagIcon, ClockIcon, CheckCircleIcon, TruckIcon, XCircleIcon, CogIcon, XMarkIcon } from '@heroicons/react/24/outline';

const STATUS_CONFIG = {
    pending:    { label: 'Chờ xác nhận', cls: 'bg-amber-50 text-amber-700 border border-amber-200',   icon: ClockIcon,       dot: 'bg-amber-400' },
    processing: { label: 'Đang xử lý',   cls: 'bg-blue-50 text-blue-700 border border-blue-200',      icon: CogIcon,         dot: 'bg-blue-400' },
    shipping:   { label: 'Đang giao',    cls: 'bg-purple-50 text-purple-700 border border-purple-200', icon: TruckIcon,       dot: 'bg-purple-400' },
    completed:  { label: 'Đã giao',      cls: 'bg-green-50 text-green-700 border border-green-200',    icon: CheckCircleIcon, dot: 'bg-green-400' },
    cancelled:  { label: 'Đã hủy',       cls: 'bg-blue-50 text-blue-600 border border-blue-200',          icon: XCircleIcon,     dot: 'bg-blue-400' },
};

const normalize = (s) => s?.toLowerCase();

const OrdersPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) { navigate('/login'); return; }
        fetchOrders();
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            const res = await orderApi.getMyOrders();
            setOrders(res?.result || res || []);
        } catch { toast.error('Không thể tải đơn hàng'); }
        finally { setLoading(false); }
    };

    const handleViewDetails = async (order) => {
        try {
            setLoadingDetails(true);
            const res = await orderApi.getOrderById(order.id);
            setSelectedOrder(res?.result || res || order);
        } catch (error) {
            console.error(error);
            toast.error('Không thể tải chi tiết đơn hàng');
            setSelectedOrder(order); // fallback to basic info
        } finally {
            setLoadingDetails(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    const tabs = ['all', 'pending', 'processing', 'shipping', 'completed', 'cancelled'];
    const tabLabel = { all: 'Tất cả', pending: 'Chờ xác nhận', processing: 'Đang xử lý', shipping: 'Đang giao', completed: 'Đã giao', cancelled: 'Đã hủy' };
    const filtered = filter === 'all' ? orders : orders.filter(o => normalize(o.status) === filter);

    return (
        <div className="max-w-4xl mx-auto py-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-xl">
                    <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Đơn hàng của tôi</h1>
                    <p className="text-slate-500 text-sm">{orders.length} đơn hàng</p>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-hide">
                {tabs.map(t => (
                    <button key={t} onClick={() => setFilter(t)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            filter === t
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
                        }`}>
                        {tabLabel[t]}
                        {t !== 'all' && orders.filter(o => normalize(o.status) === t).length > 0 && (
                            <span className={`ml-1.5 text-xs ${filter === t ? 'opacity-80' : 'text-blue-500'}`}>
                                ({orders.filter(o => normalize(o.status) === t).length})
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <ShoppingBagIcon className="h-14 w-14 mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500">Không có đơn hàng nào.</p>
                    <Link to="/" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors">
                        Mua sắm ngay
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((order) => {
                        const cfg = STATUS_CONFIG[normalize(order.status)] || STATUS_CONFIG.pending;
                        const Icon = cfg.icon;
                        return (
                            <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                {/* Order header */}
                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-slate-900">#{order.id}</span>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.cls}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                                            {cfg.label}
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-400">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN', {
                                            day: '2-digit', month: '2-digit', year: 'numeric'
                                        }) : ''}
                                    </span>
                                </div>

                                {/* Items */}
                                <div className="px-5 py-4 space-y-3">
                                    {(order.items || order.orderItems || []).map((item, i) => (
                                        <div key={item.id || i} className="flex items-center gap-3">
                                            <img src={item.productImage || item.imageUrl || 'https://via.placeholder.com/48'}
                                                alt={item.productName}
                                                className="w-12 h-12 object-contain bg-slate-50 rounded-lg p-1" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.productName}</p>
                                                <p className="text-xs text-slate-400">{item.price?.toLocaleString('vi-VN')}đ × {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-900 flex-shrink-0">
                                                {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span className={`px-2 py-0.5 rounded font-medium ${
                                            order.paymentMethod === 'BANK_TRANSFER'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {order.paymentMethod === 'BANK_TRANSFER' ? 'VietQR' : 'COD'}
                                        </span>
                                        <span>{order.fullName}</span>
                                    </div>
                                    <div className="text-right flex items-center gap-4">
                                        <div>
                                            <span className="text-xs text-slate-400 mr-2">Tổng</span>
                                            <span className="text-base font-bold text-blue-600">
                                                {(order.totalPrice || 0).toLocaleString('vi-VN')}đ
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => handleViewDetails(order)}
                                            disabled={loadingDetails}
                                            className="px-4 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            {loadingDetails ? 'Đang tải...' : 'Xem chi tiết'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal Chi tiết đơn hàng */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">Chi tiết đơn hàng #{selectedOrder.id}</h3>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                            {/* Thông tin giao hàng */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                                    Thông tin giao hàng
                                </h4>
                                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 space-y-2">
                                    <p><span className="font-medium text-slate-900">Người nhận:</span> {selectedOrder.fullName}</p>
                                    <p><span className="font-medium text-slate-900">Số điện thoại:</span> {selectedOrder.phone}</p>
                                    <p><span className="font-medium text-slate-900">Địa chỉ:</span> {selectedOrder.address}</p>
                                    {selectedOrder.note && <p><span className="font-medium text-slate-900">Ghi chú:</span> {selectedOrder.note}</p>}
                                </div>
                            </div>
                            
                            {/* Danh sách sản phẩm */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                                    Sản phẩm đã đặt
                                </h4>
                                <div className="space-y-3">
                                    {(selectedOrder.items || selectedOrder.orderItems || []).map((item, i) => (
                                        <div key={item.id || i} className="flex items-center gap-4 bg-white border border-slate-100 p-3 rounded-xl">
                                            <img src={item.productImage || item.imageUrl || 'https://via.placeholder.com/64'}
                                                alt={item.productName}
                                                className="w-16 h-16 object-contain bg-slate-50 rounded-lg p-1" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 line-clamp-2">{item.productName}</p>
                                                <p className="text-xs text-slate-500 mt-1">Đơn giá: {item.price?.toLocaleString('vi-VN')}đ × {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-bold text-blue-600 flex-shrink-0">
                                                {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tổng kết */}
                            <div className="border-t border-slate-100 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Phương thức thanh toán</span>
                                    <span className="font-medium text-slate-900">{selectedOrder.paymentMethod === 'BANK_TRANSFER' ? 'Chuyển khoản (VietQR)' : 'Thanh toán khi nhận hàng (COD)'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Trạng thái</span>
                                    <span className="font-medium text-slate-900">{STATUS_CONFIG[normalize(selectedOrder.status)]?.label || selectedOrder.status}</span>
                                </div>
                                <div className="flex justify-between text-base pt-2">
                                    <span className="font-semibold text-slate-900">Tổng cộng</span>
                                    <span className="font-bold text-blue-600 text-lg">{(selectedOrder.totalPrice || 0).toLocaleString('vi-VN')}đ</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-right flex justify-end">
                            <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium">
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
