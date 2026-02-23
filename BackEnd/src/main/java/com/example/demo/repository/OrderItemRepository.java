package com.example.demo.repository;

import com.example.demo.entity.OrderItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderItemRepository {
    void insert(OrderItem orderItem);
    void insertAll(List<OrderItem> items);
    List<OrderItem> findByOrderId(Integer orderId);
    void deleteByProductId(@org.apache.ibatis.annotations.Param("productId") Integer productId);
}
