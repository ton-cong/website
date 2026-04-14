package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    private Integer id;
    private Integer senderId;
    private Integer conversationId;
    private String content;
    private String messageType;
    private Timestamp createdAt;

    private User sender;
}
