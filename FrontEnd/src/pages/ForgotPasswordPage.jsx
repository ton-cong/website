import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-toastify';
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Vui lòng nhập email");
            return;
        }

        setLoading(true);
        try {
            await authApi.forgetPassword(email);
            setSent(true);
            toast.success("Đã gửi mật khẩu mới qua email!");
        } catch (error) {
            console.error("Forgot password error:", error);
            toast.error(error.response?.data?.message || "Không thể gửi email. Vui lòng kiểm tra lại.");
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="max-w-md mx-auto mt-10">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <EnvelopeIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Kiểm tra email</h2>
                    <p className="text-slate-500 mb-6">
                        Chúng tôi đã gửi mật khẩu mới đến <span className="font-medium text-slate-700">{email}</span>.
                        Vui lòng kiểm tra hộp thư và đăng nhập với mật khẩu mới.
                    </p>
                    <Button onClick={() => navigate('/login')} className="w-full">
                        Đến trang đăng nhập
                    </Button>
                    <button
                        onClick={() => setSent(false)}
                        className="mt-4 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                        Không nhận được email? Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <EnvelopeIcon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Quên mật khẩu?</h2>
                    <p className="text-slate-500 mt-2">
                        Nhập email của bạn và chúng tôi sẽ gửi mật khẩu mới cho bạn
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />

                    <Button type="submit" className="w-full py-3" disabled={loading}>
                        {loading ? 'Đang gửi...' : 'Gửi mật khẩu mới'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Quay lại đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
