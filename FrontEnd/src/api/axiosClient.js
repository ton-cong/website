import axios from 'axios';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const { response } = error;

        if (response) {
            const errorMessage = response.data?.message || response.data?.error || 'Đã có lỗi xảy ra';

            if (response.status !== 401) {
                toast.error(errorMessage);
            }

            if (response.status === 401) {
                localStorage.removeItem('token');
                if (window.location.pathname !== '/login') {
                }
            }
        } else if (error.request) {
            toast.error("Không thể kết nối đến server. Vui lòng kiểm tra mạng.");
        } else {
            toast.error("Lỗi: " + error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
