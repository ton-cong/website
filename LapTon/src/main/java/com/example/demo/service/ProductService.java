package com.example.demo.service;

import com.example.demo.dto.request.ProductRequest;
import com.example.demo.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Integer id, ProductRequest request);

    boolean deleteProduct(Integer id);

    ProductResponse getProductById(Integer id);

    List<ProductResponse> getAllProduct();
}
