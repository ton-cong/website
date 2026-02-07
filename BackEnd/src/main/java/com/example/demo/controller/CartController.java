package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.CartItemRequest;
import com.example.demo.dto.response.CartResponse;
import com.example.demo.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ApiResponse<CartResponse> getMyCart() {
        ApiResponse<CartResponse> response = new ApiResponse<>();
        response.setResult(cartService.getMyCart());
        return response;
    }

    @PostMapping("/add")
    public ApiResponse<CartResponse> addToCart(@Valid @RequestBody CartItemRequest request) {
        ApiResponse<CartResponse> response = new ApiResponse<>();
        response.setResult(cartService.addToCart(request));
        return response;
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ApiResponse<String> removeFromCart(@PathVariable Integer cartItemId) {
        cartService.removeFromCart(cartItemId);
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult("Item removed");
        return response;
    }

    @DeleteMapping("/clear")
    public ApiResponse<String> clearCart() {
        cartService.clearCart();
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult("Cart cleared");
        return response;
    }
}
