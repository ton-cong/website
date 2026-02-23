import { useEffect, useState } from 'react';
import productApi from '../api/productApi';
import categoryApi from '../api/categoryApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Pagination from '../components/Pagination';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, pageSize]);

    const fetchCategories = async () => {
        try {
            const res = await categoryApi.getAll();
            setCategories(res?.result || res || []);
        } catch (error) {
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const hasFilter = keyword.trim() || selectedCategory;
            let response;

            if (hasFilter) {
                response = await productApi.search({
                    keyword: keyword.trim() || undefined,
                    categoryId: selectedCategory || undefined,
                    page: currentPage,
                    size: pageSize,
                });
            } else {
                response = await productApi.getAll({
                    page: currentPage,
                    size: pageSize,
                });
            }

            const data = response?.result || response;
            setProducts(data?.content || []);
            setTotalPages(data?.totalPages || 0);
            setTotalElements(data?.totalElements || 0);
        } catch (error) {
            toast.error("Không thể tải sản phẩm");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(0);
        fetchProducts();
    };

    const handleReset = () => {
        setKeyword('');
        setSelectedCategory('');
        setCurrentPage(0);
    };

    useEffect(() => {
        if (!keyword && !selectedCategory) {
            fetchProducts();
        }
    }, [keyword, selectedCategory]);

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="relative isolate overflow-hidden bg-slate-900 rounded-3xl mb-12 shadow-2xl">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.400),theme(colors.slate.900))] opacity-80" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white ring-1 ring-white/10 shadow-xl shadow-indigo-600/10 ring-white/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                <div className="px-6 py-20 sm:py-32 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in-up drop-shadow-lg">
                        Khám Phá Công Nghệ Đỉnh Cao
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-indigo-100 max-w-2xl mx-auto animate-fade-in-up drop-shadow" style={{ animationDelay: '100ms' }}>
                        Nâng tầm trải nghiệm của bạn với những chiếc laptop hàng đầu. Mua sắm thông minh, làm việc hiệu quả và giải trí không giới hạn cùng LapTon.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <button
                            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300 ring-1 ring-inset ring-indigo-200"
                        >
                            Mua sắm ngay
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Sản phẩm nổi bật</h2>
                <p className="text-slate-500">Khám phá bộ sưu tập sản phẩm mới nhất của chúng tôi</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-8">
                <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => { setSelectedCategory(e.target.value); }}
                        className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Tìm kiếm
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Đặt lại
                        </button>
                    </div>
                </form>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-slate-500 text-lg">Không tìm thấy sản phẩm nào</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={`/products/${product.id}`}
                                className="group bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden bg-slate-100">
                                    <img
                                        src={product.imageUrl || 'https://via.placeholder.com/300'}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-indigo-600 font-medium mb-1">{product.categoryName}</p>
                                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-bold text-indigo-600">{product.price?.toLocaleString()}đ</p>
                                        <ShoppingCartIcon className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalElements={totalElements}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(0); }}
                        pageSizeOptions={[8, 12, 24, 48]}
                    />
                </>
            )}
        </div>
    );
};

export default HomePage;
