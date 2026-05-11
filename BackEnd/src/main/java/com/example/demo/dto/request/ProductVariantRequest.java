package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantRequest {
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
}
