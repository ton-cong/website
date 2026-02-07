import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import adminApi from '../api/adminApi';
import authApi from '../api/authApi';
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
    });

    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        // Fetch user data from API if available, otherwise use context
        if (user) {
            fetchUserProfile();
        }
    }, [isAuthenticated, user]);

    const fetchUserProfile = async () => {
        try {
            // If we have user id, fetch full profile from admin API
            if (user?.id) {
                const response = await adminApi.getUserById(user.id);
                const userData = response?.result || response;
                setProfile({
                    fullName: userData.fullName || '',
                    email: userData.email || user.email || '',
                    phone: userData.phone || '',
                    address: userData.address || '',
                });
            } else {
                // Fallback to context data
                setProfile({
                    fullName: user.fullName || user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    address: user.address || '',
                });
            }
        } catch (error) {
            // Fallback to context data on error
            setProfile({
                fullName: user.fullName || user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
            });
        }
    };

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Call API to update user profile
            await adminApi.updateUser(user.id, {
                fullName: profile.fullName,
                phone: profile.phone,
                address: profile.address,
            });
            toast.success("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Update profile error:", error);
            toast.error(error.response?.data?.message || "Cập nhật thất bại");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp");
            return;
        }
        if (passwords.newPassword.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }
        setLoading(true);
        try {
            // Backend expects: { pass: "newPassword" }
            await authApi.changePassword(passwords.newPassword);
            toast.success("Đổi mật khẩu thành công!");
            setPasswords({ newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || "Đổi mật khẩu thất bại");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success("Đã đăng xuất");
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Tài khoản của tôi</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`pb-3 px-1 font-medium transition-colors ${activeTab === 'profile'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Thông tin cá nhân
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`pb-3 px-1 font-medium transition-colors ${activeTab === 'password'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Đổi mật khẩu
                </button>
            </div>

            {activeTab === 'profile' && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <Input
                            label="Họ và tên"
                            name="fullName"
                            value={profile.fullName}
                            onChange={handleProfileChange}
                            placeholder="Nhập họ và tên"
                        />
                        <Input
                            label="Email"
                            name="email"
                            value={profile.email}
                            disabled
                            className="bg-slate-50"
                        />
                        <Input
                            label="Số điện thoại"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            placeholder="Nhập số điện thoại"
                        />
                        <Input
                            label="Địa chỉ"
                            name="address"
                            value={profile.address}
                            onChange={handleProfileChange}
                            placeholder="Nhập địa chỉ"
                        />
                        <div className="flex gap-4 pt-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </Button>
                            <Button type="button" variant="secondary" onClick={handleLogout}>
                                Đăng xuất
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'password' && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <Input
                            label="Mật khẩu mới"
                            name="newPassword"
                            type="password"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                            required
                        />
                        <Input
                            label="Xác nhận mật khẩu mới"
                            name="confirmPassword"
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Nhập lại mật khẩu mới"
                            required
                        />
                        <Button type="submit" disabled={loading} className="mt-4">
                            {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
