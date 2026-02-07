import axiosClient from './axiosClient';

const adminApi = {
    // Get all users - Backend: GET /api/admin/allUser
    getAllUsers: () => axiosClient.get('/admin/allUser'),

    // Get user by ID - Backend: GET /api/admin/id/{id}
    getUserById: (id) => axiosClient.get(`/admin/id/${id}`),

    // Get user by Email - Backend: GET /api/admin/email/{email}
    getUserByEmail: (email) => axiosClient.get(`/admin/email/${email}`),

    // Update user - Backend: POST /api/admin/update/{id}
    updateUser: (id, userData) => axiosClient.post(`/admin/update/${id}`, userData),

    // Delete user - Backend: DELETE /api/admin/delete/{id}
    deleteUser: (id) => axiosClient.delete(`/admin/delete/${id}`),
};

export default adminApi;
