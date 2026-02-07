package com.example.demo.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewRequest {
    @NotNull(message = "Product ID is required")
    private Integer productId;

    @Min(1)
    @Max(5)
    private Integer rating;

    private String comment;
}
