import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import variantApi from '../../api/variantApi';
import productApi from '../../api/productApi';
import { toast } from 'react-toastify';
import { 
    PlusIcon, PencilSquareIcon, TrashIcon, 
    ArrowLeftIcon, AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/outline';
import Button from '../../components/Button';
import Input from '../../components/Input';

const AdminProductVariantManager = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingVariant, setEditingVariant] = useState(null);
    
    const [formData, setFormData] = useState({
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
        fetchData();
    }, [productId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [prodRes, varRes] = await Promise.all([
                productApi.getById(productId),
                variantApi.getByProductId(productId)
            ]);
            setProduct(prodRes?.result || prodRes);
            setVariants(varRes?.result || varRes || []);
        } catch (error) {
            toast.error("Không thể tải thông tin");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (v = null) => {
        if (v) {
            setEditingVariant(v);
            setFormData({
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
        try {
            const data = { ...formData, productId: parseInt(productId) };
            if (editingVariant) {
                await variantApi.update(editingVariant.id, data);
                toast.success("Cập nhật biến thể thành công");
            } else {
                await variantApi.create(data);
                toast.success("Thêm biến thể thành công");
            }
            setShowModal(false);
            fetchData();
        } catch (error) {
            toast.error("Lỗi khi lưu dữ liệu");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa biến thể này?")) return;
        try {
            await variantApi.delete(id);
            toast.success("Đã xóa biến thể");
            fetchData();
        } catch (error) {
            toast.error("Không thể xóa biến thể");
        }
    };

    if (loading) return <div className="p-8">Đang tải...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/products')} className="p-2 hover:bg-slate-100 rounded-lg">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Quản lý cấu hình biến thể</h1>
                        <p className="text-sm text-slate-500">Sản phẩm: <span className="font-semibold text-blue-600">{product?.name}</span></p>
                    </div>
                </div>
                <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" /> Thêm cấu hình mới
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Thông số</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Cấu hình chi tiết</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Giá bán</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Kho</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {variants.length === 0 ? (
                            <tr><td colSpan={5} className="py-10 text-center text-slate-400">Chưa có biến thể nào</td></tr>
                        ) : variants.map(v => (
                            <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-slate-900">{v.specifications}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-xs space-y-1 text-slate-500">
                                        <p><span className="font-medium text-slate-700">CPU:</span> {v.cpu || 'N/A'}</p>
                                        <p><span className="font-medium text-slate-700">RAM:</span> {v.ram || 'N/A'}</p>
                                        <p><span className="font-medium text-slate-700">SSD:</span> {v.storage || 'N/A'}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-blue-600">{v.price?.toLocaleString()}đ</p>
                                    {v.salePrice && <p className="text-xs text-red-500 line-through">{v.salePrice?.toLocaleString()}đ</p>}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${v.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {v.stock} bản
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleOpenModal(v)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                            <PencilSquareIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(v.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingVariant ? 'Chỉnh sửa cấu hình' : 'Thêm cấu hình mới'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

export default AdminProductVariantManager;
