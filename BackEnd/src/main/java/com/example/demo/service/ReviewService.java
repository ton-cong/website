package com.example.demo.service;

import com.example.demo.dto.request.ReviewRequest;
import com.example.demo.dto.response.ReviewResponse;
import java.util.List;

public interface ReviewService {
    ReviewResponse addReview(ReviewRequest request);
    List<ReviewResponse> getReviewsByProduct(Integer productId);
    List<ReviewResponse> getAllReviews();
    void deleteReview(Integer id);
}
