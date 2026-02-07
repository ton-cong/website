package com.example.demo.service.impl;

import com.example.demo.dto.request.ProductRequest;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.enums.ProductStatus;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.CloudinaryService;
import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;
    private final CloudinaryService cloudinaryService;


    @Override
    public ProductResponse createProduct(ProductRequest request) {
        log.info("Creating product with request: {}", request);
        
        Product product = productMapper.toEntity(request);

        // Xử lý category
        if (request.getCategoryId() == null) {
            throw new RuntimeException("categoryId is required");
        }
        
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
        product.setCategory(category);

        // Xử lý status từ String sang Enum
        if (request.getStatus() != null && !request.getStatus().isEmpty()) {
            try {
                product.setStatus(ProductStatus.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                log.warn("Invalid status: {}, defaulting to AVAILABLE", request.getStatus());
                product.setStatus(ProductStatus.ACTIVE);
            }
        } else {
            product.setStatus(ProductStatus.ACTIVE);
        }

        // Xử lý upload ảnh
        if (request.getImageFile() != null && !request.getImageFile().isEmpty()) {
            try {
                product.setImageUrl(cloudinaryService.uploadImage(request.getImageFile()));
            } catch (IOException e) {
                log.error("Failed to upload image", e);
                throw new RuntimeException("Failed to upload image: " + e.getMessage());
            }
        }

        Product saved = productRepository.save(product);
        log.info("Product created successfully with id: {}", saved.getId());
        return productMapper.toResponse(saved);
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

        // Xử lý status từ String sang Enum
        if (request.getStatus() != null && !request.getStatus().isEmpty()) {
            try {
                product.setStatus(ProductStatus.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                log.warn("Invalid status: {}, keeping existing", request.getStatus());
            }
        }

        // Xử lý upload ảnh mới
        if (request.getImageFile() != null && !request.getImageFile().isEmpty()) {
            try {
                product.setImageUrl(cloudinaryService.uploadImage(request.getImageFile()));
            } catch (IOException e) {
                log.error("Failed to upload image", e);
                throw new RuntimeException("Failed to upload image: " + e.getMessage());
            }
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
