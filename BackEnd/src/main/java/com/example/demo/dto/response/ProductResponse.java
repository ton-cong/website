package com.example.demo.dto.response;

import com.example.demo.entity.Product;
import com.example.demo.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
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

}
