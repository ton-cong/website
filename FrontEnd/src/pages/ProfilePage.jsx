import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import adminApi from '../api/adminApi';
import authApi from '../api/authApi';
import { toast } from 'react-toastify';
import {
    UserCircleIcon, LockClosedIcon, PhoneIcon, MapPinIcon,
    EnvelopeIcon, PencilSquareIcon, ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const ProfilePage = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState({ fullName: '', email: '', phone: '', address: '' });
    const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });

    useEffect(() => {
        if (!isAuthenticated) { navigate('/login'); return; }
        if (user) fetchUserProfile();
    }, [isAuthenticated, user]);

    const fetchUserProfile = async () => {
        try {
            const res = user?.id ? await adminApi.getUserById(user.id) : null;
            const d = res?.result || res || user;
            setProfile({ fullName: d.fullName || d.name || '', email: d.email || '', phone: d.phone || '', address: d.address || '' });
        } catch {
            setProfile({ fullName: user.fullName || '', email: user.email || '', phone: user.phone || '', address: user.address || '' });
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault(); setLoading(true);
        try {
            await authApi.updateProfile({ fullName: profile.fullName, phone: profile.phone, address: profile.address });
            toast.success('Cập nhật thông tin thành công!');
        } catch (err) { toast.error(err.response?.data?.message || 'Cập nhật thất bại'); }
        finally { setLoading(false); }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) return toast.error('Mật khẩu không khớp');
        if (passwords.newPassword.length < 6) return toast.error('Mật khẩu tối thiểu 6 ký tự');
        setLoading(true);
        try {
            await authApi.changePassword(passwords.newPassword);
            toast.success('Đổi mật khẩu thành công!');
            setPasswords({ newPassword: '', confirmPassword: '' });
        } catch (err) { toast.error(err.response?.data?.message || 'Đổi mật khẩu thất bại'); }
        finally { setLoading(false); }
    };

    const InputField = ({ label, icon: Icon, name, type = 'text', value, onChange, disabled, placeholder }) => (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type={type} name={name} value={value} onChange={onChange} disabled={disabled}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                        disabled ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed' : 'border-slate-200 bg-white'
                    }`} />
            </div>
        </div>
    );

    const initials = profile.fullName?.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase() || 'U';

    return (
        <div className="max-w-3xl mx-auto py-6">
            {/* Profile header */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white flex items-center gap-5">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
                    {initials}
                </div>
                <div>
                    <h1 className="text-xl font-bold">{profile.fullName || 'Người dùng'}</h1>
                    <p className="text-blue-200 text-sm">{profile.email}</p>
                    <span className="mt-1 inline-block bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full">
                        {user?.role === 'ADMIN' ? '⭐ Admin' : '👤 Thành viên'}
                    </span>
                </div>
                <button onClick={() => { logout(); navigate('/'); toast.success('Đã đăng xuất'); }}
                    className="ml-auto flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    Đăng xuất
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1">
                {[
                    { key: 'profile', icon: UserCircleIcon, label: 'Thông tin' },
                    { key: 'password', icon: LockClosedIcon, label: 'Đổi mật khẩu' },
                ].map(({ key, icon: Icon, label }) => (
                    <button key={key} onClick={() => setActiveTab(key)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            activeTab === key
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}>
                        <Icon className="h-4 w-4" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Profile tab */}
            {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                        <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                        Thông tin cá nhân
                    </h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <InputField label="Họ và tên" icon={UserCircleIcon} name="fullName"
                            value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                            placeholder="Nguyễn Văn A" />
                        <InputField label="Email" icon={EnvelopeIcon} name="email"
                            value={profile.email} disabled placeholder="" />
                        <InputField label="Số điện thoại" icon={PhoneIcon} name="phone" type="tel"
                            value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })}
                            placeholder="0901234567" />
                        <InputField label="Địa chỉ" icon={MapPinIcon} name="address"
                            value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })}
                            placeholder="123 Đường ABC, Quận 1, TP.HCM" />
                        <div className="pt-2">
                            <button type="submit" disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-blue-100 text-sm">
                                {loading ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Password tab */}
            {activeTab === 'password' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                        <LockClosedIcon className="h-5 w-5 text-blue-600" />
                        Đổi mật khẩu
                    </h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mật khẩu mới</label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input type="password" name="newPassword" required value={passwords.newPassword}
                                    onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
                                    placeholder="Ít nhất 6 ký tự"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Xác nhận mật khẩu</label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input type="password" name="confirmPassword" required value={passwords.confirmPassword}
                                    onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                    placeholder="Nhập lại mật khẩu"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>
                        </div>
                        <div className="pt-2">
                            <button type="submit" disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-blue-100 text-sm">
                                {loading ? 'Đang xử lý...' : '🔐 Đổi mật khẩu'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="mt-4 text-center">
                <Link to="/orders" className="text-sm text-blue-600 hover:underline font-medium">
                    📦 Xem đơn hàng của tôi →
                </Link>
            </div>
        </div>
    );
};

export default ProfilePage;
