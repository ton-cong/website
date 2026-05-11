package com.example.demo.repository;

import com.example.demo.entity.ProductVariant;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ProductVariantRepository {
    Optional<ProductVariant> findById(@Param("id") Integer id);
    List<ProductVariant> findByProductId(@Param("productId") Integer productId);
    void insert(ProductVariant variant);
    void save(ProductVariant variant);
    void deleteById(@Param("id") Integer id);
    void deleteByProductId(@Param("productId") Integer productId);
}
