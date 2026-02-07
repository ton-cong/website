import { createContext, useContext, useState, useEffect } from 'react';
import cartApi from '../api/cartApi';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [cart, setCart] = useState(null);
    const [cartLoading, setCartLoading] = useState(false);

    const fetchCart = async () => {
        if (!isAuthenticated) {
            setCart(null);
            return;
        }
        setCartLoading(true);
        try {
            const response = await cartApi.getMyCart();
            // Response may be wrapped in { result: ... } or direct
            setCart(response?.result || response);
        } catch (error) {
            console.error("Failed to fetch cart", error);
            // Don't show error toast for 403 - user just not logged in
        } finally {
            setCartLoading(false);
        }
    };

    useEffect(() => {
        // Wait for auth to finish loading before attempting to fetch cart
        if (authLoading) return;

        if (isAuthenticated) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [isAuthenticated, authLoading]);

    const addToCart = async (productId, quantity = 1) => {
        if (!isAuthenticated) {
            toast.warning("Vui lòng đăng nhập để thêm vào giỏ hàng");
            return false;
        }
        try {
            await cartApi.addToCart({ productId, quantity });
            toast.success("Đã thêm vào giỏ hàng!");
            fetchCart();
            return true;
        } catch (error) {
            toast.error("Không thể thêm vào giỏ hàng");
            console.error(error);
            return false;
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            await cartApi.removeFromCart(cartItemId);
            toast.success("Đã xóa khỏi giỏ hàng");
            fetchCart();
        } catch (error) {
            toast.error("Không thể xóa sản phẩm");
        }
    };

    const clearCart = async () => {
        try {
            await cartApi.clearCart();
            fetchCart();
        } catch (error) {
            console.error(error);
        }
    };

    const cartCount = cart?.cartItems?.length || 0;

    return (
        <CartContext.Provider value={{ cart, cartLoading, addToCart, removeFromCart, clearCart, cartCount, refreshCart: fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
