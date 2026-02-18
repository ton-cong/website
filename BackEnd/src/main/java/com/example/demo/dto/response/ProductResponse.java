package com.example.demo.dto.response;

import com.example.demo.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal salePrice;
    private String imageUrl;
    private String brand;
    private String cpu;
    private String ram;
    private String storage;
    private String screen;
    private ProductStatus status;
    private Integer categoryId;
    private String categoryName;
    private Integer stock;
    private String specifications;
}
