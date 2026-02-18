import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productApi from '../../api/productApi';
import categoryApi from '../../api/categoryApi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';

const AdminProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        description: '',
        specifications: '',
        price: '',
        salePrice: '',
        stock: '',
        brand: '',
        cpu: '',
        ram: '',
        storage: '',
        screen: '',
        status: 'ACTIVE',
        image: null,
    });

    useEffect(() => {
        fetchCategories();
        if (isEditing) {
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const response = await categoryApi.getAll();
            let categoriesData = response?.result || response || [];

            console.log("📋 RAW API Response:", response);
            console.log("📋 Categories extracted:", categoriesData);


            if (categoriesData && typeof categoriesData === 'object' && !Array.isArray(categoriesData)) {
                console.log("⚠️ Categories is not an array, attempting to extract...");
                categoriesData = categoriesData.result || categoriesData.data || [];
            }


            if (!Array.isArray(categoriesData)) {
                console.error("❌ Categories is not an array:", categoriesData);
                categoriesData = [];
            }


            const normalizedCategories = categoriesData.map((cat, index) => {

                const categoryId = cat.id || cat.categoryId || cat.ID || cat.CategoryId;

                if (!categoryId && index === 0) {
                    console.error("❌ Category missing ID! Available keys:", Object.keys(cat));
                    console.error("❌ Full category object:", cat);
                }

                return {
                    ...cat,
                    id: categoryId, // Ensure 'id' field exists
                    name: cat.name || cat.categoryName || cat.Name
                };
            });

            console.log("✅ Normalized categories:", normalizedCategories.map(c => ({ id: c.id, name: c.name })));

            setCategories(normalizedCategories);
        } catch (error) {
            console.error("❌ Failed to load categories:", error);
            toast.error("Không thể tải danh mục");
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await productApi.getById(id);
            const product = response?.result || response;
            setFormData({
                name: product.name || '',
                categoryId: product.categoryId || product.category?.id || '',
                description: product.description || '',
                specifications: product.specifications || '',
                price: product.price || '',
                salePrice: product.salePrice || '',
                stock: product.stock || '',
                brand: product.brand || '',
                cpu: product.cpu || '',
                ram: product.ram || '',
                storage: product.storage || '',
                screen: product.screen || '',
                status: product.status || 'ACTIVE',
                image: null,
            });
            if (product.imageUrl) {
                setImagePreview(product.imageUrl);
            }
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải thông tin sản phẩm");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`📝 Form field changed: ${name} = ${value}`);
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("🖼️ Image selected:", file.name);
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("=== FORM SUBMIT STARTED ===");
        console.log("Form Data:", formData);


        if (!formData.categoryId || formData.categoryId === '') {
            console.error("❌ Category validation failed");
            toast.error("Vui lòng chọn danh mục sản phẩm");
            return;
        }


        const priceNum = parseFloat(formData.price);
        console.log("Price:", formData.price, "Parsed:", priceNum, "IsNaN:", isNaN(priceNum));

        if (!formData.price || isNaN(priceNum) || priceNum <= 0) {
            console.error("❌ Price validation failed");
            toast.error("Vui lòng nhập giá sản phẩm hợp lệ");
            return;
        }

        console.log("✅ Validation passed, creating FormData...");
        setLoading(true);

        try {

            const data = new FormData();
            data.append('name', formData.name);

            data.append('categoryName', formData.categoryId); // categoryId field contains the name now
            data.append('description', formData.description || '');
            data.append('specifications', formData.specifications || '');
            data.append('price', priceNum);


            if (formData.salePrice) {
                const salePriceNum = parseFloat(formData.salePrice);
                if (!isNaN(salePriceNum) && salePriceNum > 0) {
                    data.append('salePrice', salePriceNum);
                }
            }


            const stockNum = parseInt(formData.stock || 0, 10);
            data.append('stock', isNaN(stockNum) ? 0 : stockNum);

            data.append('brand', formData.brand || '');
            data.append('cpu', formData.cpu || '');
            data.append('ram', formData.ram || '');
            data.append('storage', formData.storage || '');
            data.append('screen', formData.screen || '');
            data.append('status', formData.status);

            if (formData.image) {
                console.log("📷 Adding image:", formData.image.name);
                data.append('imageFile', formData.image);
            }


            console.log("📦 FormData contents:");
            for (let [key, value] of data.entries()) {
                console.log(`  ${key}:`, value);
            }


            if (isEditing) {
                console.log("🔄 Updating product with ID:", id);
                await productApi.update(id, data);
                toast.success("Cập nhật sản phẩm thành công!");
            } else {
                console.log("➕ Creating new product...");
                const response = await productApi.create(data);
                console.log("✅ Product created successfully:", response);
                toast.success("Tạo sản phẩm thành công!");
            }
            navigate('/admin/products');
        } catch (error) {
            console.error("❌ Error submitting product:", error);
            console.error("Error response:", error.response?.data);
            toast.error(error.response?.data?.message || "Lỗi khi lưu sản phẩm");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate('/admin/products')}
                    className="mr-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
                </button>
                <h1 className="text-2xl font-bold text-slate-900">
                    {isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                </h1>

                <button
                    type="button"
                    onClick={() => {
                        console.log("🔍 DEBUG - Current formData:", formData);
                        console.log("🔍 DEBUG - Categories:", categories);
                    }}
                    className="ml-auto px-3 py-1 text-xs bg-gray-200 rounded"
                >
                    Debug Console
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Thông tin cơ bản</h2>
                            <div className="space-y-4">
                                <Input
                                    label="Tên sản phẩm *"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="VD: MacBook Pro 14 M3"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Danh mục *
                                            <span className="ml-2 text-xs text-gray-500">
                                                ({categories.length} danh mục)
                                            </span>
                                        </label>
                                        <select
                                            name="categoryId"
                                            value={formData.categoryId}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                        >
                                            <option value="">Chọn danh mục</option>
                                            {categories.map((cat, idx) => {

                                                return (
                                                    <option key={cat.id || `cat-${idx}`} value={cat.name}>
                                                        {cat.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <Input
                                        label="Thương hiệu"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        placeholder="VD: Apple"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                        placeholder="Mô tả chi tiết sản phẩm..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Thông số kỹ thuật</label>
                                    <textarea
                                        name="specifications"
                                        value={formData.specifications}
                                        onChange={handleChange}
                                        rows={2}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                        placeholder="VD: Chip M3, 18GB RAM, 512GB SSD"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Thông số chi tiết</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="CPU" name="cpu" value={formData.cpu} onChange={handleChange} placeholder="VD: Intel Core i7" />
                                <Input label="RAM" name="ram" value={formData.ram} onChange={handleChange} placeholder="VD: 16GB DDR5" />
                                <Input label="Bộ nhớ" name="storage" value={formData.storage} onChange={handleChange} placeholder="VD: 512GB SSD" />
                                <Input label="Màn hình" name="screen" value={formData.screen} onChange={handleChange} placeholder="VD: 14 inch Retina" />
                            </div>
                        </div>
                    </div>


                    <div className="space-y-6">

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Hình ảnh</h2>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors">
                                {imagePreview ? (
                                    <div className="relative">
                                        <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={() => { setImagePreview(null); setFormData({ ...formData, image: null }); }}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div className="py-8">
                                        <PhotoIcon className="h-12 w-12 mx-auto text-slate-300 mb-2" />
                                        <p className="text-sm text-slate-500">Chọn hình ảnh</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-4 text-sm"
                                />
                            </div>
                        </div>


                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Giá & Kho</h2>
                            <div className="space-y-4">
                                <Input
                                    label="Giá bán (VNĐ) *"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="VD: 25000000"
                                />
                                <Input
                                    label="Giá khuyến mãi (VNĐ)"
                                    name="salePrice"
                                    type="number"
                                    value={formData.salePrice}
                                    onChange={handleChange}
                                    placeholder="Để trống nếu không KM"
                                />
                                <Input
                                    label="Số lượng trong kho"
                                    name="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                    >
                                        <option value="ACTIVE">Còn hàng</option>
                                        <option value="OUT_OF_STOCK">Hết hàng</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="flex space-x-3">
                            <Button
                                type="button"
                                variant="secondary"
                                className="flex-1"
                                onClick={() => navigate('/admin/products')}
                            >
                                Hủy
                            </Button>
                            <Button type="submit" className="flex-1" disabled={loading}>
                                {loading ? 'Đang lưu...' : (isEditing ? 'Cập nhật' : 'Tạo mới')}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminProductForm;
