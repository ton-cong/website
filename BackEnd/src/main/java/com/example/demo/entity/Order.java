package com.example.demo.entity;

import com.example.demo.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    private Integer id;
    private Integer userId;
    private String fullName;
    private String phone;
    private String address;
    private String note;
    private Double totalPrice;
    private OrderStatus status;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    private List<OrderItem> items;
}
