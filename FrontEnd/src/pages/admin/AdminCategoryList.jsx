import { useEffect, useState } from 'react';
import categoryApi from '../../api/categoryApi';
import { toast } from 'react-toastify';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from '../../components/Pagination';

const AdminCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [showModal, setShowModal] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [form, setForm] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchCategories();
    }, [currentPage, pageSize, sortBy, sortDir]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await categoryApi.getAllPaged({
                page: currentPage,
                size: pageSize,
                sortBy,
                sortDir,
            });
            const data = response?.result || response;
            setCategories(data?.content || []);
            setTotalPages(data?.totalPages || 0);
            setTotalElements(data?.totalElements || 0);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh mục");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editCategory) {
                await categoryApi.update(editCategory.id, form);
                toast.success("Cập nhật danh mục thành công");
            } else {
                await categoryApi.create(form);
                toast.success("Tạo danh mục thành công");
            }
            setShowModal(false);
            setEditCategory(null);
            setForm({ name: '', description: '' });
            fetchCategories();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    const handleEdit = (cat) => {
        setEditCategory(cat);
        setForm({ name: cat.name, description: cat.description || '' });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
        try {
            await categoryApi.delete(id);
            toast.success("Đã xóa danh mục");
            fetchCategories();
        } catch (error) {
            toast.error("Không thể xóa danh mục");
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDir('asc');
        }
        setCurrentPage(0);
    };

    const getSortIcon = (field) => {
        if (sortBy !== field) return '↕';
        return sortDir === 'asc' ? '↑' : '↓';
    };

    if (loading && categories.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Quản lý danh mục</h1>
                <button
                    onClick={() => { setShowModal(true); setEditCategory(null); setForm({ name: '', description: '' }); }}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <PlusIcon className="h-5 w-5" /> Thêm danh mục
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600" onClick={() => handleSort('id')}>
                                    ID {getSortIcon('id')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600" onClick={() => handleSort('name')}>
                                    Tên {getSortIcon('name')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Mô tả</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-slate-900">{cat.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{cat.name}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500 max-w-[300px] truncate">{cat.description}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleEdit(cat)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                <PencilSquareIcon className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {categories.length === 0 && !loading && (
                    <div className="text-center py-12 text-slate-500">Không có danh mục nào</div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(0); }}
                />
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                            {editCategory ? 'Sửa danh mục' : 'Thêm danh mục'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tên danh mục</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    rows="3"
                                />
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); setEditCategory(null); }}
                                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    {editCategory ? 'Cập nhật' : 'Tạo mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategoryList;
