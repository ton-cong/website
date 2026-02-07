package com.example.demo.dto.response;

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
public class OrderResponse {
    private Integer id;
    private String fullName;
    private String phone;
    private String address;
    private String note;
    private Double totalPrice;
    private OrderStatus status;
    private Timestamp createdAt;
    private List<OrderItemResponse> items;
}
