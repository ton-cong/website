package com.example.demo.service;

import com.example.demo.dto.request.ProductVariantRequest;
import com.example.demo.dto.response.ProductVariantResponse;
import java.util.List;

public interface ProductVariantService {
    List<ProductVariantResponse> getByProductId(Integer productId);
    ProductVariantResponse getById(Integer id);
    ProductVariantResponse create(ProductVariantRequest request);
    ProductVariantResponse update(Integer id, ProductVariantRequest request);
    void delete(Integer id);
}
