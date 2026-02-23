import axiosClient from './axiosClient';

const reviewApi = {
    getByProduct: (productId) => axiosClient.get(`/reviews/product/${productId}`),
    getAll: (params = {}) => axiosClient.get('/reviews', {
        params: {
            page: params.page || 0,
            size: params.size || 10,
            sortBy: params.sortBy || 'id',
            sortDir: params.sortDir || 'desc',
        }
    }),
    add: (data) => axiosClient.post('/reviews', data),
    delete: (id) => axiosClient.delete(`/reviews/${id}`),
};

export default reviewApi;
