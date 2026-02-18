import { createContext, useState, useEffect, useContext } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    console.error("Auth check failed", error);
                    logout();
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axiosClient.post('/auth/login', { email, password });
            console.log("Login response:", response); // Debug

            const data = response.result || response;
            const { accessToken, user: userInfo } = data;

            if (!accessToken) {
                console.error("No accessToken in response:", response);
                return { success: false, message: "Invalid server response" };
            }

            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(userInfo));

            setUser(userInfo);
            return { success: true, user: userInfo };
        } catch (error) {
            console.error("Login error", error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    };

    const register = async (userData) => {
        try {
            await axiosClient.post('/auth/register', userData);
            return { success: true };
        } catch (error) {
            console.error("Register error", error);
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed"
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.roles === 'ADMIN' || user?.role === 'ADMIN',
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
