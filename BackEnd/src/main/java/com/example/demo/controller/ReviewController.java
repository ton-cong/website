package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.ReviewRequest;
import com.example.demo.dto.response.ReviewResponse;
import com.example.demo.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ApiResponse<ReviewResponse> addReview(@Valid @RequestBody ReviewRequest request) {
        ApiResponse<ReviewResponse> response = new ApiResponse<>();
        response.setResult(reviewService.addReview(request));
        return response;
    }

    @GetMapping("/product/{productId}")
    public ApiResponse<List<ReviewResponse>> getReviewsByProduct(@PathVariable Integer productId) {
        ApiResponse<List<ReviewResponse>> response = new ApiResponse<>();
        response.setResult(reviewService.getReviewsByProduct(productId));
        return response;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<ReviewResponse>> getAllReviews() {
        ApiResponse<List<ReviewResponse>> response = new ApiResponse<>();
        response.setResult(reviewService.getAllReviews());
        return response;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult("Deleted successfully");
        return response;
    }
}
