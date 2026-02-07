import axiosClient from './axiosClient';

const authApi = {
    // Login - Backend: POST /api/auth/login
    login: (credentials) => axiosClient.post('/auth/login', credentials),

    // Register - Backend: POST /api/auth/register
    register: (userData) => axiosClient.post('/auth/register', userData),

    // Logout - Backend: POST /api/auth/logout
    logout: () => axiosClient.post('/auth/logout'),

    // Change Password - Backend: POST /api/auth/changePass
    // Backend expects: { pass: "newPassword" }
    changePassword: (newPassword) => axiosClient.post('/auth/changePass', { pass: newPassword }),

    // Forget Password - Backend: POST /api/auth/forgetPass
    // Backend expects: { email: "..." } and sends new password via email
    forgetPassword: (email) => axiosClient.post('/auth/forgetPass', { email }),
};

export default authApi;
