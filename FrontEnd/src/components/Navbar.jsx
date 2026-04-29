import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
    ShoppingBagIcon, UserIcon, ArrowRightOnRectangleIcon,
    ClipboardDocumentListIcon, Cog6ToothIcon, BellIcon,
    MagnifyingGlassIcon, TruckIcon, InformationCircleIcon,
    ChatBubbleOvalLeftEllipsisIcon, ChevronDownIcon, Bars3Icon, XMarkIcon
} from '@heroicons/react/24/outline';
import { Menu, Transition, Popover } from '@headlessui/react';
import { Fragment, useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import notificationApi from '../api/notificationApi';
import categoryApi from '../api/categoryApi';

const Navbar = () => {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const categoryMenuRef = useRef(null);

    const isInAdminSection = location.pathname.startsWith('/admin');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchNotifications();
            const client = new Client({
                webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
                reconnectDelay: 5000,
            });
            client.onConnect = function () {
                client.subscribe('/topic/notifications/' + user.id, (message) => {
                    const newNotify = JSON.parse(message.body);
                    setNotifications(prev => [newNotify, ...prev].slice(0, 50));
                    setUnreadCount(prev => prev + 1);
                });
            };
            client.activate();
            return () => { if (client.active) client.deactivate(); };
        }
    }, [isAuthenticated, user]);

    const fetchCategories = async () => {
        try {
            const res = await categoryApi.getAll();
            setCategories(res?.result || res || []);
        } catch (e) { }
    };

    const fetchNotifications = async () => {
        try {
            const notList = await notificationApi.getMyNotifications();
            setNotifications(notList || []);
            const unreadRes = await notificationApi.getUnreadCount();
            setUnreadCount(unreadRes || 0);
        } catch (e) { }
    };

    const handleNotificationClick = async (notif) => {
        if (!notif.isRead) {
            try {
                await notificationApi.markAsRead(notif.id);
                setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
                setUnreadCount(prev => Math.max(0, prev - 1));
            } catch (e) { }
        }
        if (notif.type === 'order') navigate('/orders');
    };

    const handleMarkAllRead = async () => {
        try {
            await notificationApi.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (e) { }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const kw = searchKeyword.trim();
        if (kw) {
            navigate(`/search?search=${encodeURIComponent(kw)}`);
        } else {
            navigate('/search');
        }
    };

    // Đóng dropdown danh mục khi click bên ngoài
    useEffect(() => {
        const handler = (e) => {
            if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target)) {
                setShowCategoryMenu(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    if (isInAdminSection) {
        return (
            <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        <Link to="/admin" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <Cog6ToothIcon className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Admin Panel</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
                                ← Về cửa hàng
                            </Link>
                            {isAuthenticated && (
                                <Menu as="div" className="relative">
                                    <Menu.Button className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-800 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                                            {user?.email?.charAt(0).toUpperCase() || 'A'}
                                        </div>
                                    </Menu.Button>
                                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-4 py-3 border-b border-slate-100">
                                                <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                                                <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()}</p>
                                            </div>
                                            <Menu.Item>{({ active }) => (
                                                <button onClick={handleLogout} className={`${active ? 'bg-slate-50' : ''} flex w-full items-center px-4 py-2 text-sm text-blue-600`}>
                                                    <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" /> Đăng xuất
                                                </button>
                                            )}</Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            {/* Main Navbar */}
            <div className="bg-blue-600">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-4 h-16">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <img
                                src="https://res.cloudinary.com/dquuquf93/image/upload/v1777376204/logo_argrg0.png"
                                alt="TQuad Logo"
                                className="h-24 w-auto object-contain"
                            />
                        </Link>

                        {/* Category Button */}
                        <div className="relative flex-shrink-0" ref={categoryMenuRef}>
                            <button
                                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                                className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                            >
                                <Bars3Icon className="h-4 w-4" />
                                <span className="hidden md:block">Danh mục</span>
                                <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Category Dropdown */}
                            {showCategoryMenu && (
                                <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black/10 overflow-hidden z-50">
                                    {categories.length === 0 ? (
                                        <div className="p-4 text-sm text-slate-500 text-center">Đang tải...</div>
                                    ) : (
                                        <ul className="py-1 max-h-80 overflow-y-auto">
                                            {categories.map(cat => (
                                                <li key={cat.id}>
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/search?category=${cat.id}`);
                                                            setShowCategoryMenu(false);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                                                        {cat.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Bạn tìm kiếm gì hôm nay?"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                className="w-full pl-4 pr-12 py-2.5 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 text-slate-800 placeholder-slate-400 bg-white"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-full px-4 bg-blue-700 hover:bg-blue-800 rounded-r-xl text-white transition-colors flex items-center"
                            >
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </button>
                        </form>

                        {/* Utility Buttons */}
                        <div className="hidden lg:flex items-center gap-1">
                            {/* Giới thiệu */}
                            <Link to="/about" className="flex flex-col items-center px-3 py-1 text-white hover:bg-blue-700 rounded-lg transition-colors">
                                <InformationCircleIcon className="h-5 w-5" />
                                <span className="text-[10px] mt-0.5 whitespace-nowrap">Giới thiệu</span>
                            </Link>

                            {/* Liên hệ */}
                            <Link to="/contact" className="flex flex-col items-center px-3 py-1 text-white hover:bg-blue-700 rounded-lg transition-colors">
                                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                                <span className="text-[10px] mt-0.5 whitespace-nowrap">Liên hệ</span>
                            </Link>

                            {/* Đơn hàng */}
                            <Link to="/orders" className="flex flex-col items-center px-3 py-1 text-white hover:bg-blue-700 rounded-lg transition-colors">
                                <TruckIcon className="h-5 w-5" />
                                <span className="text-[10px] mt-0.5 whitespace-nowrap">Đơn hàng</span>
                            </Link>
                        </div>

                        {/* Notification Bell */}
                        {isAuthenticated && (
                            <Popover className="relative flex-shrink-0">
                                <Popover.Button className="flex flex-col items-center px-2 py-1 text-white hover:bg-blue-700 rounded-lg transition-colors relative">
                                    <div className="relative">
                                        <BellIcon className="h-5 w-5" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-yellow-400 rounded-full">
                                                {unreadCount > 9 ? '9+' : unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] mt-0.5">Thông báo</span>
                                </Popover.Button>
                                <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                                    <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 lg:w-96">
                                        <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10">
                                            <div className="bg-white p-4 border-b border-slate-100 flex justify-between items-center">
                                                <h3 className="text-sm font-semibold text-slate-800">Thông báo</h3>
                                                {unreadCount > 0 && (
                                                    <button onClick={handleMarkAllRead} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                                        Đánh dấu đã đọc tất cả
                                                    </button>
                                                )}
                                            </div>
                                            <div className="bg-white max-h-96 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-6 text-center text-sm text-slate-500">Không có thông báo nào.</div>
                                                ) : (
                                                    <div className="flex flex-col">
                                                        {notifications.map(notif => (
                                                            <div key={notif.id} onClick={() => handleNotificationClick(notif)}
                                                                className={`p-4 cursor-pointer border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 items-start ${!notif.isRead ? 'bg-blue-50/50' : ''}`}>
                                                                <div className={`p-2 rounded-full mt-1 ${notif.type === 'order' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                                                    {notif.type === 'order' ? <ClipboardDocumentListIcon className="w-4 h-4" /> : <BellIcon className="w-4 h-4" />}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className={`text-sm ${!notif.isRead ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>{notif.content}</p>
                                                                    <p className="text-xs text-slate-400 mt-1">{new Date(notif.createdAt).toLocaleString('vi-VN')}</p>
                                                                </div>
                                                                {!notif.isRead && <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
                        )}

                        {/* Cart */}
                        <Link to="/cart" className="flex-shrink-0 flex flex-col items-center px-2 py-1 text-white hover:bg-blue-700 rounded-lg transition-colors relative">
                            <div className="relative">
                                <ShoppingBagIcon className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-yellow-400 rounded-full">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] mt-0.5">Giỏ hàng</span>
                        </Link>

                        {/* User Account */}
                        {isAuthenticated ? (
                            <Menu as="div" className="relative flex-shrink-0">
                                <Menu.Button className="flex flex-col items-center px-2 py-1 text-white hover:bg-blue-700 rounded-lg transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs">
                                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-[10px] mt-0.5 max-w-[60px] truncate">
                                        {user?.email?.split('@')[0] || 'Tài khoản'}
                                    </span>
                                </Menu.Button>
                                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                    <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/10 focus:outline-none">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                                            <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()}</p>
                                        </div>
                                        <Menu.Item>{({ active }) => (
                                            <Link to="/profile" className={`${active ? 'bg-slate-50' : ''} flex items-center px-4 py-2 text-sm text-slate-700`}>
                                                <UserIcon className="mr-2 h-4 w-4" /> Tài khoản
                                            </Link>
                                        )}</Menu.Item>
                                        {!isAdmin && (
                                            <Menu.Item>{({ active }) => (
                                                <Link to="/orders" className={`${active ? 'bg-slate-50' : ''} flex items-center px-4 py-2 text-sm text-slate-700`}>
                                                    <ClipboardDocumentListIcon className="mr-2 h-4 w-4" /> Đơn hàng
                                                </Link>
                                            )}</Menu.Item>
                                        )}
                                        {isAdmin && (
                                            <Menu.Item>{({ active }) => (
                                                <Link to="/admin" className={`${active ? 'bg-slate-50' : ''} flex items-center px-4 py-2 text-sm text-slate-700`}>
                                                    <Cog6ToothIcon className="mr-2 h-4 w-4" /> Quản trị
                                                </Link>
                                            )}</Menu.Item>
                                        )}
                                        <Menu.Item>{({ active }) => (
                                            <button onClick={handleLogout} className={`${active ? 'bg-slate-50' : ''} flex w-full items-center px-4 py-2 text-sm text-blue-600`}>
                                                <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" /> Đăng xuất
                                            </button>
                                        )}</Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        ) : (
                            <div className="flex-shrink-0 flex items-center gap-2">
                                <Link to="/login" className="text-white text-sm font-medium hover:text-blue-100 transition-colors">
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="text-sm font-medium bg-white text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                                    Đăng ký
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </header>
    );
};

export default Navbar;
