package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariant {
    private Integer id;
    private Integer productId;
    private String specifications;
    private BigDecimal price;
    private BigDecimal salePrice;
    private Integer stock;
    private String cpu;
    private String ram;
    private String storage;
    private String screen;
    private Timestamp createdAt;
    private Boolean deleted;

    private Product product;
}
