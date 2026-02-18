import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const UserRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return <div className="text-center py-20">Đang tải...</div>;

    if (isAuthenticated && isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return <div className="text-center py-20">Đang tải...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export const AuthRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="text-center py-20">Đang tải...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
