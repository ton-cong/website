package com.example.demo.service;

import com.example.demo.dto.request.CartItemRequest;
import com.example.demo.dto.response.CartResponse;

public interface CartService {
    CartResponse getMyCart();
    CartResponse addToCart(CartItemRequest request);
    void removeFromCart(Integer cartItemId);
    void clearCart();
}
