package com.example.demo.repository;

import com.example.demo.entity.Review;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewRepository {
    List<Review> findByProductId(@Param("productId") Integer productId);
    List<Review> findAll();
    List<Review> findAllPaged(@Param("sortBy") String sortBy, @Param("sortDir") String sortDir,
                              @Param("limit") int limit, @Param("offset") int offset);
    long count();
    boolean existsById(@Param("id") Integer id);
    void insert(Review review);
    void deleteById(@Param("id") Integer id);
    void deleteByProductId(@Param("productId") Integer productId);
}
