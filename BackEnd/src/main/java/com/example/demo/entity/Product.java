package com.example.demo.entity;

import com.example.demo.enums.ProductStatus;
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
public class Product {
    private Integer id;
    private String name;
    private Integer categoryId;
    private String description;
    private String specifications;
    private BigDecimal price;
    private BigDecimal salePrice;
    private Integer stock;
    private String imageUrl;
    private String brand;
    private String cpu;
    private String ram;
    private String storage;
    private String screen;
    private ProductStatus status;
    private Timestamp createdAt;

    private Category category;
}
