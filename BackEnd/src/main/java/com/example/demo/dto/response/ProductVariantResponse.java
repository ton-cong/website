package com.example.demo.dto.response;

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
public class ProductVariantResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

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
