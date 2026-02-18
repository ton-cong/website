import { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { TrashIcon, UserCircleIcon, ShieldCheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await adminApi.getAllUsers();
            setUsers(response?.result || response || []);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh sách người dùng");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, email) => {
        if (!window.confirm(`Bạn có chắc muốn xóa người dùng "${email}"?`)) return;
        try {
            await adminApi.deleteUser(id);
            toast.success("Đã xóa người dùng");
            fetchUsers();
        } catch (error) {
            toast.error("Không thể xóa người dùng");
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            await adminApi.updateUser(id, { role: newRole });
            toast.success("Đã cập nhật vai trò");
            fetchUsers();
        } catch (error) {
            toast.error("Không thể cập nhật vai trò");
        }
    };


    const filteredUsers = users.filter(user => {
        const matchSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
        const userRole = user.role;
        const matchRole = !filterRole || userRole === filterRole;
        return matchSearch && matchRole;
    });

    const getRoleBadge = (role) => {
        if (role === 'ADMIN') {
            return (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <ShieldCheckIcon className="h-3 w-3 mr-1" />
                    Admin
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <UserCircleIcon className="h-3 w-3 mr-1" />
                User
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Quản lý người dùng</h1>
            </div>


            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                    <p className="text-3xl font-bold text-slate-900">{users.length}</p>
                    <p className="text-sm text-slate-500">Tổng người dùng</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                    <p className="text-3xl font-bold text-purple-600">
                        {users.filter(u => u.role === 'ADMIN').length}
                    </p>
                    <p className="text-sm text-slate-500">Admin</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                    <p className="text-3xl font-bold text-blue-600">
                        {users.filter(u => u.role === 'USER').length}
                    </p>
                    <p className="text-sm text-slate-500">User</p>
                </div>
            </div>


            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo email hoặc tên..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                            />
                        </div>
                    </div>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    >
                        <option value="">Tất cả vai trò</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </div>
            </div>


            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Vai trò</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Thay đổi vai trò</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        #{user.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                {user.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-slate-900">{user.fullName || 'Chưa có tên'}</p>
                                                <p className="text-sm text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getRoleBadge(user.role)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="px-3 py-1 border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                        >
                                            <option value="USER">User</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(user.id, user.email)}
                                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Xóa người dùng"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        {searchTerm || filterRole ? 'Không tìm thấy người dùng phù hợp' : 'Chưa có người dùng nào'}
                    </div>
                )}
            </div>

            <div className="mt-4 text-sm text-slate-500">
                Hiển thị {filteredUsers.length} / {users.length} người dùng
            </div>
        </div>
    );
};

export default AdminUserList;
