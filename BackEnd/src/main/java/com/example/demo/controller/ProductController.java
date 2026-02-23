package com.example.demo.controller;

import com.example.demo.dto.request.ProductRequest;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Product", description = "Product management APIs - CRUD, pagination, search & filter")
public class ProductController {

    private final ProductService productService;

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new product", description = "Admin only. Supports image upload via multipart form data.")
    public ProductResponse createProduct(@ModelAttribute ProductRequest request) {
        return productService.createProduct(request);
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing product", description = "Admin only. Partial update supported.")
    public ProductResponse updateProduct(@PathVariable Integer id, @ModelAttribute ProductRequest request) {
        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a product", description = "Admin only. Permanently removes the product.")
    public void deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/getProductById/{id}")
    @Operation(summary = "Get product by ID", description = "Public endpoint. Returns cached result.")
    public ProductResponse getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    @GetMapping("/getAllProduct")
    @Operation(summary = "Get all products (paginated)", description = "Public endpoint with pagination and sorting support.")
    public Page<ProductResponse> getAllProduct(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field (e.g. price, name, createdAt)") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Sort direction: asc or desc") @RequestParam(defaultValue = "asc") String sortDir
    ) {
        return productService.getAllProduct(page, size, sortBy, sortDir);
    }

    @GetMapping("/search")
    @Operation(summary = "Search & filter products", description = "Public endpoint. Supports keyword search, category filter with pagination.")
    public Page<ProductResponse> searchProducts(
            @Parameter(description = "Search keyword (matches name, description, brand)") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by category ID") @RequestParam(required = false) Integer categoryId,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Sort direction: asc or desc") @RequestParam(defaultValue = "asc") String sortDir
    ) {
        return productService.searchProducts(keyword, categoryId, page, size, sortBy, sortDir);
    }
}
