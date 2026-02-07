package com.example.demo.dto.request;

import com.example.demo.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    private String name;
    private Integer categoryId;
    private String description;
    private String specifications;
    private Double price;          // Changed from BigDecimal to match entity
    private Double salePrice;      // Changed from BigDecimal to match entity
    private Integer stock;
    private MultipartFile imageFile;
    private String brand;
    private String cpu;
    private String ram;
    private String storage;
    private String screen;
    private String status;         // Changed to String to handle any status format

}
