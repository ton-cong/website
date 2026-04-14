package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MessageRequest {
    private Integer conversationId; // Optional: If null, means creating a new conversation with admin
    
    @NotBlank(message = "Content cannot be empty")
    private String content;

    private String messageType = "text"; // text, image, file, video
}
