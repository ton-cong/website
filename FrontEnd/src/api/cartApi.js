import axiosClient from './axiosClient';

const cartApi = {
    getMyCart: () => axiosClient.get('/cart'),
    addToCart: (data) => axiosClient.post('/cart/add', data),
    removeFromCart: (cartItemId) => axiosClient.delete(`/cart/remove/${cartItemId}`),
    clearCart: () => axiosClient.delete('/cart/clear'),
};

export default cartApi;
