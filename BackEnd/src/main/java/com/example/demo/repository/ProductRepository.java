package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ProductRepository {
    Optional<Product> findById(@Param("id") Integer id);
    List<Product> findAll();
    List<Product> findAllPaged(@Param("sortBy") String sortBy, @Param("sortDir") String sortDir,
                               @Param("limit") int limit, @Param("offset") int offset);
    List<Product> searchProducts(@Param("keyword") String keyword,
                                 @Param("categoryId") Integer categoryId,
                                 @Param("brand") String brand,
                                 @Param("cpu") String cpu,
                                 @Param("ram") String ram,
                                 @Param("storage") String storage,
                                 @Param("minPrice") Long minPrice,
                                 @Param("maxPrice") Long maxPrice,
                                 @Param("sortBy") String sortBy,
                                 @Param("sortDir") String sortDir,
                                 @Param("limit") int limit,
                                 @Param("offset") int offset);
    long count();
    long countSearch(@Param("keyword") String keyword,
                     @Param("categoryId") Integer categoryId,
                     @Param("brand") String brand,
                     @Param("cpu") String cpu,
                     @Param("ram") String ram,
                     @Param("storage") String storage,
                     @Param("minPrice") Long minPrice,
                     @Param("maxPrice") Long maxPrice);
    List<String> getDistinctBrands();
    boolean existsById(@Param("id") Integer id);
    void insert(Product product);
    void save(Product product);
    void deleteById(@Param("id") Integer id);
}
