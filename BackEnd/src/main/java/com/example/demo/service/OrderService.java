package com.example.demo.service;

import com.example.demo.dto.request.OrderRequest;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.enums.OrderStatus;
import org.springframework.data.domain.Page;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    List<OrderResponse> getMyOrders();
    List<OrderResponse> getAllOrders();
    Page<OrderResponse> getAllOrders(int page, int size, String sortBy, String sortDir);
    OrderResponse updateStatus(Integer orderId, OrderStatus status);
}
