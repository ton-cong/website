import axiosClient from './axiosClient';

const variantApi = {
    getByProductId: (productId) => axiosClient.get(`/variants/product/${productId}`),
    getById: (id) => axiosClient.get(`/variants/${id}`),
    create: (data) => axiosClient.post('/variants', data),
    update: (id, data) => axiosClient.put(`/variants/${id}`, data),
    delete: (id) => axiosClient.delete(`/variants/${id}`),
};

export default variantApi;
