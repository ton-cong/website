package com.example.demo.service.impl;

import com.example.demo.dto.request.OrderRequest;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.entity.*;
import com.example.demo.enums.OrderStatus;
import com.example.demo.mapper.OrderMapper;
import com.example.demo.repository.*;
import com.example.demo.service.OrderService;
import com.example.demo.service.NotificationService;
import com.example.demo.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final NotificationService notificationService;
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

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double totalPrice = cartItems.stream()
                .mapToDouble(item -> {
                    Product product = item.getProduct();
                    double price = product != null && product.getPrice() != null ? product.getPrice().doubleValue() : 0;
                    return price * item.getQuantity();
                })
                .sum();

        Order order = Order.builder()
                .userId(user.getId())
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .note(request.getNote())
                .totalPrice(totalPrice)
                .status(OrderStatus.pending)
                .paymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "COD")
                .build();

        orderRepository.insert(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
                    
            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }
            
            // Deduct stock
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            double price = product.getPrice() != null ? product.getPrice().doubleValue() : 0;
            OrderItem orderItem = OrderItem.builder()
                    .orderId(order.getId())
                    .productId(product.getId())
                    .quantity(cartItem.getQuantity())
                    .price(price)
                    .build();
            orderItems.add(orderItem);
        }
        orderItemRepository.insertAll(orderItems);

        cartItemRepository.deleteByCartId(cart.getId());

        Order savedOrder = orderRepository.findById(order.getId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
                
        // Send email notification
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
    public Page<OrderResponse> getAllOrders(int page, int size, String sortBy, String sortDir) {
        long total = orderRepository.count();
        int offset = page * size;
        List<OrderResponse> list = orderRepository.findAllPaged(sortBy, sortDir, size, offset)
                .stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(list, PageRequest.of(page, size), total);
    }

    @Override
    public OrderResponse getOrderById(Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        // Security check: if not admin, ensure the order belongs to the current user
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email).orElse(null);
        
        if (currentUser != null && !currentUser.getRole().name().equals("ADMIN")) {
            if (!order.getUserId().equals(currentUser.getId())) {
                throw new RuntimeException("Access denied");
            }
        }
        
        return orderMapper.toResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse updateStatus(Integer orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
                
        // Restore stock if cancelled
        if (status == OrderStatus.cancelled && order.getStatus() != OrderStatus.cancelled) {
            List<OrderItem> items = orderItemRepository.findByOrderId(orderId);
            for (OrderItem item : items) {
                Product product = productRepository.findById(item.getProductId()).orElse(null);
                if (product != null) {
                    product.setStock(product.getStock() + item.getQuantity());
                    productRepository.save(product);
                }
            }
        }
        
        order.setStatus(status);
        orderRepository.save(order);
        Order updated = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
                
        String statusText;
        switch(status) {
            case pending: statusText = "Chờ xử lý"; break;
            case processing: statusText = "Đang xử lý"; break;
            case shipping: statusText = "Đang giao hàng"; break;
            case completed: statusText = "Đã hoàn thành"; break;
            case cancelled: statusText = "Đã hủy"; break;
            default: statusText = status.name();
        }
        String content = "Đơn hàng #" + orderId + " của bạn đã được chuyển sang trạng thái: " + statusText;
        notificationService.createAndSendNotification(order.getUserId(), "order", content);
        
        return orderMapper.toResponse(updated);
    }
}
