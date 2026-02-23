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
public class Review {
    private Integer id;
    private Integer userId;
    private Integer productId;
    private Integer rating;
    private String comment;
    private Timestamp createdAt;

    private User user;
    private Product product;
}
