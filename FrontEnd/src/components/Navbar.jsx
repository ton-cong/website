import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBagIcon, UserIcon, ArrowRightOnRectangleIcon, ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Navbar = () => {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isInAdminSection = location.pathname.startsWith('/admin');

    return (
        <nav className={`sticky top-0 z-50 border-b ${isInAdminSection ? 'bg-slate-900 border-slate-700' : 'bg-white/80 backdrop-blur-md border-slate-100'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">


                    <Link to={isAdmin ? "/admin" : "/"} className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isInAdminSection ? 'bg-red-600' : 'bg-indigo-600'}`}>
                            {isInAdminSection ? (
                                <Cog6ToothIcon className="h-5 w-5 text-white" />
                            ) : (
                                <span className="text-white font-bold text-lg">T</span>
                            )}
                        </div>
                        <span className={`text-xl font-bold ${isInAdminSection ? 'text-white' : 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
                            {isInAdminSection ? 'Admin Panel' : 'TechShop'}
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        {!isInAdminSection && (
                            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                                Sản phẩm
                            </Link>
                        )}
                        {isAuthenticated && !isInAdminSection && (
                            <Link to="/orders" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                                Đơn hàng
                            </Link>
                        )}
                        {isAdmin && !isInAdminSection && (
                            <Link to="/admin" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex items-center gap-1">
                                <Cog6ToothIcon className="h-4 w-4" />
                                Quản trị
                            </Link>
                        )}
                        {isAdmin && isInAdminSection && (
                            <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors">
                                ← Về cửa hàng
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {!isInAdminSection && (
                            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-colors">
                                <ShoppingBagIcon className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <Menu as="div" className="relative ml-3">
                                <Menu.Button className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-50/10 transition-colors">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${isInAdminSection ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                                            <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()}</p>
                                        </div>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link to="/profile" className={`${active ? 'bg-slate-50' : ''} flex items-center px-4 py-2 text-sm text-slate-700`}>
                                                    <UserIcon className="mr-2 h-4 w-4" />
                                                    Tài khoản
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        {!isAdmin && (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to="/orders" className={`${active ? 'bg-slate-50' : ''} flex items-center px-4 py-2 text-sm text-slate-700`}>
                                                        <ClipboardDocumentListIcon className="mr-2 h-4 w-4" />
                                                        Đơn hàng
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        )}
                                        {isAdmin && (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to="/admin" className={`${active ? 'bg-slate-50' : ''} flex items-center px-4 py-2 text-sm text-slate-700`}>
                                                        <Cog6ToothIcon className="mr-2 h-4 w-4" />
                                                        Quản trị
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        )}
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button onClick={handleLogout} className={`${active ? 'bg-slate-50' : ''} flex w-full items-center px-4 py-2 text-sm text-red-600`}>
                                                    <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                                                    Đăng xuất
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className={`text-sm font-medium transition-colors ${isInAdminSection ? 'text-white hover:text-slate-200' : 'text-indigo-600 hover:text-indigo-700'}`}>
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    Đăng ký
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
