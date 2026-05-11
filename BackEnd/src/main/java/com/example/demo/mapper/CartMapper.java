package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.response.CartItemResponse;
import com.example.demo.dto.response.CartResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;

@Mapper(componentModel = "spring")
public interface CartMapper {
    @Mapping(target = "totalPrice", ignore = true)
    CartResponse toResponse(Cart cart);

    @Mapping(target = "productId", source = "productVariant.productId")
    @Mapping(target = "productName", source = "productVariant.product.name")
    @Mapping(target = "price", source = "productVariant.price")
    @Mapping(target = "imageUrl", source = "productVariant.product.imageUrl")
    CartItemResponse toItemResponse(CartItem cartItem);
}
