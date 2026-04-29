import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import productApi from '../api/productApi';
import orderApi from '../api/orderApi';
import adminApi from '../api/adminApi';
import EChart from '../components/EChart';
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
                    <h2 className="text-xl font-bold">Admin Panel</h2>
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
                                    ? 'bg-blue-600 text-white'
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
                    <Link to="/" className="flex items-center text-slate-400 hover:text-white text-sm transition-colors">
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

const STATUS_CFG = {
    pending:    { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700', hex: '#f59e0b' },
    processing: { label: 'Đang xử lý',   color: 'bg-blue-100 text-blue-700',     hex: '#3b82f6' },
    shipping:   { label: 'Đang giao',    color: 'bg-purple-100 text-purple-700', hex: '#8b5cf6' },
    completed:  { label: 'Hoàn thành',   color: 'bg-green-100 text-green-700',   hex: '#10b981' },
    cancelled:  { label: 'Đã hủy',       color: 'bg-red-100 text-red-700',       hex: '#ef4444' },
};

// Format ngày cố định DD/MM — không phụ thuộc locale hệ thống
const fmtDay = (date) => {
    const d = new Date(date);
    const day   = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
};

const getDateLabels = (days) => {
    return Array.from({ length: days }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (days - 1 - i));
        return fmtDay(d);
    });
};

