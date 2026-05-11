import { useEffect, useState } from 'react';
import productApi from '../../api/productApi';
import variantApi from '../../api/variantApi';
import { toast } from 'react-toastify';
import { PencilSquareIcon, TrashIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

const AdminVariantList = () => {
    const navigate = useNavigate();
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingVariant, setEditingVariant] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const [formData, setFormData] = useState({
        productId: '',
        specifications: '',
        price: '',
        salePrice: '',
        stock: '',
        cpu: '',
        ram: '',
        storage: '',
        screen: ''
    });

    useEffect(() => {
        fetchVariants();
    }, [currentPage, pageSize]);

    const fetchVariants = async () => {
        try {
            setLoading(true);
            const response = await productApi.search({
                keyword: search.trim() || undefined,
                page: currentPage,
                size: pageSize,
                sortBy: 'id',
                sortDir: 'desc'
            });
            
            const products = response?.result?.content || response?.content || [];
            const allVariants = [];
            products.forEach(p => {
                if (p.variants && p.variants.length > 0) {
                    p.variants.forEach(v => {
                        allVariants.push({
                            ...v,
                            productName: p.name,
                            productImageUrl: p.imageUrl,
                            productId: p.id
                        });
                    });
                }
            });

            setVariants(allVariants);
            setTotalPages(response?.result?.totalPages || response?.totalPages || 0);
            setTotalElements(response?.result?.totalElements || response?.totalElements || 0);
        } catch (error) {
            toast.error("Không thể tải danh sách biến thể");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchVariants();
    };

    const fetchAllProducts = async () => {
        try {
            setLoadingProducts(true);
            const res = await productApi.getAll({ page: 0, size: 1000 });
            setAllProducts(res?.result?.content || res?.content || []);
        } catch (error) {
            toast.error("Không thể tải danh sách sản phẩm");
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleOpenModal = async (v = null) => {
        if (allProducts.length === 0) {
            await fetchAllProducts();
        }
        if (v) {
            setEditingVariant(v);
            setFormData({
                productId: v.productId || '',
                specifications: v.specifications || '',
                price: v.price || '',
                salePrice: v.salePrice || '',
                stock: v.stock || '',
                cpu: v.cpu || '',
                ram: v.ram || '',
                storage: v.storage || '',
                screen: v.screen || ''
            });
        } else {
            setEditingVariant(null);
            setFormData({
                productId: '',
                specifications: '',
                price: '',
                salePrice: '',
                stock: '',
                cpu: '',
                ram: '',
                storage: '',
                screen: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.productId) {
            toast.error("Vui lòng chọn sản phẩm");
            return;
        }
        try {
            const data = { ...formData, productId: parseInt(formData.productId) };
            if (editingVariant) {
                await variantApi.update(editingVariant.id, data);
                toast.success("Cập nhật biến thể thành công");
            } else {
                await variantApi.create(data);
                toast.success("Thêm biến thể thành công");
            }
            setShowModal(false);
            fetchVariants();
        } catch (error) {
            toast.error("Lỗi khi lưu dữ liệu");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa biến thể này?")) return;
        try {
            await variantApi.delete(id);
            toast.success("Đã xóa biến thể");
            fetchVariants();
        } catch (error) {
            toast.error("Không thể xóa biến thể");
        }
    };

    if (loading && variants.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Quản lý biến thể cấu hình</h1>
                <div className="flex flex-wrap items-center gap-3">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm theo tên sản phẩm..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                            />
                        </div>
                    </form>
                    <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" /> Thêm biến thể
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sản phẩm</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Cấu hình</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Giá bán</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kho</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {variants.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                        Không tìm thấy biến thể nào.
                                    </td>
                                </tr>
                            ) : variants.map((variant) => (
                                <tr key={variant.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-slate-900">{variant.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={variant.productImageUrl || 'https://via.placeholder.com/40'} alt="" className="w-8 h-8 rounded object-cover" />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">{variant.productName}</p>
                                                <p className="text-xs text-slate-400">ID Sản phẩm: {variant.productId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-indigo-600">{variant.specifications}</span>
                                            <span className="text-[10px] text-slate-400">
                                                {variant.cpu && `CPU: ${variant.cpu}`} 
                                                {variant.ram && ` | RAM: ${variant.ram}`}
                                                {variant.storage && ` | SSD: ${variant.storage}`}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-900">{variant.price?.toLocaleString()}đ</p>
                                        {variant.salePrice && (
                                            <p className="text-xs text-red-500 line-through">{variant.salePrice?.toLocaleString()}đ</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                            variant.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                            {variant.stock} cái
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(variant)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Sửa cấu hình biến thể"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(variant.id)} 
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Xóa biến thể"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    pageSize={pageSize}
                    onPageChange={(p) => setCurrentPage(p)}
                    onPageSizeChange={(s) => { setPageSize(s); setCurrentPage(0); }}
                />
            </div>

            {/* Modal thêm/sửa biến thể */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingVariant ? 'Chỉnh sửa biến thể' : 'Thêm biến thể mới'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Thuộc về sản phẩm *
                                </label>
                                <select
                                    value={formData.productId}
                                    onChange={e => setFormData({...formData, productId: e.target.value})}
                                    required
                                    disabled={!!editingVariant} // Disable editing product if it's already created
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none disabled:bg-slate-100"
                                >
                                    <option value="">-- Chọn sản phẩm --</option>
                                    {loadingProducts ? (
                                        <option value="" disabled>Đang tải danh sách...</option>
                                    ) : (
                                        allProducts.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input label="CPU" value={formData.cpu} onChange={e => setFormData({...formData, cpu: e.target.value})} placeholder="VD: i7-13700H" />
                                <Input label="RAM" value={formData.ram} onChange={e => setFormData({...formData, ram: e.target.value})} placeholder="VD: 16GB" />
                                <Input label="Ổ cứng" value={formData.storage} onChange={e => setFormData({...formData, storage: e.target.value})} placeholder="VD: 512GB" />
                                <Input label="Màn hình" value={formData.screen} onChange={e => setFormData({...formData, screen: e.target.value})} placeholder="VD: 14 inch OLED" />
                            </div>
                            <Input label="Tóm tắt cấu hình *" value={formData.specifications} onChange={e => setFormData({...formData, specifications: e.target.value})} required placeholder="VD: i7 | 16GB | 512GB" />
                            
                            <div className="grid grid-cols-3 gap-4">
                                <Input label="Giá bán *" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                                <Input label="Giá KM" type="number" value={formData.salePrice} onChange={e => setFormData({...formData, salePrice: e.target.value})} />
                                <Input label="Tồn kho *" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
                                <Button type="submit">{editingVariant ? 'Cập nhật' : 'Thêm mới'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVariantList;

