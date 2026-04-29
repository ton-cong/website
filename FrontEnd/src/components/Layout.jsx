import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWidget from './ChatWidget';
import {
    PhoneIcon, EnvelopeIcon, MapPinIcon,
    ClockIcon, ShieldCheckIcon, TruckIcon,
    ArrowPathIcon, ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 mt-10">

            {/* Policy strip */}
            <div className="border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-600/20 rounded-lg flex-shrink-0">
                                <TruckIcon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Giao hàng toàn quốc</p>
                                <p className="text-slate-400 text-xs mt-0.5">Miễn phí đơn từ 500K</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-600/20 rounded-lg flex-shrink-0">
                                <ArrowPathIcon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Đổi trả 30 ngày</p>
                                <p className="text-slate-400 text-xs mt-0.5">Hoàn tiền 100% nếu lỗi</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-600/20 rounded-lg flex-shrink-0">
                                <ShieldCheckIcon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Bảo hành chính hãng</p>
                                <p className="text-slate-400 text-xs mt-0.5">12–24 tháng tại hãng</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-600/20 rounded-lg flex-shrink-0">
                                <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Hỗ trợ 24/7</p>
                                <p className="text-slate-400 text-xs mt-0.5">Tư vấn viên luôn sẵn sàng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Col 1: Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="https://res.cloudinary.com/dquuquf93/image/upload/v1777376204/logo_argrg0.png"
                                alt="TQuad Logo"
                                className="h-24 w-auto object-contain"
                            />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Hệ thống bán lẻ công nghệ uy tín hàng đầu Việt Nam. Cung cấp laptop, điện thoại và phụ kiện chính hãng với giá tốt nhất.
                        </p>
                        {/* Social icons */}
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
                            </a>
                            <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors" aria-label="YouTube">
                                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" /></svg>
                            </a>
                            <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                            <a href="#" className="w-8 h-8 bg-slate-700 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors" aria-label="TikTok">
                                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.94a8.18 8.18 0 004.78 1.52V7.01a4.85 4.85 0 01-1.01-.32z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Liên kết nhanh */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Trang chủ', to: '/' },
                                { label: 'Sản phẩm', to: '/' },
                                { label: 'Giới thiệu', to: '/about' },
                                { label: 'Liên hệ', to: '/contact' },
                                { label: 'Đơn hàng của tôi', to: '/orders' },
                                { label: 'Tài khoản', to: '/profile' },
                            ].map(item => (
                                <li key={item.to + item.label}>
                                    <Link to={item.to} className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-blue-500 inline-block flex-shrink-0"></span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Chính sách */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Chính sách</h3>
                        <ul className="space-y-2.5">
                            {[
                                'Chính sách bảo mật',
                                'Chính sách đổi trả',
                                'Chính sách bảo hành',
                                'Chính sách vận chuyển',
                                'Điều khoản sử dụng',
                                'Hướng dẫn mua hàng',
                            ].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-blue-500 inline-block flex-shrink-0"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Liên hệ */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Liên hệ</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPinIcon className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-400 text-sm">123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <PhoneIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                <a href="tel:1800.2097" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">1800.2097 (Miễn phí)</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <EnvelopeIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                <a href="mailto:support@tquad.vn" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">support@tquad.vn</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <ClockIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">8:00 – 21:30 (Thứ 2 – CN)</span>
                            </li>
                        </ul>

                        {/* Phương thức thanh toán */}
                        <div className="mt-5">
                            <p className="text-white font-semibold text-xs uppercase tracking-wider mb-2">Thanh toán</p>
                            <div className="flex flex-wrap gap-2">
                                {['COD', 'ATM', 'Visa', 'MoMo', 'ZaloPay'].map(m => (
                                    <span key={m} className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded font-medium">{m}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-700">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-slate-500 text-xs">
                        &copy; {new Date().getFullYear()} <span className="text-blue-500 font-semibold">TQuad</span>. Tất cả quyền được bảo lưu.
                    </p>
                    <p className="text-slate-600 text-xs">
                        Được xây dựng bằng ❤️ tại Việt Nam
                    </p>
                </div>
            </div>
        </footer>
    );
};

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900">
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Outlet />
                </div>
            </main>
            <Footer />
            <ToastContainer position="bottom-right" theme="light" />
            <ChatWidget />
        </div>
    );
};

export default Layout;
