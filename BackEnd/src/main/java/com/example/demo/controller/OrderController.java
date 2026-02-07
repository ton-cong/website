package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.OrderRequest;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.enums.OrderStatus;
import com.example.demo.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@Valid @RequestBody OrderRequest request) {
        ApiResponse<OrderResponse> response = new ApiResponse<>();
        response.setResult(orderService.createOrder(request));
        return response;
    }

    @GetMapping("/my-orders")
    public ApiResponse<List<OrderResponse>> getMyOrders() {
        ApiResponse<List<OrderResponse>> response = new ApiResponse<>();
        response.setResult(orderService.getMyOrders());
        return response;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<OrderResponse>> getAllOrders() {
        ApiResponse<List<OrderResponse>> response = new ApiResponse<>();
        response.setResult(orderService.getAllOrders());
        return response;
    }

    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<OrderResponse> updateStatus(@PathVariable Integer orderId, @RequestParam OrderStatus status) {
        ApiResponse<OrderResponse> response = new ApiResponse<>();
        response.setResult(orderService.updateStatus(orderId, status));
        return response;
    }
}
