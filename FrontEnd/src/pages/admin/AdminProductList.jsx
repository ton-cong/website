import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productApi from '../../api/productApi';
import categoryApi from '../../api/categoryApi';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { TrashIcon, PencilSquareIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productApi.getAll();
            const data = response?.result?.content || response?.content || response?.result || response || [];
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh sách sản phẩm");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryApi.getAll();
            setCategories(response?.result || response || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Bạn có chắc muốn xóa sản phẩm "${name}"?`)) return;
        try {
            await productApi.delete(id);
            toast.success("Đã xóa sản phẩm");
            fetchProducts();
        } catch (error) {
            toast.error("Không thể xóa sản phẩm");
        }
    };


    const filteredProducts = products.filter(product => {
        const matchSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = !filterCategory || product.categoryId == filterCategory ||
            product.category?.id == filterCategory ||
            product.category?.name === filterCategory;
        return matchSearch && matchCategory;
    });

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
                <h1 className="text-2xl font-bold text-slate-900">Quản lý sản phẩm</h1>
                <Link to="/admin/products/create">
                    <Button className="flex items-center">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Thêm sản phẩm
                    </Button>
                </Link>
            </div>


            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                            />
                        </div>
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map((cat, idx) => (
                            <option key={cat.id || idx} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>


            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Hình ảnh</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Tên sản phẩm</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Danh mục</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Giá</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Kho</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Trạng thái</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={product.imageUrl || 'https://via.placeholder.com/50'}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-slate-900">{product.name}</div>
                                        <div className="text-sm text-slate-500">{product.brand}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {product.category?.name || product.categoryName || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-900">
                                            {product.price?.toLocaleString()}đ
                                        </div>
                                        {product.salePrice && (
                                            <div className="text-sm text-red-500">
                                                Sale: {product.salePrice?.toLocaleString()}đ
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {product.stock || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'AVAILABLE' || product.status === 'available'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.status === 'AVAILABLE' || product.status === 'available' ? 'Còn hàng' : 'Hết hàng'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <Link
                                                to={`/admin/products/edit/${product.id}`}
                                                className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        {searchTerm || filterCategory ? 'Không tìm thấy sản phẩm phù hợp' : 'Chưa có sản phẩm nào'}
                    </div>
                )}
            </div>

            <div className="mt-4 text-sm text-slate-500">
                Hiển thị {filteredProducts.length} / {products.length} sản phẩm
            </div>
        </div>
    );
};

export default AdminProductList;
