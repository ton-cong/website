package com.example.demo.dto.request;

import com.example.demo.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    private String name;
    private String categoryName;
    private String description;
    private String specifications;
    private BigDecimal price;
    private BigDecimal salePrice;
    private Integer stock;
    private MultipartFile imageFile;
    private String brand;
    private String cpu;
    private String ram;
    private String storage;
    private String screen;
    private String status;

}
