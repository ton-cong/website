import axiosClient from './axiosClient';

const categoryApi = {
    getAll: () => axiosClient.get('/category/all'),
    getAllPaged: (params = {}) => axiosClient.get('/category/all/page', {
        params: {
            page: params.page || 0,
            size: params.size || 10,
            sortBy: params.sortBy || 'id',
            sortDir: params.sortDir || 'asc',
        }
    }),
    getById: (id) => axiosClient.get(`/category/${id}`),
    create: (data) => axiosClient.post('/category/create', data),
    update: (id, data) => axiosClient.put(`/category/update/${id}`, data),
    delete: (id) => axiosClient.delete(`/category/delete/${id}`),
};

export default categoryApi;
