package com.example.demo.entity;

import com.example.demo.enums.ProductStatus;
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
public class Product {
    private Integer id;
    private String name;
    private Integer categoryId;
    private String description;
    private String imageUrl;
    private String brand;
    private ProductStatus status;
    private Timestamp createdAt;
    private Boolean deleted;
    private String content;

    private Category category;
    private List<ProductVariant> variants;
}
