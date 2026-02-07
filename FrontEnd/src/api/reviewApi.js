import axiosClient from './axiosClient';

const reviewApi = {
    // Create a review for a product
    create: (reviewData) => axiosClient.post('/reviews', reviewData),

    // Get reviews for a specific product
    getByProduct: (productId) => axiosClient.get(`/reviews/product/${productId}`),
};

export default reviewApi;
