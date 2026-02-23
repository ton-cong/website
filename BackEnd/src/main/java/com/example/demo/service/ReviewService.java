package com.example.demo.service;

import com.example.demo.dto.request.ReviewRequest;
import com.example.demo.dto.response.ReviewResponse;
import org.springframework.data.domain.Page;
import java.util.List;

public interface ReviewService {
    ReviewResponse addReview(ReviewRequest request);
    List<ReviewResponse> getReviewsByProduct(Integer productId);
    List<ReviewResponse> getAllReviews();
    Page<ReviewResponse> getAllReviews(int page, int size, String sortBy, String sortDir);
    void deleteReview(Integer id);
}
