import axiosClient from './axiosClient';

const orderApi = {
    create: (orderData) => axiosClient.post('/orders', orderData),

    getMyOrders: () => axiosClient.get('/orders/my-orders'),

    getAll: () => axiosClient.get('/orders'),

    updateStatus: (orderId, status) => axiosClient.put(`/orders/${orderId}/status`, null, { params: { status } }),
};

export default orderApi;
