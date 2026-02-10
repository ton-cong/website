package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse {
    private Integer id;
    private String userName;
    private String userEmail;
    private Integer productId;
    private String productName;
    private Integer rating;
    private String comment;
    private Timestamp createdAt;
}
