package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.CategoryRequestDTO;
import com.example.demo.dto.response.CategoryResponseDTO;
import com.example.demo.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@Tag(name = "Category", description = "Category management APIs")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new category", description = "Admin only")
    public ApiResponse<CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryRequestDTO request) {
        ApiResponse<CategoryResponseDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.createCategory(request));
        return apiResponse;
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a category", description = "Admin only")
    public ApiResponse<CategoryResponseDTO> updateCategory(
            @PathVariable int id,
            @Valid @RequestBody CategoryRequestDTO request
    ) {
        ApiResponse<CategoryResponseDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.updateCategory(id, request));
        return apiResponse;
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a category", description = "Admin only")
    public ApiResponse<Boolean> deleteCategory(@PathVariable int id) {
        ApiResponse<Boolean> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.deleteCategory(id));
        return apiResponse;
    }

    @GetMapping("/all")
    @Operation(summary = "Get all categories")
    public ApiResponse<List<CategoryResponseDTO>> getAllCategories() {
        ApiResponse<List<CategoryResponseDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.getAllCategory());
        return apiResponse;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get category by ID")
    public ApiResponse<CategoryResponseDTO> getCategoryById(@PathVariable int id) {
        ApiResponse<CategoryResponseDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.getById(id));
        return apiResponse;
    }
}
