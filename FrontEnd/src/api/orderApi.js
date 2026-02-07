import axiosClient from './axiosClient';

const orderApi = {
    // Create new order
    create: (orderData) => axiosClient.post('/orders', orderData),

    // Get current user's orders
    getMyOrders: () => axiosClient.get('/orders/my-orders'),

    // Get all orders (Admin)
    getAll: () => axiosClient.get('/orders'),

    // Update order status (Admin)
    updateStatus: (orderId, status) => axiosClient.put(`/orders/${orderId}/status`, null, { params: { status } }),
};

export default orderApi;
