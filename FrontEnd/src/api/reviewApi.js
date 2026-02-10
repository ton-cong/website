import axiosClient from './axiosClient';

const reviewApi = {
    // Create a review for a product
    create: (reviewData) => axiosClient.post('/reviews', reviewData),

    // Get reviews for a specific product
    getByProduct: (productId) => axiosClient.get(`/reviews/product/${productId}`),

    // Get all reviews (Admin)
    getAll: () => axiosClient.get('/reviews'),

    // Delete review (Admin)
    delete: (id) => axiosClient.delete(`/reviews/${id}`),
};

export default reviewApi;
