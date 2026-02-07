import axiosClient from './axiosClient';

const categoryApi = {
    getAll: () => axiosClient.get('/category/all'),
    getById: (id) => axiosClient.get(`/category/${id}`),
    create: (data) => axiosClient.post('/category/create', data),
    update: (id, data) => axiosClient.put(`/category/update/${id}`, data),
    delete: (id) => axiosClient.delete(`/category/delete/${id}`),
};

export default categoryApi;
