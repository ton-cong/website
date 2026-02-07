package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.request.ReviewRequest;
import com.example.demo.dto.response.ReviewResponse;
import com.example.demo.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
}
