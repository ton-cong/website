package com.example.demo.service.impl;

import com.example.demo.dto.request.OrderRequest;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.entity.*;
import com.example.demo.enums.OrderStatus;
import com.example.demo.mapper.OrderMapper;
import com.example.demo.repository.*;
import com.example.demo.service.EmailService;
import com.example.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;
    private final EmailService emailService;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart is empty"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double total = cart.getItems().stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();

        Order order = Order.builder()
                .user(user)
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .note(request.getNote())
                .totalPrice(total)
                .status(OrderStatus.pending)
                .build();
        
        Order savedOrder = orderRepository.save(order);

        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> 
            OrderItem.builder()
                    .order(savedOrder)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getProduct().getPrice())
                    .build()
        ).collect(Collectors.toList());

        orderItemRepository.saveAll(orderItems);
        savedOrder.setItems(orderItems);

        cartItemRepository.deleteByCartId(cart.getId());



        emailService.sendOrderConfirmation(savedOrder);

        return orderMapper.toResponse(savedOrder);
    }

    @Override
    public List<OrderResponse> getMyOrders() {
        User user = getCurrentUser();
        return orderRepository.findByUserId(user.getId()).stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse updateStatus(Integer orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderMapper.toResponse(orderRepository.save(order));
    }
}
