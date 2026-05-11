package com.example.demo.repository;

import com.example.demo.entity.CartItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CartItemRepository {
    Optional<CartItem> findById(Integer id);
    List<CartItem> findByCartId(Integer cartId);
    void insert(CartItem cartItem);
    void save(CartItem cartItem);
    void deleteById(Integer id);
    void deleteByCartId(Integer cartId);
    void deleteByProductVariantId(@Param("productVariantId") Integer productVariantId);
}
