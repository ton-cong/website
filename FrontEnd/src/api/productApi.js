import axiosClient from './axiosClient';

const productApi = {
    getAll: () => axiosClient.get('/products/getAllProduct'),
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
};

export default productApi;
