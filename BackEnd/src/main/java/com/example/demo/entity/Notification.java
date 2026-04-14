package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    private Integer id;
    private Integer userId;
    private String type;
    private String content;
    private Boolean isRead;
    private Timestamp createdAt;
}