const DashboardHome = () => {
    const [stats, setStats]               = useState({ products: 0, orders: 0, users: 0, revenue: 0, completed: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [statusStats, setStatusStats]   = useState([]);
    const [paymentStats, setPaymentStats] = useState([]);
    const [allOrders, setAllOrders]       = useState([]);   // lưu để recompute theo period
    const [topProducts, setTopProducts]   = useState([]);
    const [loading, setLoading]           = useState(true);
    const [revenuePeriod, setRevenuePeriod] = useState(7); // 7 | 30 | 90

    useEffect(() => { fetchStats(); }, []);

    const fetchStats = async () => {
        try {
            const [productsRes, ordersRes, usersRes] = await Promise.all([
                productApi.getAll({ size: 1 }),
                orderApi.getAll({ size: 200 }),
                adminApi.getAllUsers({ size: 1 }),
            ]);
            const productCount    = productsRes?.result?.totalElements || productsRes?.totalElements || 0;
            const userCount       = usersRes?.result?.totalElements    || usersRes?.totalElements    || 0;
            const orderData       = ordersRes?.result?.content || ordersRes?.content || [];
            const orderCount      = ordersRes?.result?.totalElements || ordersRes?.totalElements || 0;
            const completedOrders = orderData.filter(o => o.status?.toLowerCase() === 'completed');
            const revenue         = completedOrders.reduce((s, o) => s + (o.totalPrice || 0), 0);

            const statusMap = {};
            orderData.forEach(o => { 
                const key = o.status?.toLowerCase() || 'pending';
                statusMap[key] = (statusMap[key] || 0) + 1; 
            });
            setStatusStats(Object.entries(statusMap).map(([k, v]) => ({ status: k, count: v })));

            const pmMap = {};
            orderData.forEach(o => {
                // Normalize VNPAY (cũ) về BANK_TRANSFER
                let pm = o.paymentMethod || 'COD';
                if (pm === 'VNPAY') pm = 'BANK_TRANSFER';
                pmMap[pm] = (pmMap[pm] || 0) + 1;
            });
            setPaymentStats(Object.entries(pmMap).map(([k, v]) => ({ method: k, count: v })));

            const days = getDateLabels(7); // lưu 7 ngày mặc định
            const dayMap = {};
            days.forEach(d => { dayMap[d] = 0; });
            orderData.forEach((o) => {
                const dateStr = o.createdAt
                    ? new Date(o.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
                    : null;
                if (dateStr && dayMap[dateStr] !== undefined) dayMap[dateStr] += (o.totalPrice || 0);
            });
            setAllOrders(orderData); // lưu toàn bộ để recompute

            const prodMap = {};
            orderData.forEach(o => {
                (o.items || o.orderItems || []).forEach(it => {
                    if (!prodMap[it.productName]) prodMap[it.productName] = { qty: 0 };
                    prodMap[it.productName].qty += it.quantity || 1;
                });
            });
            const top = Object.entries(prodMap)
                .sort((a, b) => b[1].qty - a[1].qty)
                .slice(0, 5)
                .map(([name, v]) => ({ name: name.length > 22 ? name.slice(0, 22) + '...' : name, ...v }));
            setTopProducts(top);

            setStats({ products: productCount, orders: orderCount, users: userCount, revenue, completed: completedOrders.length });
            setRecentOrders(orderData.slice(0, 8));
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const fmtM = n => n >= 1000000 ? (n / 1000000).toFixed(1) + 'M' : n >= 1000 ? (n / 1000).toFixed(0) + 'K' : String(n);

    // Tính lại revenueByDay khi đổi period
    const revenueByDay = (() => {
        const labels = getDateLabels(revenuePeriod);
        const dayMap = {};
        labels.forEach(d => { dayMap[d] = 0; });
        allOrders.forEach(o => {
            const dateStr = o.createdAt ? fmtDay(new Date(o.createdAt)) : null;
            if (dateStr && dayMap[dateStr] !== undefined) dayMap[dateStr] += (o.totalPrice || 0);
        });
        // Nếu period dài (30/90 ngày), gom theo tuần để dễ đọc
        if (revenuePeriod <= 7) {
            return labels.map(d => ({ day: d, value: dayMap[d] }));
        }
        // Gom theo nhóm 7 ngày
        const grouped = [];
        for (let i = 0; i < labels.length; i += 7) {
            const chunk = labels.slice(i, i + 7);
            const total = chunk.reduce((s, d) => s + dayMap[d], 0);
            grouped.push({ day: chunk[0] + '-' + chunk[chunk.length - 1], value: total });
        }
        return grouped;
    })();

    const lineOption = {
        tooltip: { trigger: 'axis' },
        grid: { top: 20, bottom: 30, left: 55, right: 16 },
        xAxis: { type: 'category', data: revenueByDay.map(d => d.day), axisLine: { show: false }, axisTick: { show: false }, axisLabel: { fontSize: 11, color: '#94a3b8' } },
        yAxis: { type: 'value', axisLabel: { formatter: v => fmtM(v), fontSize: 10, color: '#94a3b8' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
        series: [{
            type: 'line', data: revenueByDay.map(d => d.value),
            smooth: true, symbol: 'circle', symbolSize: 6,
            lineStyle: { color: '#3b82f6', width: 2.5 },
            itemStyle: { color: '#3b82f6' },
            areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(59,130,246,0.3)' }, { offset: 1, color: 'rgba(59,130,246,0)' }] } },
        }],
    };

    const donutOption = {
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', right: 0, top: 'center', textStyle: { fontSize: 11, color: '#475569' } },
        series: [{
            type: 'pie', radius: ['48%', '72%'], center: ['38%', '50%'],
            data: Object.entries(STATUS_CFG).map(([k, cfg]) => ({
                name: cfg.label,
                value: statusStats.find(s => s.status === k)?.count || 0,
                itemStyle: { color: cfg.hex },
            })).filter(d => d.value > 0),
            label: { show: false },
            emphasis: { scale: true, scaleSize: 6 },
        }],
    };

    const barOption = {
        tooltip: { trigger: 'axis' },
        grid: { top: 10, bottom: 10, left: 130, right: 30 },
        xAxis: { type: 'value', axisLabel: { fontSize: 10, color: '#94a3b8' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
        yAxis: { type: 'category', data: topProducts.map(p => p.name), axisLabel: { fontSize: 10, color: '#475569', width: 120, overflow: 'truncate' }, axisLine: { show: false }, axisTick: { show: false } },
        series: [{
            type: 'bar', data: topProducts.map(p => p.qty), barMaxWidth: 24,
            itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#93c5fd' }, { offset: 1, color: '#2563eb' }] }, borderRadius: [0, 6, 6, 0] },
            label: { show: true, position: 'right', fontSize: 10, color: '#475569' },
        }],
    };

    const pmOption = {
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        series: [{
            type: 'pie', radius: ['50%', '70%'], center: ['50%', '50%'],
            data: paymentStats.map(p => ({
                name: p.method === 'BANK_TRANSFER' ? 'VietQR' : 'COD',
                value: p.count,
                itemStyle: { color: p.method === 'BANK_TRANSFER' ? '#3b82f6' : '#f59e0b' },
            })),
            label: { formatter: '{b}\n{d}%', fontSize: 11 },
            emphasis: { scale: true, scaleSize: 5 },
        }],
    };

    const funnelOption = {
        tooltip: { trigger: 'item', formatter: '{b}: {c}' },
        series: [{
            type: 'funnel', width: '70%', left: '15%', top: 20, bottom: 20, sort: 'none',
            data: [
                { name: 'Tổng đơn hàng', value: stats.orders,    itemStyle: { color: '#93c5fd' } },
                { name: 'Đang xử lý',    value: statusStats.find(s => s.status === 'processing')?.count || 0, itemStyle: { color: '#60a5fa' } },
                { name: 'Đang giao',     value: statusStats.find(s => s.status === 'shipping')?.count || 0,   itemStyle: { color: '#3b82f6' } },
                { name: 'Hoàn thành',    value: stats.completed, itemStyle: { color: '#1d4ed8' } },
            ].filter(d => d.value > 0),
            label: { position: 'inside', formatter: '{b}: {c}', color: '#fff', fontSize: 11, fontWeight: 600 },
            gap: 4,
        }],
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    const kpiCards = [
        { label: 'Sản phẩm',   value: stats.products,             icon: CubeIcon,           sub: 'Đang kinh doanh',              grad: 'from-blue-500 to-blue-700',     link: '/admin/products' },
        { label: 'Đơn hàng',   value: stats.orders,               icon: ShoppingBagIcon,    sub: stats.completed + ' hoàn thành', grad: 'from-emerald-500 to-green-700', link: '/admin/orders' },
        { label: 'Người dùng', value: stats.users,                icon: UsersIcon,          sub: 'Tài khoản đăng ký',            grad: 'from-violet-500 to-purple-700', link: '/admin/users' },
        { label: 'Doanh thu',  value: fmtM(stats.revenue) + 'đ', icon: CurrencyDollarIcon, sub: 'Từ đơn hoàn thành',            grad: 'from-amber-500 to-orange-600',  link: null },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-sm text-slate-400 mt-0.5">Tổng quan hệ thống TQuad</p>
                </div>
                <span className="text-xs text-slate-400 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                    {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {kpiCards.map((c, i) => (
                    <div key={i} className={`bg-gradient-to-br ${c.grad} rounded-2xl p-5 text-white shadow-lg relative overflow-hidden`}>
                        <div className="absolute right-4 top-3 opacity-20">
                            <c.icon className="h-10 w-10" />
                        </div>
                        <p className="text-white/75 text-xs font-medium">{c.label}</p>
                        <p className="text-3xl font-black mt-1 mb-1">{c.value}</p>
                        <p className="text-white/60 text-xs">{c.sub}</p>
                        {c.link && (
                            <Link to={c.link} className="absolute bottom-3 right-3 text-white/60 hover:text-white text-xs bg-white/10 hover:bg-white/25 px-2 py-1 rounded-lg transition-all">
                                Chi tiết →
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span className="w-1 h-4 bg-blue-600 rounded-full inline-block"></span>
                            Doanh thu {revenuePeriod === 7 ? '7 ngày' : revenuePeriod === 30 ? '1 tháng' : '3 tháng'} gần nhất
                        </h2>
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                            {[{ label: '1 Tuần', value: 7 }, { label: '1 Tháng', value: 30 }, { label: '3 Tháng', value: 90 }].map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setRevenuePeriod(opt.value)}
                                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                                        revenuePeriod === opt.value
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <EChart option={lineOption} style={{ height: 220 }} />
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span className="w-1 h-4 bg-purple-500 rounded-full inline-block"></span>
                            Trạng thái đơn hàng
                        </h2>
                        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Donut</span>
                    </div>
                    <EChart option={donutOption} style={{ height: 220 }} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span className="w-1 h-4 bg-blue-500 rounded-full inline-block"></span>
                            Top sản phẩm bán chạy
                        </h2>
                        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Bar Chart</span>
                    </div>
                    {topProducts.length > 0
                        ? <EChart option={barOption} style={{ height: 220 }} />
                        : <div className="flex items-center justify-center h-48 text-slate-300 text-sm">Chưa có dữ liệu sản phẩm</div>
                    }
                </div>
                <div className="grid grid-rows-2 gap-5">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <span className="w-1 h-4 bg-amber-500 rounded-full inline-block"></span>
                                Phương thức thanh toán
                            </h2>
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Pie</span>
                        </div>
                        <EChart option={pmOption} style={{ height: 140 }} />
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <span className="w-1 h-4 bg-blue-600 rounded-full inline-block"></span>
                                Phễu đơn hàng
                            </h2>
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Funnel</span>
                        </div>
                        <EChart option={funnelOption} style={{ height: 140 }} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-1 h-5 bg-green-500 rounded-full inline-block"></span>
                        Đơn hàng gần đây
                    </h2>
                    <Link to="/admin/orders" className="text-xs text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                        Xem tất cả ({stats.orders}) →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-xs text-slate-500">
                            <tr>
                                {['Đơn #', 'Khách hàng', 'Địa chỉ', 'Thanh toán', 'Tổng tiền', 'Trạng thái'].map(h => (
                                    <th key={h} className={`px-4 py-3 font-medium ${h === 'Tổng tiền' ? 'text-right' : h === 'Trạng thái' ? 'text-center' : 'text-left'}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {recentOrders.length === 0 ? (
                                <tr><td colSpan={6} className="py-10 text-center text-slate-300">Chưa có đơn hàng</td></tr>
                            ) : recentOrders.map(order => {
                                const cfg = STATUS_CFG[order.status] || { label: order.status, color: 'bg-slate-100 text-slate-600' };
                                return (
                                    <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-4 py-3.5 font-bold text-blue-600">#{order.id}</td>
                                        <td className="px-4 py-3.5">
                                            <p className="font-medium text-slate-900 text-xs">{order.fullName || 'Khách'}</p>
                                            <p className="text-slate-400 text-xs">{order.phone || ''}</p>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-400 text-xs max-w-xs truncate">{order.address || ''}</td>
                                        <td className="px-4 py-3.5">
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                                {['BANK_TRANSFER','VNPAY'].includes(order.paymentMethod) ? 'VietQR' : 'COD'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-right font-bold text-slate-900 text-xs">
                                            {(order.totalPrice || 0).toLocaleString('vi-VN')}đ
                                        </td>
                                        <td className="px-4 py-3.5 text-center">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.color}`}>{cfg.label}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;