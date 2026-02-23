package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface CartRepository {
    Optional<Cart> findByUserId(Integer userId);
    Optional<Cart> findById(Integer id);
    void insert(Cart cart);
    void save(Cart cart);
    void deleteById(Integer id);
}
