package com.example.demo.repository;

import com.example.demo.entity.Conversation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ConversationRepository {
    Optional<Conversation> findById(@Param("id") Integer id);
    Optional<Conversation> findByUserId(@Param("userId") Integer userId);
    List<Conversation> findAll();
    void insert(Conversation conversation);
    void updateLastMessage(Conversation conversation);
}
