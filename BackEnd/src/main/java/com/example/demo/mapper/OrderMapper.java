package com.example.demo.mapper;

import com.example.demo.dto.response.OrderItemResponse;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "items", source = "items")
    OrderResponse toResponse(Order order);

    @Mapping(target = "productId", source = "productVariant.productId")
    @Mapping(target = "productName", source = "productVariant.product.name")
    @Mapping(target = "imageUrl", source = "productVariant.product.imageUrl")
    @Mapping(target = "ram", source = "productVariant.ram")
    @Mapping(target = "storage", source = "productVariant.storage")
    OrderItemResponse toItemResponse(OrderItem orderItem);
}
