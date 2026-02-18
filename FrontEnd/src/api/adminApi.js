import axiosClient from './axiosClient';

const adminApi = {
    getAllUsers: () => axiosClient.get('/admin/allUser'),

    getUserById: (id) => axiosClient.get(`/admin/id/${id}`),

    getUserByEmail: (email) => axiosClient.get(`/admin/email/${email}`),

    updateUser: (id, userData) => axiosClient.post(`/admin/update/${id}`, userData),

    deleteUser: (id) => axiosClient.delete(`/admin/delete/${id}`),
};

export default adminApi;
