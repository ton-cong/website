import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import orderApi from '../api/orderApi';
import { toast } from 'react-toastify';
import AddressMapPicker from '../components/AddressMapPicker';
import {
    TruckIcon, ShoppingBagIcon, UserIcon, PhoneIcon,
    MapPinIcon, ChatBubbleBottomCenterTextIcon,
    CheckCircleIcon, XMarkIcon, QrCodeIcon,
    ClipboardDocumentIcon, ArrowPathIcon, MapIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

// ─── Thông tin tài khoản ngân hàng nhận tiền ───
// Thay đổi các thông tin này theo tài khoản thực của bạn
const BANK_CONFIG = {
    bankId: 'MB',             // Mã ngân hàng VietQR (MB, VCB, TCB, ACB, VPB, ...)
    accountNo: '0123456789',  // Số tài khoản của shop
    accountName: 'CONG TY TQUAD', // Tên chủ tài khoản (in hoa, không dấu)
    template: 'compact2',     // compact | compact2 | qr_only | print
};

// Tạo URL VietQR
const buildVietQRUrl = (amount, orderRef) => {
    const info = encodeURIComponent(`Thanh toan don hang ${orderRef}`);
    const name = encodeURIComponent(BANK_CONFIG.accountName);
    return `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-${BANK_CONFIG.template}.png?amount=${amount}&addInfo=${info}&accountName=${name}`;
};

// Modal QR thanh toán
const QRPaymentModal = ({ amount, orderRef, onConfirmed, onClose }) => {
    const [confirmed, setConfirmed] = useState(false);
    const [countdown, setCountdown] = useState(0); // demo không cần countdown thật
    const [copied, setCopied] = useState(false);
    const qrUrl = buildVietQRUrl(amount, orderRef);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleConfirm = () => {
        setConfirmed(true);
        setTimeout(() => onConfirmed(), 800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">

                {/* Header */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-5 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <QrCodeIcon className="h-6 w-6" />
                        <div>
                            <h3 className="font-bold text-lg">Thanh toán VietQR</h3>
                            <p className="text-blue-200 text-xs">Quét mã bằng app ngân hàng</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* QR Code */}
                <div className="p-6">
                    {!confirmed ? (
                        <>
                            {/* Amount */}
                            <div className="bg-blue-50 rounded-2xl px-5 py-3 text-center mb-5">
                                <p className="text-xs text-blue-500 font-medium mb-1">Số tiền cần thanh toán</p>
                                <p className="text-3xl font-black text-blue-700">{amount.toLocaleString('vi-VN')}đ</p>
                            </div>

                            {/* QR Image */}
                            <div className="flex justify-center mb-5">
                                <div className="border-4 border-blue-100 rounded-2xl overflow-hidden shadow-lg">
                                    <img
                                        src={qrUrl}
                                        alt="VietQR Payment"
                                        className="w-52 h-52 object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-52 h-52 items-center justify-center bg-slate-50 text-slate-400 text-sm text-center p-4 hidden">
                                        <div>
                                            <QrCodeIcon className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                                            Không tải được QR, vui lòng chuyển khoản thủ công
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bank info */}
                            <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 text-sm mb-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Ngân hàng</span>
                                    <span className="font-bold text-slate-900">{BANK_CONFIG.bankId} Bank</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Số tài khoản</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900 font-mono">{BANK_CONFIG.accountNo}</span>
                                        <button onClick={() => handleCopy(BANK_CONFIG.accountNo)}
                                            className="p-1 text-slate-400 hover:text-blue-600 transition-colors">
                                            {copied ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Chủ TK</span>
                                    <span className="font-bold text-slate-900">{BANK_CONFIG.accountName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Nội dung CK</span>
                                    <span className="font-semibold text-blue-700 text-xs">Thanh toan don hang {orderRef}</span>
                                </div>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 mb-5 flex items-start gap-2">
                                <span className="text-base">⚠️</span>
                                <p>Vui lòng chuyển khoản <strong>đúng số tiền</strong> và <strong>đúng nội dung</strong> để đơn hàng được xác nhận tự động.</p>
                            </div>

                            <button onClick={handleConfirm}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                                <CheckCircleIcon className="h-5 w-5" />
                                Tôi đã chuyển khoản xong
                            </button>
                            <button onClick={onClose}
                                className="mt-2 w-full text-sm text-slate-400 hover:text-slate-600 py-2 transition-colors">
                                Hủy, thanh toán sau
                            </button>
                        </>
                    ) : (
                        /* Success state */
                        <div className="py-8 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                <CheckCircleSolid className="h-12 w-12 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Xác nhận thành công!</h3>
                            <p className="text-slate-500 text-sm">Đang tạo đơn hàng của bạn...</p>
                            <div className="mt-4 flex justify-center">
                                <ArrowPathIcon className="h-6 w-6 text-blue-500 animate-spin" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Main CheckoutPage ───────────────────────────────
const CheckoutPage = () => {
    const { cart, refreshCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [showQR, setShowQR] = useState(false);
    const [orderRef] = useState(() => Math.random().toString(36).slice(2, 8).toUpperCase());

    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        phone:    user?.phone    || '',
        address:  user?.address  || '',
        note:     '',
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const subtotal = cart?.totalPrice || cart?.items?.reduce((t, i) => t + i.price * i.quantity, 0) || 0;
    const shipping = subtotal >= 5_000_000 ? 0 : 30_000;
    const grandTotal = subtotal + shipping;

    const validateForm = () => {
        if (!isAuthenticated) { toast.error('Vui lòng đăng nhập'); navigate('/login'); return false; }
        if (!formData.fullName || !formData.phone || !formData.address) {
            toast.error('Vui lòng điền đầy đủ thông tin giao hàng');
            return false;
        }
        return true;
    };

    const createOrder = async (method) => {
        setLoading(true);
        try {
            await orderApi.create({
                fullName: formData.fullName,
                phone: formData.phone,
                address: formData.address,
                note: formData.note || '',
                paymentMethod: method,
            });
            toast.success('🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm.', { autoClose: 4000 });
            if (refreshCart) await refreshCart();
            navigate('/orders');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (paymentMethod === 'VIETQR') {
            setShowQR(true); // Hiện modal QR
        } else {
            await createOrder('COD');
        }
    };

    // Khi người dùng xác nhận đã chuyển khoản
    const handleQRConfirmed = async () => {
        setShowQR(false);
        await createOrder('BANK_TRANSFER');
    };

    if (!cart?.items?.length) {
        return (
            <div className="max-w-md mx-auto py-20 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <ShoppingBagIcon className="h-10 w-10 text-blue-300" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Giỏ hàng trống</h2>
                <p className="text-slate-500 text-sm mb-6">Vui lòng thêm sản phẩm trước khi thanh toán.</p>
                <button onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                    Tiếp tục mua sắm
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-6 px-4">

            {/* QR Modal */}
            {showQR && (
                <QRPaymentModal
                    amount={grandTotal}
                    orderRef={orderRef}
                    onConfirmed={handleQRConfirmed}
                    onClose={() => setShowQR(false)}
                />
            )}

            <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
                Thanh toán
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* ─── Left: Form ─── */}
                    <div className="lg:col-span-3 space-y-5">

                        {/* Delivery info */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                                <TruckIcon className="h-5 w-5 text-blue-600" />
                                Thông tin giao hàng
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { label: 'Họ và tên người nhận', icon: UserIcon, name: 'fullName', placeholder: 'Nguyễn Văn A' },
                                    { label: 'Số điện thoại', icon: PhoneIcon, name: 'phone', type: 'tel', placeholder: '0901234567' },
                                    { label: 'Địa chỉ giao hàng', icon: MapPinIcon, name: 'address', placeholder: 'Số nhà, đường, phường, quận, tỉnh/thành' },
                                ].map(({ label, icon: Icon, name, type = 'text', placeholder }) => (
                                    <div key={name}>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                                        <div className="relative">
                                            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input type={type} name={name} value={formData[name]} onChange={handleChange}
                                                placeholder={placeholder} required
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" />
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Ghi chú / Địa chỉ cụ thể</label>
                                    <div className="relative">
                                        <ChatBubbleBottomCenterTextIcon className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                        <textarea name="note" value={formData.note} onChange={handleChange}
                                            rows="2" placeholder="VD: Số nhà cụ thể, tòa nhà, tầng, ghi chú cho shipper..."
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map address picker */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <MapIcon className="h-5 w-5 text-blue-600" />
                                Chọn địa chỉ trên bản đồ
                                <span className="text-xs font-normal text-slate-400 ml-1">(tuỳ chọn)</span>
                            </h2>
                            <AddressMapPicker
                                initialAddress={formData.address}
                                onAddressSelect={(addr) => {
                                    setFormData(prev => ({ ...prev, address: addr }));
                                }}
                            />
                        </div>

                        {/* Payment method */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <h2 className="font-bold text-slate-900 mb-4">Phương thức thanh toán</h2>
                            <div className="space-y-3">

                                {/* COD */}
                                <label onClick={() => setPaymentMethod('COD')}
                                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-200'}`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${paymentMethod === 'COD' ? 'border-blue-500' : 'border-slate-300'}`}>
                                        {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                                    </div>
                                    <span className="text-2xl">💵</span>
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">Thanh toán khi nhận hàng (COD)</p>
                                        <p className="text-xs text-slate-500">Trả tiền mặt khi shipper giao hàng</p>
                                    </div>
                                </label>

                                {/* VietQR */}
                                <label onClick={() => setPaymentMethod('VIETQR')}
                                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'VIETQR' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-200'}`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${paymentMethod === 'VIETQR' ? 'border-blue-500' : 'border-slate-300'}`}>
                                        {paymentMethod === 'VIETQR' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                                    </div>
                                    <span className="text-2xl">📱</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-slate-900 text-sm">Chuyển khoản VietQR</p>
                                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">KHUYÊN DÙNG</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Quét QR bằng app ngân hàng bất kỳ • Xác nhận tức thì</p>
                                    </div>
                                    <QrCodeIcon className="h-6 w-6 text-blue-400 flex-shrink-0" />
                                </label>
                            </div>

                            {/* Preview QR info when VietQR selected */}
                            {paymentMethod === 'VIETQR' && (
                                <div className="mt-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-4 border border-blue-100">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={buildVietQRUrl(grandTotal, orderRef)}
                                            alt="Preview QR"
                                            className="w-20 h-20 rounded-lg border-2 border-blue-200 bg-white object-contain flex-shrink-0"
                                        />
                                        <div className="text-sm space-y-1">
                                            <p className="text-slate-500 text-xs">Preview QR – {BANK_CONFIG.bankId} Bank</p>
                                            <p className="font-mono font-bold text-slate-900">{BANK_CONFIG.accountNo}</p>
                                            <p className="text-blue-700 font-bold text-base">{grandTotal.toLocaleString('vi-VN')}đ</p>
                                            <p className="text-xs text-slate-400">Nhấn "Đặt hàng" để xem QR đầy đủ</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ─── Right: Order Summary ─── */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-20">
                            <h2 className="font-bold text-slate-900 mb-5">Đơn hàng của bạn</h2>

                            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <img src={item.productImage || item.imageUrl || 'https://via.placeholder.com/48'}
                                            alt={item.productName}
                                            className="w-12 h-12 object-contain bg-slate-50 rounded-lg p-1 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.productName}</p>
                                            <p className="text-xs text-slate-400">{item.price?.toLocaleString('vi-VN')}đ × {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-900 flex-shrink-0">
                                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Tạm tính ({cart.items.length} SP)</span>
                                    <span className="font-medium text-slate-900">{subtotal.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển</span>
                                    <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium text-slate-900'}>
                                        {shipping === 0 ? 'Miễn phí' : shipping.toLocaleString('vi-VN') + 'đ'}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
                                        Mua thêm {(5_000_000 - subtotal).toLocaleString('vi-VN')}đ để miễn phí ship
                                    </p>
                                )}
                                <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-base font-bold">
                                    <span className="text-slate-900">Tổng cộng</span>
                                    <span className="text-blue-600 text-xl">{grandTotal.toLocaleString('vi-VN')}đ</span>
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200 text-sm">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Đang xử lý...
                                    </span>
                                ) : paymentMethod === 'VIETQR' ? '📱 Đặt hàng & Hiện QR' : '🛍️ Đặt hàng ngay'}
                            </button>
                            <p className="mt-3 text-center text-xs text-slate-400">🔒 Thông tin được bảo mật tuyệt đối</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
