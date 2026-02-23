package com.example.demo.repository;

import com.example.demo.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserRepository {
    Optional<User> findByEmail(@Param("email") String email);
    boolean existsByEmail(@Param("email") String email);
    Optional<User> findById(@Param("id") Integer id);
    List<User> findAll();
    List<User> findAllPaged(@Param("sortBy") String sortBy, @Param("sortDir") String sortDir,
                            @Param("limit") int limit, @Param("offset") int offset);
    long count();
    boolean existsById(@Param("id") Integer id);
    void insert(User user);
    void save(User user);
    void deleteById(@Param("id") Integer id);
}
