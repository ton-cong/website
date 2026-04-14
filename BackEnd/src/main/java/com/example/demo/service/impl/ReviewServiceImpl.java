package com.example.demo.service.impl;

import com.example.demo.dto.request.ReviewRequest;
import com.example.demo.dto.response.ReviewResponse;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import com.example.demo.mapper.ReviewMapper;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ReviewMapper reviewMapper;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public ReviewResponse addReview(ReviewRequest request) {
        User user = getCurrentUser();

        productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Review review = Review.builder()
                .userId(user.getId())
                .productId(request.getProductId())
                .rating(request.getRating())
                .comment(request.getComment())
                .parentId(request.getParentId())
                .build();

        reviewRepository.insert(review);

        List<Review> reviews = reviewRepository.findByProductId(request.getProductId());
        Review savedReview = reviews.stream()
                .filter(r -> r.getId().equals(review.getId()))
                .findFirst()
                .orElse(review);

        return reviewMapper.toResponse(savedReview);
    }

    @Override
    public List<ReviewResponse> getReviewsByProduct(Integer productId) {
        List<ReviewResponse> allReviews = reviewRepository.findByProductId(productId).stream()
                .map(reviewMapper::toResponse)
                .collect(Collectors.toList());
                
        java.util.Map<Integer, List<ReviewResponse>> groupedByParent = allReviews.stream()
                .filter(r -> r.getParentId() != null)
                .collect(Collectors.groupingBy(ReviewResponse::getParentId));
                
        allReviews.forEach(r -> {
            r.setReplies(groupedByParent.getOrDefault(r.getId(), new java.util.ArrayList<>()));
        });
        
        return allReviews.stream()
                .filter(r -> r.getParentId() == null)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponse> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(reviewMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<ReviewResponse> getAllReviews(int page, int size, String sortBy, String sortDir) {
        long total = reviewRepository.count();
        int offset = page * size;
        List<Review> parentReviews = reviewRepository.findAllPaged(sortBy, sortDir, size, offset);
        
        List<ReviewResponse> list = parentReviews.stream()
                .map(reviewMapper::toResponse)
                .collect(Collectors.toList());
                
        List<Integer> parentIds = list.stream().map(ReviewResponse::getId).collect(Collectors.toList());
        
        if (!parentIds.isEmpty()) {
            List<ReviewResponse> replies = reviewRepository.findRepliesByParentIds(parentIds).stream()
                    .map(reviewMapper::toResponse)
                    .collect(Collectors.toList());
            java.util.Map<Integer, List<ReviewResponse>> groupedByParent = replies.stream()
                    .collect(Collectors.groupingBy(ReviewResponse::getParentId));
            list.forEach(r -> {
                r.setReplies(groupedByParent.getOrDefault(r.getId(), new java.util.ArrayList<>()));
            });
        }
        
        return new PageImpl<>(list, PageRequest.of(page, size), total);
    }

    @Override
    public void deleteReview(Integer id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review not found with id: " + id);
        }
        reviewRepository.deleteRepliesByParentId(id);
        reviewRepository.deleteById(id);
    }
}
