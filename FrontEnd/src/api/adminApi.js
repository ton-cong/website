import axiosClient from './axiosClient';

const adminApi = {
    getAllUsers: (params = {}) => axiosClient.get('/admin/allUser', {
        params: {
            page: params.page || 0,
            size: params.size || 10,
            sortBy: params.sortBy || 'id',
            sortDir: params.sortDir || 'asc',
        }
    }),
    deleteUser: (id) => axiosClient.delete(`/admin/delete/${id}`),
    getUserByEmail: (email) => axiosClient.get(`/admin/email/${email}`),
    getUserById: (id) => axiosClient.get(`/admin/id/${id}`),
    updateUser: (id, data) => axiosClient.post(`/admin/update/${id}`, data),
};

export default adminApi;
