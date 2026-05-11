package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.ProductVariantRequest;
import com.example.demo.dto.response.ProductVariantResponse;
import com.example.demo.service.ProductVariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/variants")
@RequiredArgsConstructor
public class ProductVariantController {

    private final ProductVariantService variantService;

    @GetMapping("/product/{productId}")
    public ApiResponse<List<ProductVariantResponse>> getByProductId(@PathVariable Integer productId) {
        return ApiResponse.<List<ProductVariantResponse>>builder()
                .result(variantService.getByProductId(productId))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductVariantResponse> getById(@PathVariable Integer id) {
        return ApiResponse.<ProductVariantResponse>builder()
                .result(variantService.getById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<ProductVariantResponse> create(@RequestBody ProductVariantRequest request) {
        return ApiResponse.<ProductVariantResponse>builder()
                .result(variantService.create(request) )
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<ProductVariantResponse> update(@PathVariable Integer id, @RequestBody ProductVariantRequest request) {
        return ApiResponse.<ProductVariantResponse>builder()
                .result(variantService.update(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        variantService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Deleted variant successfully")
                .build();
    }
}
