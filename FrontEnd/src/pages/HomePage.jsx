import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productApi from '../api/productApi';
import categoryApi from '../api/categoryApi';
import { ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline';
import { FireIcon as FireSolid } from '@heroicons/react/24/solid';

const bannerImages = [
    "https://res.cloudinary.com/dquuquf93/image/upload/v1777344431/Home-tuan-le-thuong-hieu-asus_ef47e0.webp",
    "https://res.cloudinary.com/dquuquf93/image/upload/v1777344429/slidingmobanmacneo_ezinfu.webp"
];

// Ảnh fallback cho từng danh mục khi DB chưa có imageUrl
const CATEGORY_FALLBACK_IMAGES = {
    'Laptop Gaming': 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863254/ASUS_ROG_Strix_G15_kyjxrm.jpg',
    'Laptop Mỏng Nhẹ': 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863256/Dell_XPS_13_Plus_wsfpal.jpg',
    'MacBook (Apple)': 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863254/Apple_MacBook_Air_M2_mio1be.jpg',
    'Laptop Văn Phòng': 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863262/Lenovo_ThinkPad_X1_Carbon_tq0mom.jpg',
    'Laptop Sinh Viên': 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863253/Acer_Aspire_5_2023_bsqfdz.jpg',
    'Laptop 2 Trong 1': 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863263/Lenovo_Yoga_9i_hsoh47.jpg',
    'Laptop Đồ Họa': 'https://res.cloudinary.com/dquuquf93/image/upload/v1771863257/Dell_Precision_5480_ejpngi.jpg',
};

// Lấy ảnh danh mục: ưu tiên imageUrl từ backend, fallback về ảnh tĩnh theo tên
const getCategoryImage = (cat) => cat.imageUrl || CATEGORY_FALLBACK_IMAGES[cat.name] || null;

const HomePage = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [hotDeals, setHotDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        const timer = setInterval(() => setCurrentSlide(p => (p + 1) % bannerImages.length), 5000);
        return () => clearInterval(timer);
    }, []);

    const fetchData = async () => {
        try {
            const [catRes, prodRes, hotRes] = await Promise.all([
                categoryApi.getAll(),
                productApi.search({ page: 0, size: 8, sortBy: 'id', sortDir: 'desc' }),
                productApi.search({ page: 0, size: 4, sortBy: 'price', sortDir: 'desc' }),
            ]);
            setCategories(catRes?.result || catRes || []);
            const prodData = prodRes?.result || prodRes;
            setFeaturedProducts(prodData?.content || []);
            const hotData = hotRes?.result || hotRes;
            setHotDeals(hotData?.content || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-10">

            {/* ─── Banner Slider ─── */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
                <div className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {bannerImages.map((img, i) => (
                        <div key={i} className="w-full flex-shrink-0">
                            <img src={img} alt={`Banner ${i + 1}`} className="w-full h-auto object-cover" />
                        </div>
                    ))}
                </div>
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {bannerImages.map((_, i) => (
                        <button key={i} onClick={() => setCurrentSlide(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-blue-600 w-7' : 'bg-white/70 w-2'}`} />
                    ))}
                </div>
                <button onClick={() => setCurrentSlide(p => p === 0 ? bannerImages.length - 1 : p - 1)}
                    className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                    <ChevronLeftIcon className="h-5 w-5 text-slate-700" />
                </button>
                <button onClick={() => setCurrentSlide(p => (p + 1) % bannerImages.length)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                    <ChevronRightIcon className="h-5 w-5 text-slate-700" />
                </button>
            </div>

            {/* ─── Danh mục ─── */}
            <section>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded-full inline-block"></span>
                        Danh mục sản phẩm
                    </h2>
                    <Link to="/search" className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1">
                        Xem tất cả <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-3">
                    {categories.map(cat => (
                        <button key={cat.id}
                            onClick={() => navigate(`/search?category=${cat.id}`)}
                            className="group flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shadow-sm flex-shrink-0">
                                {cat.imageUrl ? (
                                    <img
                                        src={cat.imageUrl}
                                        alt={cat.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<span style="font-size:1.5rem">💻</span>';
                                        }}
                                    />
                                ) : (
                                    <span className="text-2xl">💻</span>
                                )}
                            </div>
                            <span className="text-xs font-medium text-slate-700 text-center leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ─── Sản phẩm nổi bật ─── */}
            <section>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded-full inline-block"></span>
                        Sản phẩm nổi bật
                    </h2>
                    <Link to="/search" className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1">
                        Xem tất cả <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* ─── Top sản phẩm cao cấp ─── */}
            <section>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-1 h-6 bg-amber-500 rounded-full inline-block"></span>
                        <FireSolid className="h-5 w-5 text-amber-500" />
                        Cao cấp & Workstation
                    </h2>
                    <Link to="/search?sortBy=price&sortDir=desc" className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1">
                        Xem thêm <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {hotDeals.map(product => (
                        <ProductCard key={product.id} product={product} badge="Premium" />
                    ))}
                </div>
            </section>

            {/* ─── Feature strips ─── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
                {[
                    { icon: '🚚', title: 'Miễn phí vận chuyển', sub: 'Đơn hàng trên 5 triệu' },
                    { icon: '🔒', title: 'Thanh toán an toàn', sub: 'Bảo mật SSL 256-bit' },
                    { icon: '↩️', title: 'Đổi trả 30 ngày', sub: 'Không cần lý do' },
                    { icon: '🎧', title: 'Hỗ trợ 24/7', sub: 'Hotline: 1800.2097' },
                ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                        <span className="text-3xl">{f.icon}</span>
                        <div>
                            <p className="text-sm font-bold text-slate-900">{f.title}</p>
                            <p className="text-xs text-slate-500">{f.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProductCard = ({ product, badge }) => (
    <Link to={`/products/${product.id}`}
        className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-slate-50 p-3">
            <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            {badge && (
                <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {badge}
                </span>
            )}
        </div>
        <div className="p-3">
            <p className="text-[10px] text-blue-500 font-semibold mb-0.5 uppercase tracking-wide">{product.categoryName}</p>
            <h3 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                {product.name}
            </h3>
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
);

export default HomePage;
