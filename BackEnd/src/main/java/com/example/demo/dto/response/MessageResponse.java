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
public class MessageResponse {
    private Integer id;
    private Integer senderId;
    private String senderName;
    private String senderEmail;
    private Integer conversationId;
    private String content;
    private String messageType;
    private Timestamp createdAt;
}
