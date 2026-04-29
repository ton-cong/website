import { useEffect, useState } from 'react';
import orderApi from '../../api/orderApi';
import { toast } from 'react-toastify';
import { MagnifyingGlassIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Pagination from '../../components/Pagination';

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('desc');
    const [search, setSearch] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, [currentPage, pageSize, sortBy, sortDir]);

    useEffect(() => {
        if (search.trim()) {
            setFilteredOrders(orders.filter(o =>
                String(o.id).includes(search) ||
                o.fullName?.toLowerCase().includes(search.toLowerCase()) ||
                o.phone?.includes(search)
            ));
        } else {
            setFilteredOrders(orders);
        }
    }, [search, orders]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await orderApi.getAll({
                page: currentPage,
                size: pageSize,
                sortBy,
                sortDir,
            });
            const data = response?.result || response;
            setOrders(data?.content || []);
            setTotalPages(data?.totalPages || 0);
            setTotalElements(data?.totalElements || 0);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await orderApi.updateStatus(orderId, newStatus);
            toast.success("Cập nhật trạng thái thành công");
            fetchOrders();
        } catch (error) {
            toast.error("Không thể cập nhật trạng thái");
        }
    };

    const handleViewDetails = async (order) => {
        try {
            setLoadingDetails(true);
            const res = await orderApi.getOrderById(order.id);
            setSelectedOrder(res?.result || res || order);
        } catch (error) {
            console.error(error);
            toast.error('Không thể tải chi tiết đơn hàng');
            setSelectedOrder(order); // fallback
        } finally {
            setLoadingDetails(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'processing': 'bg-blue-100 text-blue-800',
            'shipping': 'bg-purple-100 text-purple-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-blue-100 text-blue-800',
            'PENDING': 'bg-yellow-100 text-yellow-800',
            'PROCESSING': 'bg-blue-100 text-blue-800',
            'SHIPPING': 'bg-purple-100 text-purple-800',
            'COMPLETED': 'bg-green-100 text-green-800',
            'CANCELLED': 'bg-blue-100 text-blue-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const texts = {
            'pending': 'Chờ xác nhận', 'processing': 'Đang xử lý',
            'shipping': 'Đang giao', 'completed': 'Đã giao', 'cancelled': 'Đã hủy',
            'PENDING': 'Chờ xác nhận', 'PROCESSING': 'Đang xử lý',
            'SHIPPING': 'Đang giao', 'COMPLETED': 'Đã giao', 'CANCELLED': 'Đã hủy',
        };
        return texts[status] || status;
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

    if (loading && orders.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-0">Quản lý đơn hàng</h1>
                <div className="relative w-full sm:w-auto">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Tìm ID, tên, SĐT..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600" onClick={() => handleSort('id')}>
                                    ID {getSortIcon('id')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Khách hàng</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SĐT</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600" onClick={() => handleSort('totalPrice')}>
                                    Tổng tiền {getSortIcon('totalPrice')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Thanh toán</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600" onClick={() => handleSort('createdAt')}>
                                    Ngày tạo {getSortIcon('createdAt')}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">#{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700">{order.fullName}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{order.phone}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                                        {(order.totalPrice || order.totalAmount || 0).toLocaleString()}đ
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.paymentMethod === 'BANK_TRANSFER' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {order.paymentMethod === 'BANK_TRANSFER' ? 'VietQR' : 'COD'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : ''}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button 
                                                onClick={() => handleViewDetails(order)}
                                                disabled={loadingDetails}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                                                title="Xem chi tiết"
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </button>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                className="text-sm border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="pending">Chờ xác nhận</option>
                                                <option value="processing">Đang xử lý</option>
                                                <option value="shipping">Đang giao</option>
                                                <option value="completed">Đã giao</option>
                                                <option value="cancelled">Đã hủy</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredOrders.length === 0 && !loading && (
                    <div className="text-center py-12 text-slate-500">Không tìm thấy đơn hàng nào</div>
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
                                    <span className="w-1 h-4 bg-indigo-600 rounded-full"></span>
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
                                    <span className="w-1 h-4 bg-indigo-600 rounded-full"></span>
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
                                            <p className="text-sm font-bold text-indigo-600 flex-shrink-0">
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
                                    <span className={`font-medium ${getStatusColor(selectedOrder.status)} px-2 py-0.5 rounded-full text-xs`}>
                                        {getStatusText(selectedOrder.status)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-base pt-2">
                                    <span className="font-semibold text-slate-900">Tổng cộng</span>
                                    <span className="font-bold text-indigo-600 text-lg">{(selectedOrder.totalPrice || selectedOrder.totalAmount || 0).toLocaleString('vi-VN')}đ</span>
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

export default AdminOrderList;
