package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {
    private Integer id;
    private Integer userId;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    private User user;
    private List<CartItem> items;
}
