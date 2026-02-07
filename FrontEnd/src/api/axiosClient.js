import axios from 'axios';

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
        console.log("Token being sent:", token ? token.substring(0, 30) + "..." : "NO TOKEN"); // Debug
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
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            // Check if we are not already on the login page to avoid loops
            if (window.location.pathname !== '/login') {
                // window.location.href = '/login'; // Optional: Redirect to login
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
