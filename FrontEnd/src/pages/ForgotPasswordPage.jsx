import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import { toast } from 'react-toastify';
import { EnvelopeIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return toast.error('Vui lòng nhập email');
        setLoading(true);
        try {
            await authApi.forgetPassword(email);
            setSent(true);
            toast.success('Đã gửi mật khẩu mới qua email!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Không thể gửi email. Vui lòng thử lại.');
        } finally { setLoading(false); }
    };

    if (sent) {
        return (
            <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircleIcon className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Kiểm tra email của bạn</h2>
                    <p className="text-slate-500 text-sm mb-2">
                        Chúng tôi đã gửi mật khẩu mới đến
                    </p>
                    <p className="font-semibold text-slate-800 mb-6">{email}</p>
                    <p className="text-slate-400 text-xs mb-8">
                        Không thấy email? Kiểm tra thư mục spam hoặc thử lại.
                    </p>
                    <button onClick={() => navigate('/login')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200 text-sm mb-3">
                        Đến trang đăng nhập
                    </button>
                    <button onClick={() => setSent(false)}
                        className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
                        Không nhận được? Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl p-10">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <EnvelopeIcon className="h-8 w-8 text-blue-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-1">Quên mật khẩu?</h2>
                    <p className="text-slate-500 text-sm text-center mb-8">
                        Nhập email của bạn, chúng tôi sẽ gửi mật khẩu mới ngay lập tức.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Địa chỉ Email</label>
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input type="email" required value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition" />
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
                                    Đang gửi...
                                </span>
                            ) : '📨 Gửi mật khẩu mới'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login"
                            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">
                            <ArrowLeftIcon className="h-4 w-4" />
                            Quay lại đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
