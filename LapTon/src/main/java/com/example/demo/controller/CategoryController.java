package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.CategoryRequestDTO;
import com.example.demo.dto.response.CategoryResponseDTO;
import com.example.demo.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // CREATE
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ApiResponse<CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryRequestDTO request) {
        ApiResponse<CategoryResponseDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.createCategory(request));
        return apiResponse;
    }

    // UPDATE
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ApiResponse<CategoryResponseDTO> updateCategory(
            @PathVariable int id,
            @Valid @RequestBody CategoryRequestDTO request
    ) {
        ApiResponse<CategoryResponseDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.updateCategory(id, request));
        return apiResponse;
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ApiResponse<Boolean> deleteCategory(@PathVariable int id) {
        ApiResponse<Boolean> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.deleteCategory(id));
        return apiResponse;
    }

    // GET ALL
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ApiResponse<List<CategoryResponseDTO>> getAllCategories() {
        ApiResponse<List<CategoryResponseDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.getAllCategory());
        return apiResponse;
    }

    // GET BY ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ApiResponse<CategoryResponseDTO> getCategoryById(@PathVariable int id) {
        ApiResponse<CategoryResponseDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(categoryService.getById(id));
        return apiResponse;
    }
}
