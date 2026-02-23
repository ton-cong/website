package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.ReviewRequest;
import com.example.demo.dto.response.ReviewResponse;
import com.example.demo.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Review", description = "Product review APIs")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    @Operation(summary = "Add a review for a product")
    public ApiResponse<ReviewResponse> addReview(@Valid @RequestBody ReviewRequest request) {
        ApiResponse<ReviewResponse> response = new ApiResponse<>();
        response.setResult(reviewService.addReview(request));
        return response;
    }

    @GetMapping("/product/{productId}")
    @Operation(summary = "Get reviews for a specific product")
    public ApiResponse<List<ReviewResponse>> getReviewsByProduct(@PathVariable Integer productId) {
        ApiResponse<List<ReviewResponse>> response = new ApiResponse<>();
        response.setResult(reviewService.getReviewsByProduct(productId));
        return response;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all reviews (paginated)", description = "Admin only. Supports pagination and sorting.")
    public Page<ReviewResponse> getAllReviews(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Sort direction: asc or desc") @RequestParam(defaultValue = "desc") String sortDir
    ) {
        return reviewService.getAllReviews(page, size, sortBy, sortDir);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a review", description = "Admin only")
    public ApiResponse<String> deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult("Deleted successfully");
        return response;
    }
}
