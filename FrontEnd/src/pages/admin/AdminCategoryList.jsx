import { useEffect, useState } from 'react';
import categoryApi from '../../api/categoryApi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import { TrashIcon, PencilSquareIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AdminCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await categoryApi.getAll();
            setCategories(response?.result || response || []);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh sách danh mục");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({ name: category.name || '', description: category.description || '' });
        } else {
            setEditingCategory(null);
            setFormData({ name: '', description: '' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error("Vui lòng nhập tên danh mục");
            return;
        }

        try {
            if (editingCategory) {
                await categoryApi.update(editingCategory.id, formData);
                toast.success("Cập nhật danh mục thành công");
            } else {
                await categoryApi.create(formData);
                toast.success("Tạo danh mục thành công");
            }
            handleCloseModal();
            fetchCategories();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Lỗi khi lưu danh mục");
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Bạn có chắc muốn xóa danh mục "${name}"?\nCác sản phẩm thuộc danh mục này có thể bị ảnh hưởng.`)) return;
        try {
            await categoryApi.delete(id);
            toast.success("Đã xóa danh mục");
            fetchCategories();
        } catch (error) {
            toast.error("Không thể xóa danh mục. Có thể còn sản phẩm thuộc danh mục này.");
        }
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
                <h1 className="text-2xl font-bold text-slate-900">Quản lý danh mục</h1>
                <Button onClick={() => handleOpenModal()} className="flex items-center">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Thêm danh mục
                </Button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                                <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                                    {category.description || 'Chưa có mô tả'}
                                </p>
                            </div>
                            <div className="flex space-x-1 ml-4">
                                <button
                                    onClick={() => handleOpenModal(category)}
                                    className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                                    title="Sửa"
                                >
                                    <PencilSquareIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id, category.name)}
                                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Xóa"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <span className="text-xs text-slate-400">ID: {category.id}</span>
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center text-slate-500">
                    <p>Chưa có danh mục nào</p>
                    <Button onClick={() => handleOpenModal()} className="mt-4">
                        Tạo danh mục đầu tiên
                    </Button>
                </div>
            )}

            <div className="mt-4 text-sm text-slate-500">
                Tổng: {categories.length} danh mục
            </div>


            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 animate-fade-in-up">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">
                                {editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}
                            </h2>
                            <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <Input
                                label="Tên danh mục *"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="VD: Laptop Gaming"
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                    placeholder="Mô tả danh mục..."
                                />
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <Button type="button" variant="secondary" className="flex-1" onClick={handleCloseModal}>
                                    Hủy
                                </Button>
                                <Button type="submit" className="flex-1">
                                    {editingCategory ? 'Cập nhật' : 'Tạo mới'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategoryList;
