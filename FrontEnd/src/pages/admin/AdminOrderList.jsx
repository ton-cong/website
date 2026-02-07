import { useEffect, useState } from 'react';
import orderApi from '../../api/orderApi';
import { toast } from 'react-toastify';
import { EyeIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderApi.getAll();
            setOrders(response?.result || response || []);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh sách đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await orderApi.updateStatus(orderId, newStatus);
            toast.success("Cập nhật trạng thái thành công");
            fetchOrders();
        } catch (error) {
            console.error(error);
            toast.error("Không thể cập nhật trạng thái");
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'processing': 'bg-blue-100 text-blue-800 border-blue-200',
            'shipping': 'bg-purple-100 text-purple-800 border-purple-200',
            'completed': 'bg-green-100 text-green-800 border-green-200',
            'cancelled': 'bg-red-100 text-red-800 border-red-200',
            'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'PROCESSING': 'bg-blue-100 text-blue-800 border-blue-200',
            'SHIPPING': 'bg-purple-100 text-purple-800 border-purple-200',
            'COMPLETED': 'bg-green-100 text-green-800 border-green-200',
            'CANCELLED': 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getStatusText = (status) => {
        const texts = {
            'pending': 'Chờ xác nhận',
            'processing': 'Đang xử lý',
            'shipping': 'Đang giao',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy',
            'PENDING': 'Chờ xác nhận',
            'PROCESSING': 'Đang xử lý',
            'SHIPPING': 'Đang giao',
            'COMPLETED': 'Hoàn thành',
            'CANCELLED': 'Đã hủy',
        };
        return texts[status] || status;
    };

    const statusOptions = ['pending', 'processing', 'shipping', 'completed', 'cancelled'];

    // Filter orders
    const filteredOrders = orders.filter(order => {
        if (!filterStatus) return true;
        return order.status?.toLowerCase() === filterStatus.toLowerCase();
    });

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
                <h1 className="text-2xl font-bold text-slate-900">Quản lý đơn hàng</h1>
                <div className="flex items-center space-x-4">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    >
                        <option value="">Tất cả trạng thái</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{getStatusText(status)}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {statusOptions.map(status => {
                    const count = orders.filter(o => o.status?.toLowerCase() === status).length;
                    return (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(filterStatus === status ? '' : status)}
                            className={`p-3 rounded-lg text-center transition-all ${filterStatus === status
                                    ? 'ring-2 ring-indigo-500 ' + getStatusColor(status)
                                    : 'bg-white border border-slate-200 hover:border-indigo-300'
                                }`}
                        >
                            <p className="text-2xl font-bold">{count}</p>
                            <p className="text-xs">{getStatusText(status)}</p>
                        </button>
                    );
                })}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? filteredOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        >
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p className="font-bold text-slate-900">Đơn #{order.id}</p>
                                    <p className="text-sm text-slate-500">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : ''}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="font-semibold text-slate-900">
                                        {(order.totalPrice || order.totalAmount || 0).toLocaleString()}đ
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {(order.items || order.orderItems || []).length} sản phẩm
                                    </p>
                                </div>
                                <select
                                    value={order.status}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(order.id, e.target.value);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(order.status)}`}
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{getStatusText(status)}</option>
                                    ))}
                                </select>
                                {expandedOrder === order.id ? (
                                    <ChevronUpIcon className="h-5 w-5 text-slate-400" />
                                ) : (
                                    <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                                )}
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedOrder === order.id && (
                            <div className="border-t border-slate-100 p-4 bg-slate-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Customer Info */}
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2">Thông tin khách hàng</h3>
                                        <div className="text-sm space-y-1">
                                            <p><span className="text-slate-500">Họ tên:</span> {order.fullName}</p>
                                            <p><span className="text-slate-500">SĐT:</span> {order.phone}</p>
                                            <p><span className="text-slate-500">Địa chỉ:</span> {order.address}</p>
                                            {order.note && <p><span className="text-slate-500">Ghi chú:</span> {order.note}</p>}
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2">Sản phẩm</h3>
                                        <div className="space-y-2">
                                            {(order.items || order.orderItems || []).map((item, idx) => (
                                                <div key={idx} className="flex items-center space-x-3 text-sm">
                                                    <img
                                                        src={item.productImage || 'https://via.placeholder.com/40'}
                                                        alt={item.productName}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium">{item.productName}</p>
                                                        <p className="text-slate-500">
                                                            {item.price?.toLocaleString()}đ x {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">
                                                        {(item.price * item.quantity).toLocaleString()}đ
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="bg-white rounded-xl p-12 text-center text-slate-500">
                        {filterStatus ? 'Không có đơn hàng nào với trạng thái này' : 'Chưa có đơn hàng nào'}
                    </div>
                )}
            </div>

            <div className="mt-4 text-sm text-slate-500">
                Hiển thị {filteredOrders.length} / {orders.length} đơn hàng
            </div>
        </div>
    );
};

export default AdminOrderList;
