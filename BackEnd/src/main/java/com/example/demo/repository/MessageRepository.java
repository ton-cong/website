package com.example.demo.repository;

import com.example.demo.entity.ChatMessage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MessageRepository {
    List<ChatMessage> findByConversationId(@Param("conversationId") Integer conversationId);
    void insert(ChatMessage message);
}
