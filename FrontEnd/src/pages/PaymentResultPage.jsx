import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import orderApi from '../api/orderApi';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const PaymentResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { refreshCart } = useCart();
    const [status, setStatus] = useState(null); // 'success' | 'failed'
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const responseCode = params.get('vnp_ResponseCode');
        const txStatus = params.get('vnp_TransactionStatus');

        if (responseCode === '00' && txStatus === '00') {
            // Thanh toán thành công → tạo đơn hàng
            handleCreateOrder();
        } else {
            setStatus('failed');
            sessionStorage.removeItem('pendingOrder');
        }
    }, [location]);

    const handleCreateOrder = async () => {
        setCreating(true);
        try {
            const pendingOrder = sessionStorage.getItem('pendingOrder');
            if (pendingOrder) {
                const orderData = JSON.parse(pendingOrder);
                await orderApi.create(orderData);
                sessionStorage.removeItem('pendingOrder');
                if (refreshCart) await refreshCart();
                toast.success("Thanh toán và đặt hàng thành công!");
            }
            setStatus('success');
        } catch (error) {
            console.error('Create order error:', error);
            toast.error('Thanh toán thành công nhưng tạo đơn hàng thất bại.');
            setStatus('failed');
        } finally {
            setCreating(false);
        }
    };

    if (!status || creating) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-slate-500">{creating ? 'Đang tạo đơn hàng...' : 'Đang xử lý kết quả...'}</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto py-20 text-center">
            <div className="text-7xl mb-6">{status === 'success' ? '✅' : '❌'}</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
                {status === 'success' ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
            </h2>
            <p className="text-slate-500 mb-10">
                {status === 'success'
                    ? 'Cảm ơn bạn đã mua hàng. Đơn hàng đang được xử lý.'
                    : 'Giao dịch không thành công hoặc đã bị hủy. Đơn hàng chưa được tạo.'}
            </p>
            <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => navigate('/')}>Về trang chủ</Button>
                <Button onClick={() => navigate('/orders')}>Xem đơn hàng</Button>
            </div>
        </div>
    );
};

export default PaymentResultPage;
