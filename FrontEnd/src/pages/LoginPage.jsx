import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);
        if (result.success) {
            toast.success('Chào mừng bạn quay lại! 🎉');
            const role = result.user?.roles || result.user?.role;
            navigate(role === 'ADMIN' ? '/admin' : '/');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
                {/* Left panel */}
                <div className="hidden md:flex flex-col justify-between w-5/12 bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white">
                    <div>
                        <img src="https://res.cloudinary.com/dquuquf93/image/upload/f_png,b_transparent/v1777365024/Gemini_Generated_Image_6jrdyv6jrdyv6jrd_2_toqfv3.png" alt="TQuad" className="h-12 w-auto object-contain mb-2" />
                        <div className="text-blue-200 text-sm">Chào mừng trở lại!</div>
                    </div>
                    <div className="space-y-6">
                        {[
                            { icon: '🛍️', text: 'Hàng ngàn sản phẩm chính hãng' },
                            { icon: '🚚', text: 'Giao hàng toàn quốc' },
                            { icon: '🔒', text: 'Bảo mật tài khoản tuyệt đối' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                <span className="text-blue-100 text-sm">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-blue-300 text-xs">© 2025 TQuad. All rights reserved.</div>
                </div>

                {/* Right form */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Đăng nhập</h2>
                    <p className="text-slate-500 text-sm mb-8">Nhập thông tin tài khoản của bạn</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="email" required value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
                                <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">Quên mật khẩu?</Link>
                            </div>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type={showPass ? 'text' : 'password'} required value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition"
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPass ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200 text-sm">
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Đang đăng nhập...
                                </span>
                            ) : 'Đăng nhập'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-600">
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className="font-semibold text-blue-600 hover:underline">Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
