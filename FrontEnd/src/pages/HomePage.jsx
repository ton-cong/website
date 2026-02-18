import { useEffect, useState } from 'react';
import productApi from '../api/productApi';
import categoryApi from '../api/categoryApi';
import ProductCard from '../components/ProductCard';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                productApi.getAll(),
                categoryApi.getAll()
            ]);
            const productsData = productsRes?.result?.content || productsRes?.content || productsRes?.result || productsRes || [];
            const categoriesData = categoriesRes?.result || categoriesRes || [];

            console.log("Products loaded:", productsData);
            console.log("Categories loaded:", categoriesData);

            setProducts(Array.isArray(productsData) ? productsData : []);
            setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = !selectedCategory ||
            p.categoryId === selectedCategory ||
            p.category?.id === selectedCategory ||
            p.categoryName === categories.find(c => c.id === selectedCategory)?.name;

        const price = p.price || 0;
        const matchesMinPrice = !priceRange.min || price >= Number(priceRange.min);
        const matchesMaxPrice = !priceRange.max || price <= Number(priceRange.max);

        return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return (a.price || 0) - (b.price || 0);
            case 'price-desc':
                return (b.price || 0) - (a.price || 0);
            case 'name':
                return (a.name || '').localeCompare(b.name || '');
            default:
                return (b.id || 0) - (a.id || 0); // newest first
        }
    });

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory(null);
        setPriceRange({ min: '', max: '' });
        setSortBy('newest');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="flex gap-8">


            <aside className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Bộ lọc</h2>
                        <button onClick={clearFilters} className="text-sm text-indigo-600 hover:underline">
                            Xóa lọc
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Danh mục</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                Tất cả sản phẩm
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.id
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Khoảng giá</h3>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Từ"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-indigo-500 outline-none"
                            />
                            <input
                                type="number"
                                placeholder="Đến"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Sắp xếp</h3>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-indigo-500 outline-none"
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="price-asc">Giá: Thấp → Cao</option>
                            <option value="price-desc">Giá: Cao → Thấp</option>
                            <option value="name">Tên A-Z</option>
                        </select>
                    </div>
                </div>
            </aside>

            <main className="flex-1">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                {selectedCategory
                                    ? categories.find(c => c.id === selectedCategory)?.name
                                    : 'Tất cả sản phẩm'}
                            </h1>
                            <p className="text-slate-500">{sortedProducts.length} sản phẩm</p>
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm"
                        >
                            <FunnelIcon className="h-4 w-4" />
                            Bộ lọc
                        </button>
                    </div>

                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                <XMarkIcon className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                            </button>
                        )}
                    </div>
                </div>

                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sortedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                        <div className="text-slate-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Không tìm thấy sản phẩm</h3>
                        <p className="text-slate-500 mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        <button
                            onClick={clearFilters}
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Xóa tất cả bộ lọc
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;
