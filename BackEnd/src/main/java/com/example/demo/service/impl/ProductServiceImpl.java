package com.example.demo.service.impl;

import com.example.demo.dto.request.ProductRequest;
import com.example.demo.dto.request.ProductVariantRequest;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariant;
import com.example.demo.enums.ProductStatus;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ProductVariantRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.service.CloudinaryService;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductMapper productMapper;
    private final CloudinaryService cloudinaryService;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .brand(request.getBrand())
                .content(request.getContent())
                .status(request.getStatus() != null ? ProductStatus.valueOf(request.getStatus()) : ProductStatus.ACTIVE)
                .build();

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
            product.setCategoryId(category.getId());
            product.setCategory(category);
        } else if (request.getCategoryName() != null) {
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

        List<ProductVariant> savedVariants = new ArrayList<>();
        if (request.getVariantsJson() != null && !request.getVariantsJson().isEmpty()) {
            try {
                List<ProductVariantRequest> variants = objectMapper.readValue(request.getVariantsJson(), new TypeReference<List<ProductVariantRequest>>() {});
                for (ProductVariantRequest vReq : variants) {
                    ProductVariant variant = ProductVariant.builder()
                            .productId(product.getId())
                            .specifications(vReq.getSpecifications())
                            .price(vReq.getPrice())
                            .salePrice(vReq.getSalePrice())
                            .stock(vReq.getStock() != null ? vReq.getStock() : 0)
                            .cpu(vReq.getCpu())
                            .ram(vReq.getRam())
                            .storage(vReq.getStorage())
                            .screen(vReq.getScreen())
                            .build();
                    productVariantRepository.insert(variant);
                    savedVariants.add(variant);
                }
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse variants JSON", e);
            }
        }
        product.setVariants(savedVariants);

        return productMapper.toResponse(product);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(Integer id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getBrand() != null) product.setBrand(request.getBrand());
        if (request.getContent() != null) product.setContent(request.getContent());
        if (request.getStatus() != null) product.setStatus(ProductStatus.valueOf(request.getStatus()));

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
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

        if (request.getVariantsJson() != null && !request.getVariantsJson().isEmpty()) {
            try {
                List<ProductVariantRequest> variantRequests = objectMapper.readValue(request.getVariantsJson(), new TypeReference<List<ProductVariantRequest>>() {});
                List<ProductVariant> existingVariants = productVariantRepository.findByProductId(id);
                
                // Identify variants to delete, update, and insert
                List<Integer> requestVariantIds = variantRequests.stream()
                        .filter(v -> v.getId() != null)
                        .map(ProductVariantRequest::getId)
                        .collect(Collectors.toList());

                for (ProductVariant ev : existingVariants) {
                    if (!requestVariantIds.contains(ev.getId())) {
                        productVariantRepository.deleteById(ev.getId());
                    }
                }

                List<ProductVariant> updatedList = new ArrayList<>();
                for (ProductVariantRequest vReq : variantRequests) {
                    if (vReq.getId() != null) {
                        // Update existing
                        ProductVariant ev = existingVariants.stream().filter(v -> v.getId().equals(vReq.getId())).findFirst().orElse(null);
                        if (ev != null) {
                            ev.setSpecifications(vReq.getSpecifications());
                            ev.setPrice(vReq.getPrice());
                            ev.setSalePrice(vReq.getSalePrice());
                            ev.setStock(vReq.getStock() != null ? vReq.getStock() : 0);
                            ev.setCpu(vReq.getCpu());
                            ev.setRam(vReq.getRam());
                            ev.setStorage(vReq.getStorage());
                            ev.setScreen(vReq.getScreen());
                            productVariantRepository.save(ev);
                            updatedList.add(ev);
                        }
                    } else {
                        // Insert new
                        ProductVariant nv = ProductVariant.builder()
                                .productId(id)
                                .specifications(vReq.getSpecifications())
                                .price(vReq.getPrice())
                                .salePrice(vReq.getSalePrice())
                                .stock(vReq.getStock() != null ? vReq.getStock() : 0)
                                .cpu(vReq.getCpu())
                                .ram(vReq.getRam())
                                .storage(vReq.getStorage())
                                .screen(vReq.getScreen())
                                .build();
                        productVariantRepository.insert(nv);
                        updatedList.add(nv);
                    }
                }
                product.setVariants(updatedList);
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse variants JSON", e);
            }
        }

        return productMapper.toResponse(product);
    }

    @Override
    @Transactional
    public boolean deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        
        List<ProductVariant> variants = productVariantRepository.findByProductId(id);
        for (ProductVariant pv : variants) {
            orderItemRepository.deleteByProductVariantId(pv.getId());
            cartItemRepository.deleteByProductVariantId(pv.getId());
        }
        
        reviewRepository.deleteByProductId(id);
        productVariantRepository.deleteByProductId(id);
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
                                                String brand, String cpu, String ram, String storage,
                                                Long minPrice, Long maxPrice,
                                                int page, int size,
                                                String sortBy, String sortDir) {
        long total = productRepository.countSearch(keyword, categoryId, brand, cpu, ram, storage, minPrice, maxPrice);
        int offset = page * size;
        List<ProductResponse> list = productRepository.searchProducts(
                        keyword, categoryId, brand, cpu, ram, storage,
                        minPrice, maxPrice, sortBy, sortDir, size, offset)
                .stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(list, PageRequest.of(page, size), total);
    }

    @Override
    public List<String> getDistinctBrands() {
        return productRepository.getDistinctBrands();
    }
}
