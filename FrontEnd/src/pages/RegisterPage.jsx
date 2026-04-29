import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { EnvelopeIcon, LockClosedIcon, UserIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ email: '', fullName: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp!');
            return;
        }
        setLoading(true);
        const result = await register({ email: formData.email, password: formData.password, fullName: formData.fullName });
        setLoading(false);
        if (result.success) {
            toast.success('Tạo tài khoản thành công! Hãy đăng nhập.');
            navigate('/login');
        } else {
            toast.error(result.message);
        }
    };

    const Field = ({ label, name, type = 'text', icon: Icon, placeholder, extra }) => (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                    type={type} name={name} required value={formData[name]}
                    onChange={handleChange} placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition"
                />
                {extra}
            </div>
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
                {/* Left panel */}
                <div className="hidden md:flex flex-col justify-between w-5/12 bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white">
                    <div>
                        <img src="https://res.cloudinary.com/dquuquf93/image/upload/f_png,b_transparent/v1777365024/Gemini_Generated_Image_6jrdyv6jrdyv6jrd_2_toqfv3.png" alt="TQuad" className="h-12 w-auto object-contain mb-2" />
                        <div className="text-blue-200 text-sm">Tạo tài khoản miễn phí</div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
                            <p className="text-white font-semibold mb-1">Đăng ký ngay để nhận</p>
                            <ul className="text-blue-100 text-sm space-y-2 mt-2">
                                <li>✓ Theo dõi đơn hàng realtime</li>
                                <li>✓ Ưu đãi thành viên độc quyền</li>
                                <li>✓ Lịch sử mua hàng chi tiết</li>
                                <li>✓ Hỗ trợ ưu tiên 24/7</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-blue-300 text-xs">© 2025 TQuad. All rights reserved.</div>
                </div>

                {/* Right form */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Đăng ký tài khoản</h2>
                    <p className="text-slate-500 text-sm mb-8">Điền đầy đủ thông tin để tạo tài khoản</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Họ và tên</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
                                    placeholder="Nguyễn Văn A"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input type="email" name="email" required value={formData.email} onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mật khẩu</label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input type={showPass ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleChange}
                                    placeholder="Ít nhất 6 ký tự"
                                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition" />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPass ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Xác nhận mật khẩu</label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}
                                    placeholder="Nhập lại mật khẩu"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200 text-sm mt-2">
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Đang tạo tài khoản...
                                </span>
                            ) : 'Đăng ký ngay'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Đã có tài khoản?{' '}
                        <Link to="/login" className="font-semibold text-blue-600 hover:underline">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
