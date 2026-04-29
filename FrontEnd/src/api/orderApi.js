import axiosClient from './axiosClient';

const orderApi = {
    create: (data) => axiosClient.post('/orders', data),
    getMyOrders: () => axiosClient.get('/orders/my-orders'),
    getOrderById: (id) => axiosClient.get(`/orders/${id}`),
    getAll: (params = {}) => axiosClient.get('/orders', {
        params: {
            page: params.page || 0,
            size: params.size || 10,
            sortBy: params.sortBy || 'id',
            sortDir: params.sortDir || 'desc',
        }
    }),
    updateStatus: (orderId, status) => axiosClient.put(`/orders/${orderId}/status?status=${status}`),
};

export default orderApi;
