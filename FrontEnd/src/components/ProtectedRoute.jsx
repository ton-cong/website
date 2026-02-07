import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Route chỉ dành cho USER (không cho ADMIN)
export const UserRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return <div className="text-center py-20">Đang tải...</div>;

    // Nếu là ADMIN, redirect về admin panel
    if (isAuthenticated && isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

// Route chỉ dành cho ADMIN
export const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return <div className="text-center py-20">Đang tải...</div>;

    // Chưa đăng nhập -> login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Không phải admin -> về trang chủ
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

// Route yêu cầu đăng nhập (cho cả USER và ADMIN)
export const AuthRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="text-center py-20">Đang tải...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
