package com.example.demo.service;

import com.example.demo.dto.request.ProductRequest;
import com.example.demo.dto.response.ProductResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Integer id, ProductRequest request);

    boolean deleteProduct(Integer id);

    ProductResponse getProductById(Integer id);

    List<ProductResponse> getAllProduct();

    Page<ProductResponse> getAllProduct(int page, int size, String sortBy, String sortDir);

    Page<ProductResponse> searchProducts(String keyword, Integer categoryId,
                                          Double minPrice, Double maxPrice,
                                          int page, int size,
                                          String sortBy, String sortDir);
}
