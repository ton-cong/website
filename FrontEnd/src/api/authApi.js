import axiosClient from './axiosClient';

const authApi = {
    login: (credentials) => axiosClient.post('/auth/login', credentials),

    register: (userData) => axiosClient.post('/auth/register', userData),

    logout: () => axiosClient.post('/auth/logout'),

    changePassword: (newPassword) => axiosClient.post('/auth/changePass', { pass: newPassword }),

    forgetPassword: (email) => axiosClient.post('/auth/forgetPass', { email }),

    updateProfile: (profileData) => axiosClient.post('/auth/profile/update', profileData),
};

export default authApi;
