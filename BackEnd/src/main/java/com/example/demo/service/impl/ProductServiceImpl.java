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
import com.example.demo.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

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
    @CacheEvict(value = "products", allEntries = true)
    public ProductResponse createProduct(ProductRequest request) {
        log.info("Creating product with request: {}", request);

        Product product = productMapper.toEntity(request);



        if (request.getCategoryName() == null || request.getCategoryName().trim().isEmpty()) {
            throw new RuntimeException("Category name is required");
        }

        Category category = categoryRepository.findByName(request.getCategoryName().trim())
                .orElseThrow(() -> new RuntimeException("Category not found with name: " + request.getCategoryName()));
        product.setCategory(category);

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
    @CacheEvict(value = "products", allEntries = true)
    public ProductResponse updateProduct(Integer id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productMapper.update(product, request);

        if (request.getCategoryName() != null && !request.getCategoryName().trim().isEmpty()) {
            Category category = categoryRepository.findByName(request.getCategoryName().trim())
                    .orElseThrow(() -> new RuntimeException("Category not found with name: " + request.getCategoryName()));
            product.setCategory(category);
        }

        if (request.getStatus() != null && !request.getStatus().isEmpty()) {
            try {
                product.setStatus(ProductStatus.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                log.warn("Invalid status: {}, keeping existing", request.getStatus());
            }
        }

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
    @CacheEvict(value = "products", allEntries = true)
    public boolean deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product ID not found");
        }

        productRepository.deleteById(id);
        return true;
    }

    @Override
    @Cacheable(value = "products", key = "'product_' + #id")
    public ProductResponse getProductById(Integer id) {
        log.info("Fetching product from DB with id: {}", id);
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

    @Override
    @Cacheable(value = "products", key = "'all_' + #page + '_' + #size + '_' + #sortBy + '_' + #sortDir")
    public Page<ProductResponse> getAllProduct(int page, int size, String sortBy, String sortDir) {
        log.info("Fetching all products from DB - page: {}, size: {}, sortBy: {}, sortDir: {}", page, size, sortBy, sortDir);

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return productRepository.findAll(pageable)
                .map(productMapper::toResponse);
    }

    @Override
    public Page<ProductResponse> searchProducts(String keyword, Integer categoryId,
                                                 Double minPrice, Double maxPrice,
                                                 int page, int size,
                                                 String sortBy, String sortDir) {
        log.info("Searching products - keyword: {}, categoryId: {}, minPrice: {}, maxPrice: {}", keyword, categoryId, minPrice, maxPrice);

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Product> spec = Specification
                .where(ProductSpecification.hasKeyword(keyword))
                .and(ProductSpecification.hasCategory(categoryId))
                .and(ProductSpecification.priceBetween(minPrice, maxPrice));

        return productRepository.findAll(spec, pageable)
                .map(productMapper::toResponse);
    }
}
