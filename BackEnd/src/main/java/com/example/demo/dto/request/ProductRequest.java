package com.example.demo.dto.request;

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
    private String categoryName;
    private String description;
    private MultipartFile imageFile;
    private String brand;
    private String status;
    private String content;

    // We accept variants as JSON string because frontend uses FormData
    private String variantsJson; 
}
