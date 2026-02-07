package com.example.demo.service;

import com.example.demo.dto.request.OrderRequest;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.enums.OrderStatus;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    List<OrderResponse> getMyOrders();
    List<OrderResponse> getAllOrders();
    OrderResponse updateStatus(Integer orderId, OrderStatus status);
}
