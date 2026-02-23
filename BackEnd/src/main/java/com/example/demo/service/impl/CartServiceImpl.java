package com.example.demo.service.impl;

import com.example.demo.dto.request.CartItemRequest;
import com.example.demo.dto.response.CartItemResponse;
import com.example.demo.dto.response.CartResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.mapper.CartMapper;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartMapper cartMapper;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder().userId(user.getId()).build();
                    cartRepository.insert(newCart);
                    newCart.setItems(new ArrayList<>());
                    return newCart;
                });
    }

    private CartResponse buildCartResponse(Cart cart) {
        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());
        List<CartItemResponse> itemResponses = items.stream()
                .map(item -> {
                    Product product = item.getProduct();
                    return CartItemResponse.builder()
                            .id(item.getId())
                            .productId(item.getProductId())
                            .productName(product != null ? product.getName() : null)
                            .price(product != null && product.getPrice() != null ? product.getPrice().doubleValue() : 0)
                            .quantity(item.getQuantity())
                            .imageUrl(product != null ? product.getImageUrl() : null)
                            .build();
                })
                .collect(Collectors.toList());

        double totalPrice = itemResponses.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        return CartResponse.builder()
                .id(cart.getId())
                .items(itemResponses)
                .totalPrice(totalPrice)
                .build();
    }

    @Override
    public CartResponse getMyCart() {
        User user = getCurrentUser();
        Cart cart = getOrCreateCart(user);
        return buildCartResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse addToCart(CartItemRequest request) {
        User user = getCurrentUser();
        Cart cart = getOrCreateCart(user);

        productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<CartItem> existingItems = cartItemRepository.findByCartId(cart.getId());
        CartItem existing = existingItems.stream()
                .filter(i -> i.getProductId().equals(request.getProductId()))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + request.getQuantity());
            cartItemRepository.save(existing);
        } else {
            CartItem newItem = CartItem.builder()
                    .cartId(cart.getId())
                    .productId(request.getProductId())
                    .quantity(request.getQuantity())
                    .build();
            cartItemRepository.insert(newItem);
        }

        return buildCartResponse(cart);
    }

    @Override
    @Transactional
    public void removeFromCart(Integer cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    @Transactional
    public void clearCart() {
        User user = getCurrentUser();
        cartRepository.findByUserId(user.getId())
                .ifPresent(cart -> cartItemRepository.deleteByCartId(cart.getId()));
    }
}
