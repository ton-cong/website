import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AdminRoute, AuthRoute } from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />

            <Route path="cart" element={<AuthRoute><CartPage /></AuthRoute>} />
            <Route path="checkout" element={<AuthRoute><CheckoutPage /></AuthRoute>} />
            <Route path="orders" element={<AuthRoute><OrdersPage /></AuthRoute>} />
            <Route path="profile" element={<AuthRoute><ProfilePage /></AuthRoute>} />

            <Route path="admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
