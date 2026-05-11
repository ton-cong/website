package com.example.demo.dto.response;

import com.example.demo.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

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
    private BigDecimal price; // Derived from first variant
    private BigDecimal salePrice; // Derived from first variant
    private String imageUrl;
    private String brand;
    private String cpu; // Derived from first variant
    private String ram; // Derived from first variant
    private String storage; // Derived from first variant
    private String screen; // Derived from first variant
    private ProductStatus status;
    private Integer categoryId;
    private String categoryName;
    private Integer stock; // Derived from first variant
    private String specifications; // Derived from first variant
    private String content;

    private List<ProductVariantResponse> variants;
}
