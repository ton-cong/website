package com.example.demo.mapper;

import com.example.demo.dto.response.ProductResponse;
import com.example.demo.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "categoryId", source = "categoryId")
    @Mapping(target = "categoryName", source = "category.name")
    ProductResponse toResponse(Product product);
}
