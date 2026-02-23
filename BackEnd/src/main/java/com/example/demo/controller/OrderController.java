package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.OrderRequest;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.enums.OrderStatus;
import com.example.demo.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Order", description = "Order management APIs")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Create a new order from cart")
    public ApiResponse<OrderResponse> createOrder(@Valid @RequestBody OrderRequest request) {
        ApiResponse<OrderResponse> response = new ApiResponse<>();
        response.setResult(orderService.createOrder(request));
        return response;
    }

    @GetMapping("/my-orders")
    @Operation(summary = "Get current user's orders")
    public ApiResponse<List<OrderResponse>> getMyOrders() {
        ApiResponse<List<OrderResponse>> response = new ApiResponse<>();
        response.setResult(orderService.getMyOrders());
        return response;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all orders (paginated)", description = "Admin only. Supports pagination and sorting.")
    public Page<OrderResponse> getAllOrders(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Sort direction: asc or desc") @RequestParam(defaultValue = "desc") String sortDir
    ) {
        return orderService.getAllOrders(page, size, sortBy, sortDir);
    }

    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update order status", description = "Admin only")
    public ApiResponse<OrderResponse> updateStatus(@PathVariable Integer orderId, @RequestParam OrderStatus status) {
        ApiResponse<OrderResponse> response = new ApiResponse<>();
        response.setResult(orderService.updateStatus(orderId, status));
        return response;
    }
}
