import { useEffect, useState } from 'react';
import orderApi from '../../api/orderApi';
import { toast } from 'react-toastify';
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

    useEffect(() => {
        fetchOrders();
    }, [currentPage, pageSize, sortBy, sortDir]);

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
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Quản lý đơn hàng</h1>

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
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600" onClick={() => handleSort('createdAt')}>
                                    Ngày tạo {getSortIcon('createdAt')}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => (
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
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : ''}
                                    </td>
                                    <td className="px-6 py-4 text-right">
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {orders.length === 0 && !loading && (
                    <div className="text-center py-12 text-slate-500">Không có đơn hàng nào</div>
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

export default AdminOrderList;
