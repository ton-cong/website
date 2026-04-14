import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import productApi from '../api/productApi';
import orderApi from '../api/orderApi';
import adminApi from '../api/adminApi';
import {
    Squares2X2Icon,
    CubeIcon,
    ShoppingBagIcon,
    UsersIcon,
    TagIcon,
    CurrencyDollarIcon,
    StarIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import AdminProductList from './admin/AdminProductList';
import AdminProductForm from './admin/AdminProductForm';
import AdminOrderList from './admin/AdminOrderList';
import AdminUserList from './admin/AdminUserList';
import AdminCategoryList from './admin/AdminCategoryList';
import AdminReviewList from './admin/AdminReviewList';
import AdminChat from './admin/AdminChat';

const AdminDashboard = () => {

    const { user, isAuthenticated, isAdmin, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && (!isAuthenticated || !isAdmin)) {
            navigate('/login');
        }
    }, [isAuthenticated, isAdmin, loading, navigate]);

    if (loading) return <div className="p-8">Đang tải...</div>;
    if (!isAuthenticated || !isAdmin) return null;

    const navItems = [
        { name: 'Tổng quan', path: '/admin', icon: Squares2X2Icon },
        { name: 'Sản phẩm', path: '/admin/products', icon: CubeIcon },
        { name: 'Đơn hàng', path: '/admin/orders', icon: ShoppingBagIcon },
        { name: 'Người dùng', path: '/admin/users', icon: UsersIcon },
        { name: 'Danh mục', path: '/admin/categories', icon: TagIcon },
        { name: 'Đánh giá', path: '/admin/reviews', icon: StarIcon },
        { name: 'Hỗ trợ Chat', path: '/admin/chat', icon: ChatBubbleLeftRightIcon },
    ];

    return (
        <div className="flex min-h-screen bg-slate-100">
            <div className="w-64 bg-slate-900 text-white hidden md:block fixed h-full">
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold">🛠️ Admin Panel</h2>
                    <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
                </div>
                <nav className="mt-4 px-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/admin' && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                    <Link
                        to="/"
                        className="flex items-center text-slate-400 hover:text-white text-sm transition-colors"
                    >
                        ← Về cửa hàng
                    </Link>
                </div>
            </div>

            <div className="flex-1 p-8 overflow-auto md:ml-64">
                <Routes>
                    <Route index element={<DashboardHome />} />
                    <Route path="products" element={<AdminProductList />} />
                    <Route path="products/create" element={<AdminProductForm />} />
                    <Route path="products/edit/:id" element={<AdminProductForm />} />
                    <Route path="orders" element={<AdminOrderList />} />
                    <Route path="users" element={<AdminUserList />} />
                    <Route path="categories" element={<AdminCategoryList />} />
                    <Route path="reviews" element={<AdminReviewList />} />
                    <Route path="chat" element={<AdminChat />} />
                </Routes>
            </div>
        </div>
    );
};

const DashboardHome = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0,
        revenue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [productsRes, ordersRes, usersRes] = await Promise.all([
                productApi.getAll({ size: 1 }),
                orderApi.getAll({ size: 100 }),
                adminApi.getAllUsers({ size: 1 })
            ]);

            const productCount = productsRes?.totalElements || 0;
            const orderData = ordersRes?.content || [];
            const orderCount = ordersRes?.totalElements || 0;
            const userCount = usersRes?.totalElements || 0;

            const revenue = orderData.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

            setStats({
                products: productCount,
                orders: orderCount,
                users: userCount,
                revenue
            });

            setRecentOrders(orderData.slice(0, 5));
        } catch (error) {
            console.error("Failed to load stats", error);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Tổng quan hệ thống</h1>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Tổng sản phẩm</p>
                            <p className="text-3xl font-bold text-indigo-600 mt-1">{stats.products}</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <CubeIcon className="h-6 w-6 text-indigo-600" />
                        </div>
                    </div>
                    <Link to="/admin/products" className="text-sm text-indigo-600 hover:underline mt-3 inline-block">
                        Quản lý →
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Tổng đơn hàng</p>
                            <p className="text-3xl font-bold text-green-600 mt-1">{stats.orders}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <ShoppingBagIcon className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <Link to="/admin/orders" className="text-sm text-green-600 hover:underline mt-3 inline-block">
                        Quản lý →
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Người dùng</p>
                            <p className="text-3xl font-bold text-purple-600 mt-1">{stats.users}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <UsersIcon className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                    <Link to="/admin/users" className="text-sm text-purple-600 hover:underline mt-3 inline-block">
                        Quản lý →
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Doanh thu</p>
                            <p className="text-3xl font-bold text-orange-600 mt-1">{stats.revenue.toLocaleString()}đ</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <CurrencyDollarIcon className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900">Đơn hàng gần đây</h2>
                        <Link to="/admin/orders" className="text-indigo-600 text-sm hover:underline">
                            Xem tất cả →
                        </Link>
                    </div>
                </div>
                <div className="divide-y divide-slate-100">
                    {recentOrders.length > 0 ? recentOrders.map(order => (
                        <div key={order.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div>
                                <p className="font-medium text-slate-900">Đơn #{order.id}</p>
                                <p className="text-sm text-slate-500">{order.fullName || order.userEmail || 'Khách hàng'}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-slate-900">{(order.totalPrice || order.totalAmount || 0).toLocaleString()}đ</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                    {getStatusText(order.status)}
                                </span>
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-slate-500">Chưa có đơn hàng nào</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
