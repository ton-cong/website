package com.example.demo.service.impl;

import com.example.demo.dto.request.ProductRequest;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.enums.ProductStatus;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.service.CloudinaryService;
import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductMapper productMapper;
    private final CloudinaryService cloudinaryService;

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .specifications(request.getSpecifications())
                .price(request.getPrice())
                .salePrice(request.getSalePrice())
                .stock(request.getStock())
                .brand(request.getBrand())
                .cpu(request.getCpu())
                .ram(request.getRam())
                .storage(request.getStorage())
                .screen(request.getScreen())
                .status(request.getStatus() != null ? ProductStatus.valueOf(request.getStatus()) : ProductStatus.ACTIVE)
                .build();

        if (request.getCategoryName() != null) {
            Category category = categoryRepository.findByName(request.getCategoryName())
                    .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryName()));
            product.setCategoryId(category.getId());
            product.setCategory(category);
        }

        if (request.getImageFile() != null && !request.getImageFile().isEmpty()) {
            try {
                String imageUrl = cloudinaryService.uploadImage(request.getImageFile());
                product.setImageUrl(imageUrl);
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload image", e);
            }
        }

        productRepository.insert(product);
        return productMapper.toResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Integer id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getSpecifications() != null) product.setSpecifications(request.getSpecifications());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getSalePrice() != null) product.setSalePrice(request.getSalePrice());
        if (request.getStock() != null) product.setStock(request.getStock());
        if (request.getBrand() != null) product.setBrand(request.getBrand());
        if (request.getCpu() != null) product.setCpu(request.getCpu());
        if (request.getRam() != null) product.setRam(request.getRam());
        if (request.getStorage() != null) product.setStorage(request.getStorage());
        if (request.getScreen() != null) product.setScreen(request.getScreen());
        if (request.getStatus() != null) product.setStatus(ProductStatus.valueOf(request.getStatus()));

        if (request.getCategoryName() != null) {
            Category category = categoryRepository.findByName(request.getCategoryName())
                    .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryName()));
            product.setCategoryId(category.getId());
            product.setCategory(category);
        }

        if (request.getImageFile() != null && !request.getImageFile().isEmpty()) {
            try {
                String imageUrl = cloudinaryService.uploadImage(request.getImageFile());
                product.setImageUrl(imageUrl);
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload image", e);
            }
        }

        productRepository.save(product);
        return productMapper.toResponse(product);
    }

    @Override
    public boolean deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        orderItemRepository.deleteByProductId(id);
        cartItemRepository.deleteByProductId(id);
        reviewRepository.deleteByProductId(id);
        productRepository.deleteById(id);
        return true;
    }

    @Override
    public ProductResponse getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return productMapper.toResponse(product);
    }

    @Override
    public List<ProductResponse> getAllProduct() {
        return productRepository.findAll().stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<ProductResponse> getAllProduct(int page, int size, String sortBy, String sortDir) {
        long total = productRepository.count();
        int offset = page * size;
        List<ProductResponse> list = productRepository.findAllPaged(sortBy, sortDir, size, offset)
                .stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(list, PageRequest.of(page, size), total);
    }

    @Override
    public Page<ProductResponse> searchProducts(String keyword, Integer categoryId,
                                                 int page, int size,
                                                 String sortBy, String sortDir) {
        long total = productRepository.countSearch(keyword, categoryId);
        int offset = page * size;
        List<ProductResponse> list = productRepository.searchProducts(keyword, categoryId,
                        sortBy, sortDir, size, offset)
                .stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(list, PageRequest.of(page, size), total);
    }
}
