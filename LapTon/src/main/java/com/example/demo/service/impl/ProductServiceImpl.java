package com.example.demo.service.impl;

import com.example.demo.dto.request.ProductRequest;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.CloudinaryService;
import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;
    private final CloudinaryService cloudinaryService;


    @SneakyThrows
    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Product product = productMapper.toEntity(request);

        // Xử lý category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        product.setImageUrl(cloudinaryService.uploadImage(request.getImageFile()));

        return productMapper.toResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse updateProduct(Integer id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Cập nhật các field thường
        productMapper.update(product, request);

        // Cập nhật category nếu đổi
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        try {
            product.setImageUrl(cloudinaryService.uploadImage(request.getImageFile()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        return productMapper.toResponse(productRepository.save(product));
    }

    @Override
    public boolean deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product ID not found");
        }

        productRepository.deleteById(id);
        return true;
    }

    @Override
    public ProductResponse getProductById(Integer id) {
        return productMapper.toResponse(
                productRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Product not found"))
        );
    }

    @Override
    public List<ProductResponse> getAllProduct() {
        return productRepository.findAll().stream()
                .map(productMapper::toResponse)
                .toList();
    }
}
