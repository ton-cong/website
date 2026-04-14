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
public class Conversation {
    private Integer id;
    private Integer userId;
    private Integer adminId;
    private String lastMessage;
    private Timestamp lastMessageAt;
    private Timestamp createdAt;

    private User user;
    private User admin;
}
