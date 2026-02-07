package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemResponse {
    private Integer id;
    private Integer productId;
    private String productName;
    private Integer quantity;
    private Double price;
    private String imageUrl;
}
