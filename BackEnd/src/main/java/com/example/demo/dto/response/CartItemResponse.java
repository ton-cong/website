package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {
    private Integer id;
    private Integer productId;
    private String productName;
    private Double price;
    private Integer quantity;
    private String imageUrl;
}
