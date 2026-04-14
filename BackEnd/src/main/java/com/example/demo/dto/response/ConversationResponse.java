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
public class ConversationResponse {
    private Integer id;
    private Integer userId;
    private String userName;
    private String userEmail;
    private Integer adminId;
    private String lastMessage;
    private Timestamp lastMessageAt;
    private Timestamp createdAt;
}
