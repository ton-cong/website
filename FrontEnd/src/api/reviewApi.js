import axiosClient from './axiosClient';

const reviewApi = {
    create: (reviewData) => axiosClient.post('/reviews', reviewData),

    getByProduct: (productId) => axiosClient.get(`/reviews/product/${productId}`),

    getAll: () => axiosClient.get('/reviews'),

    delete: (id) => axiosClient.delete(`/reviews/${id}`),
};

export default reviewApi;
