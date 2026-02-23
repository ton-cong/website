import axiosClient from './axiosClient';

const productApi = {
    getAll: (params = {}) => axiosClient.get('/products/getAllProduct', {
        params: {
            page: params.page || 0,
            size: params.size || 10,
            sortBy: params.sortBy || 'id',
            sortDir: params.sortDir || 'asc',
        }
    }),
    getById: (id) => axiosClient.get(`/products/getProductById/${id}`),
    create: (data) => axiosClient.post('/products/create', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    update: (id, data) => axiosClient.put(`/products/update/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    delete: (id) => axiosClient.delete(`/products/delete/${id}`),
    search: (params = {}) => axiosClient.get('/products/search', { params }),
};

export default productApi;
