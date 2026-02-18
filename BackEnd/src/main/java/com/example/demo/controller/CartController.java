package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.CartItemRequest;
import com.example.demo.dto.response.CartResponse;
import com.example.demo.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Cart", description = "Shopping cart management APIs")
public class CartController {

    private final CartService cartService;

    @GetMapping
    @Operation(summary = "Get current user's cart")
    public ApiResponse<CartResponse> getMyCart() {
        ApiResponse<CartResponse> response = new ApiResponse<>();
        response.setResult(cartService.getMyCart());
        return response;
    }

    @PostMapping("/add")
    @Operation(summary = "Add item to cart")
    public ApiResponse<CartResponse> addToCart(@Valid @RequestBody CartItemRequest request) {
        ApiResponse<CartResponse> response = new ApiResponse<>();
        response.setResult(cartService.addToCart(request));
        return response;
    }

    @DeleteMapping("/remove/{cartItemId}")
    @Operation(summary = "Remove item from cart")
    public ApiResponse<String> removeFromCart(@PathVariable Integer cartItemId) {
        cartService.removeFromCart(cartItemId);
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult("Item removed");
        return response;
    }

    @DeleteMapping("/clear")
    @Operation(summary = "Clear all items in cart")
    public ApiResponse<String> clearCart() {
        cartService.clearCart();
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult("Cart cleared");
        return response;
    }
}
