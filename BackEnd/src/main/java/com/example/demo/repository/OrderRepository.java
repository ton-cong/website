package com.example.demo.repository;

import com.example.demo.entity.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface OrderRepository {
    Optional<Order> findById(@Param("id") Integer id);
    List<Order> findByUserId(@Param("userId") Integer userId);
    List<Order> findAll();
    List<Order> findAllPaged(@Param("sortBy") String sortBy, @Param("sortDir") String sortDir,
                             @Param("limit") int limit, @Param("offset") int offset);
    long count();
    void insert(Order order);
    void save(Order order);
    void deleteById(@Param("id") Integer id);
}
