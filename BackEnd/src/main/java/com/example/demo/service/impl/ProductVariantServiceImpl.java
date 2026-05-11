package com.example.demo.service.impl;

import com.example.demo.dto.request.ProductVariantRequest;
import com.example.demo.dto.response.ProductVariantResponse;
import com.example.demo.entity.ProductVariant;
import com.example.demo.exception.AppException;
import com.example.demo.enums.ErrorCode;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.repository.ProductVariantRepository;
import com.example.demo.service.ProductVariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductVariantServiceImpl implements ProductVariantService {

    private final ProductVariantRepository variantRepository;
    private final ProductMapper productMapper;

    @Override
    public List<ProductVariantResponse> getByProductId(Integer productId) {
        return variantRepository.findByProductId(productId).stream()
                .map(productMapper::toVariantResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductVariantResponse getById(Integer id) {
        ProductVariant variant = variantRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION)); // Should be VARIANT_NOT_FOUND
        return productMapper.toVariantResponse(variant);
    }

    @Override
    @Transactional
    public ProductVariantResponse create(ProductVariantRequest request) {
        ProductVariant variant = ProductVariant.builder()
                .productId(request.getProductId())
                .specifications(request.getSpecifications())
                .price(request.getPrice())
                .salePrice(request.getSalePrice())
                .stock(request.getStock())
                .cpu(request.getCpu())
                .ram(request.getRam())
                .storage(request.getStorage())
                .screen(request.getScreen())
                .build();
        variantRepository.insert(variant);
        return productMapper.toVariantResponse(variant);
    }

    @Override
    @Transactional
    public ProductVariantResponse update(Integer id, ProductVariantRequest request) {
        ProductVariant variant = variantRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION));
        
        variant.setSpecifications(request.getSpecifications());
        variant.setPrice(request.getPrice());
        variant.setSalePrice(request.getSalePrice());
        variant.setStock(request.getStock());
        variant.setCpu(request.getCpu());
        variant.setRam(request.getRam());
        variant.setStorage(request.getStorage());
        variant.setScreen(request.getScreen());
        
        variantRepository.save(variant);
        return productMapper.toVariantResponse(variant);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        variantRepository.deleteById(id);
    }
}
