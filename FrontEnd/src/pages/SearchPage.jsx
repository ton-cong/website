import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productApi from '../api/productApi';
import categoryApi from '../api/categoryApi';
import { toast } from 'react-toastify';
import {
    ShoppingCartIcon, ChevronDownIcon, ChevronUpIcon,
    XMarkIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Pagination from '../components/Pagination';

const RAM_OPTIONS = ['4GB', '8GB', '16GB', '32GB', '64GB'];
const STORAGE_OPTIONS = ['256GB', '512GB', '1TB', '2TB', '4TB'];
const CPU_OPTIONS = [
    'Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9',
    'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9',
    'Apple M1', 'Apple M2', 'Apple M3'
];
const PRICE_PRESETS = [
    { label: 'Dưới 10 triệu', min: null, max: 10_000_000 },
    { label: '10 – 20 triệu', min: 10_000_000, max: 20_000_000 },
    { label: '20 – 30 triệu', min: 20_000_000, max: 30_000_000 },
    { label: '30 – 50 triệu', min: 30_000_000, max: 50_000_000 },
    { label: 'Trên 50 triệu', min: 50_000_000, max: null },
];

const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-slate-100 pb-4 mb-4">
            <button onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full mb-3 text-left">
                <span className="font-semibold text-slate-800 text-sm">{title}</span>
                {open ? <ChevronUpIcon className="h-4 w-4 text-slate-400" /> : <ChevronDownIcon className="h-4 w-4 text-slate-400" />}
            </button>
            {open && children}
        </div>
    );
};

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const pageSize = 12;

    // Lọc từ URL params
    const keyword = searchParams.get('search') || '';
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCpu, setSelectedCpu] = useState('');
    const [selectedRam, setSelectedRam] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');
    const [appliedMin, setAppliedMin] = useState(null);
    const [appliedMax, setAppliedMax] = useState(null);
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'id');
    const [sortDir, setSortDir] = useState(searchParams.get('sortDir') || 'asc');
    const [localSearch, setLocalSearch] = useState(keyword);

    useEffect(() => { fetchCategories(); fetchBrands(); }, []);

    // Khi URL category thay đổi (từ Navbar)
    useEffect(() => {
        const cat = searchParams.get('category') || '';
        setSelectedCategory(cat);
    }, [searchParams]);

    // Khi filter thay đổi: reset page=0 và fetch
    useEffect(() => {
        setCurrentPage(0);
        fetchProducts(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, selectedCategory, selectedBrand, selectedCpu, selectedRam, selectedStorage, appliedMin, appliedMax, sortBy, sortDir]);

    // Khi chỉ đổi trang
    useEffect(() => {
        if (currentPage !== 0) fetchProducts(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchCategories = async () => {
        try { const r = await categoryApi.getAll(); setCategories(r?.result || r || []); } catch { }
    };
    const fetchBrands = async () => {
        try { const r = await productApi.getFilterOptions(); setBrands(r?.brands || r?.result?.brands || []); } catch { }
    };

    const fetchProducts = async (pageOverride) => {
        const page = pageOverride !== undefined ? pageOverride : currentPage;
        try {
            setLoading(true);
            const res = await productApi.search({
                keyword: keyword || undefined,
                categoryId: selectedCategory || undefined,
                brand: selectedBrand || undefined,
                cpu: selectedCpu || undefined,
                ram: selectedRam || undefined,
                storage: selectedStorage || undefined,
                minPrice: appliedMin ?? undefined,
                maxPrice: appliedMax ?? undefined,
                page, size: pageSize, sortBy, sortDir,
            });
            const data = res?.result || res;
            setProducts(data?.content || []);
            setTotalPages(data?.totalPages || 0);
            setTotalElements(data?.totalElements || 0);
        } catch { toast.error('Không thể tải sản phẩm'); }
        finally { setLoading(false); }
    };

    const handleClearAll = () => {
        setSearchParams({});
        setSelectedCategory(''); setSelectedBrand(''); setSelectedCpu('');
        setSelectedRam(''); setSelectedStorage('');
        setAppliedMin(null); setAppliedMax(null);
        setMinPriceInput(''); setMaxPriceInput('');
        setLocalSearch('');
        setSortBy('id'); setSortDir('asc');
    };

    const handleLocalSearch = (e) => {
        e.preventDefault();
        if (localSearch.trim()) setSearchParams({ search: localSearch.trim() });
        else setSearchParams({});
    };

    const applyCustomPrice = () => {
        setAppliedMin(minPriceInput ? Number(minPriceInput) : null);
        setAppliedMax(maxPriceInput ? Number(maxPriceInput) : null);
    };

    const hasAnyFilter = keyword || selectedCategory || selectedBrand || selectedCpu ||
        selectedRam || selectedStorage || appliedMin != null || appliedMax != null;

    const fmtVND = (p) => p?.toLocaleString('vi-VN') + 'đ';
    const activeCategoryName = categories.find(c => String(c.id) === String(selectedCategory))?.name;

    const ActiveBadge = ({ label, onRemove }) => (
        <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
            {label}
            <button onClick={onRemove}><XMarkIcon className="h-3 w-3" /></button>
        </span>
    );

    const FilterSidebar = () => (
        <div>
            {/* Tìm kiếm nhanh */}
            <form onSubmit={handleLocalSearch} className="mb-4">
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input value={localSearch} onChange={e => setLocalSearch(e.target.value)}
                        placeholder="Tìm tên sản phẩm..."
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
            </form>

            {/* Danh mục */}
            <FilterSection title="Danh mục">
                <ul className="space-y-1">
                    <li>
                        <button onClick={() => setSelectedCategory('')}
                            className={`w-full text-left text-sm px-2 py-1 rounded-lg transition-colors ${!selectedCategory ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}>
                            Tất cả
                        </button>
                    </li>
                    {categories.map(cat => (
                        <li key={cat.id}>
                            <button onClick={() => setSelectedCategory(String(cat.id))}
                                className={`w-full text-left text-sm px-2 py-1 rounded-lg transition-colors flex items-center gap-2 ${String(selectedCategory) === String(cat.id) ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}>
                                {cat.imageUrl ? (
                                    <img
                                        src={cat.imageUrl}
                                        alt={cat.name}
                                        className="w-6 h-6 rounded object-cover flex-shrink-0"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    <span className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs flex-shrink-0">💻</span>
                                )}
                                <span className="truncate">{cat.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </FilterSection>

            {/* Hãng */}
            <FilterSection title="Hãng sản xuất">
                <div className="flex flex-wrap gap-1.5">
                    {brands.map(b => (
                        <button key={b} onClick={() => setSelectedBrand(selectedBrand === b ? '' : b)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedBrand === b ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'}`}>
                            {b}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* CPU */}
            <FilterSection title="CPU" defaultOpen={false}>
                <div className="space-y-1.5">
                    {CPU_OPTIONS.map(c => (
                        <label key={c} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="cpu" checked={selectedCpu === c}
                                onChange={() => setSelectedCpu(selectedCpu === c ? '' : c)}
                                className="accent-blue-600 w-3.5 h-3.5" />
                            <span className={`text-sm transition-colors ${selectedCpu === c ? 'text-blue-600 font-semibold' : 'text-slate-600 group-hover:text-blue-600'}`}>{c}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* RAM */}
            <FilterSection title="RAM" defaultOpen={false}>
                <div className="flex flex-wrap gap-1.5">
                    {RAM_OPTIONS.map(r => (
                        <button key={r} onClick={() => setSelectedRam(selectedRam === r ? '' : r)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedRam === r ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'}`}>
                            {r}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Storage */}
            <FilterSection title="Bộ nhớ (ROM)" defaultOpen={false}>
                <div className="flex flex-wrap gap-1.5">
                    {STORAGE_OPTIONS.map(s => (
                        <button key={s} onClick={() => setSelectedStorage(selectedStorage === s ? '' : s)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedStorage === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Giá */}
            <FilterSection title="Khoảng giá" defaultOpen={false}>
                <div className="space-y-1 mb-3">
                    {PRICE_PRESETS.map(p => {
                        const active = appliedMin === p.min && appliedMax === p.max;
                        return (
                            <button key={p.label} onClick={() => {
                                if (active) { setAppliedMin(null); setAppliedMax(null); setMinPriceInput(''); setMaxPriceInput(''); }
                                else { setAppliedMin(p.min); setAppliedMax(p.max); setMinPriceInput(p.min ? String(p.min) : ''); setMaxPriceInput(p.max ? String(p.max) : ''); }
                            }}
                                className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
                                {p.label}
                            </button>
                        );
                    })}
                </div>
                <p className="text-xs text-slate-400 mb-1.5">Hoặc nhập:</p>
                <div className="flex gap-1.5 items-center">
                    <input type="number" placeholder="Từ" value={minPriceInput} onChange={e => setMinPriceInput(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    <span className="text-slate-400 text-xs">–</span>
                    <input type="number" placeholder="Đến" value={maxPriceInput} onChange={e => setMaxPriceInput(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
                <button onClick={applyCustomPrice}
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                    Áp dụng
                </button>
            </FilterSection>

            {hasAnyFilter && (
                <button onClick={handleClearAll}
                    className="w-full text-sm text-blue-600 border border-blue-200 hover:bg-blue-50 py-2 rounded-lg transition-colors font-medium">
                    Xoá tất cả bộ lọc
                </button>
            )}
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex gap-6">

                {/* Sidebar – Desktop */}
                <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sticky top-20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-900 text-sm">Bộ lọc</h3>
                            {hasAnyFilter && (
                                <button onClick={handleClearAll} className="text-xs text-blue-600 hover:underline">Xoá tất cả</button>
                            )}
                        </div>
                        <FilterSidebar />
                    </div>
                </aside>

                {/* Main */}
                <div className="flex-1 min-w-0">

                    {/* Toolbar */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <button onClick={() => setShowMobileFilter(true)}
                            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm">
                            <AdjustmentsHorizontalIcon className="h-4 w-4" />
                            Bộ lọc
                        </button>
                        <div className="flex-1">
                            <span className="font-bold text-slate-900 text-base">
                                {keyword ? `Kết quả: "${keyword}"` : activeCategoryName || 'Tất cả sản phẩm'}
                            </span>
                            {totalElements > 0 && <span className="text-slate-400 text-sm ml-2">({totalElements} sản phẩm)</span>}
                        </div>
                        <select value={`${sortBy}_${sortDir}`} onChange={e => {
                            const [by, dir] = e.target.value.split('_');
                            setSortBy(by); setSortDir(dir);
                        }} className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white">
                            <option value="id_asc">Mới nhất</option>
                            <option value="price_asc">Giá tăng dần</option>
                            <option value="price_desc">Giá giảm dần</option>
                            <option value="name_asc">Tên A–Z</option>
                        </select>
                    </div>

                    {/* Active badges */}
                    {hasAnyFilter && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {keyword && <ActiveBadge label={`"${keyword}"`} onRemove={() => setSearchParams({})} />}
                            {selectedCategory && <ActiveBadge label={activeCategoryName} onRemove={() => setSelectedCategory('')} />}
                            {selectedBrand && <ActiveBadge label={selectedBrand} onRemove={() => setSelectedBrand('')} />}
                            {selectedCpu && <ActiveBadge label={selectedCpu} onRemove={() => setSelectedCpu('')} />}
                            {selectedRam && <ActiveBadge label={`RAM: ${selectedRam}`} onRemove={() => setSelectedRam('')} />}
                            {selectedStorage && <ActiveBadge label={`ROM: ${selectedStorage}`} onRemove={() => setSelectedStorage('')} />}
                            {(appliedMin != null || appliedMax != null) && (
                                <ActiveBadge
                                    label={`${appliedMin ? fmtVND(appliedMin) : '0đ'} – ${appliedMax ? fmtVND(appliedMax) : '∞'}`}
                                    onRemove={() => { setAppliedMin(null); setAppliedMax(null); setMinPriceInput(''); setMaxPriceInput(''); }}
                                />
                            )}
                        </div>
                    )}

                    {/* Products */}
                    {loading ? (
                        <div className="flex items-center justify-center min-h-[300px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                            <p className="text-slate-500 text-lg mb-3">Không tìm thấy sản phẩm phù hợp</p>
                            <button onClick={handleClearAll} className="text-blue-600 text-sm font-medium hover:underline">
                                Xoá bộ lọc và thử lại
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {products.map(product => (
                                    <Link key={product.id} to={`/products/${product.id}`}
                                        className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                        <div className="aspect-square overflow-hidden bg-slate-50 p-3">
                                            <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-3">
                                            <p className="text-[10px] text-blue-500 font-semibold mb-0.5 uppercase tracking-wide">{product.categoryName}</p>
                                            <h3 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">{product.name}</h3>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {product.ram && <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{product.ram}</span>}
                                                {product.storage && <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{product.storage}</span>}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-base font-bold text-blue-600">{product.price?.toLocaleString('vi-VN')}đ</p>
                                                <div className="p-1.5 rounded-full bg-blue-50 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    <ShoppingCartIcon className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Pagination
                                currentPage={currentPage} totalPages={totalPages}
                                totalElements={totalElements} pageSize={pageSize}
                                onPageChange={(p) => setCurrentPage(p)}
                                onPageSizeChange={() => { }} pageSizeOptions={[12]}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Drawer */}
            {showMobileFilter && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilter(false)} />
                    <div className="relative ml-auto w-72 bg-white h-full overflow-y-auto p-4 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-900">Bộ lọc</h3>
                            <button onClick={() => setShowMobileFilter(false)}><XMarkIcon className="h-5 w-5 text-slate-500" /></button>
                        </div>
                        <FilterSidebar />
                        <button onClick={() => setShowMobileFilter(false)}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                            Xem kết quả ({totalElements})
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
