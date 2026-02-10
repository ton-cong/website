import axios from 'axios';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for CORS with credentials
});

// Interceptor to add token to requests
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // console.log("Token being sent:", token ? token.substring(0, 30) + "..." : "NO TOKEN"); // Debug
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor to handle responses
axiosClient.interceptors.response.use(
    (response) => {
        // Return only the data part of the response if the structure is known
        return response.data;
    },
    (error) => {
        // Handle errors globally
        const { response } = error;

        if (response) {
            // Server responded with a status code outside 2xx
            const errorMessage = response.data?.message || response.data?.error || 'Đã có lỗi xảy ra';

            // Only show toast for errors that are relevant to the user
            // You might want to filter out implementation details or 401s if handled elsewhere
            if (response.status !== 401) {
                toast.error(errorMessage);
            }

            if (response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('token');
                // Check if we are not already on the login page to avoid loops
                if (window.location.pathname !== '/login') {
                    // window.location.href = '/login'; // Optional: Redirect to login
                }
            }
        } else if (error.request) {
            // Request was made but no response received
            toast.error("Không thể kết nối đến server. Vui lòng kiểm tra mạng.");
        } else {
            // Something happened in setting up the request
            toast.error("Lỗi: " + error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
