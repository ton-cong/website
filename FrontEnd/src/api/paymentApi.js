import axiosClient from './axiosClient';

const paymentApi = {
    createPaymentUrl: (amount, orderInfo) =>
        axiosClient.post('/payment/create', null, { params: { amount, orderInfo } }),
};

export default paymentApi;
