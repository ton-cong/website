package com.example.demo.repository;

import com.example.demo.entity.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CategoryRepository {
    Optional<Category> findById(@Param("id") Integer id);
    Optional<Category> findByName(@Param("name") String name);
    List<Category> findAll();
    List<Category> findAllPaged(@Param("sortBy") String sortBy, @Param("sortDir") String sortDir,
                                @Param("limit") int limit, @Param("offset") int offset);
    long count();
    boolean existsById(@Param("id") Integer id);
    void insert(Category category);
    void save(Category category);
    void deleteById(@Param("id") Integer id);
}
