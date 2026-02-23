package com.example.demo.mapper;

import com.example.demo.dto.response.ReviewResponse;
import com.example.demo.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(target = "userName", source = "user.fullName")
    @Mapping(target = "userEmail", source = "user.email")
    @Mapping(target = "productId", source = "productId")
    @Mapping(target = "productName", source = "product.name")
    ReviewResponse toResponse(Review review);
}
