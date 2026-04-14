package com.example.demo.service;

import com.example.demo.dto.request.MessageRequest;
import com.example.demo.dto.response.ConversationResponse;
import com.example.demo.dto.response.MessageResponse;

import java.util.List;

public interface ChatService {
    MessageResponse sendMessage(MessageRequest request);
    List<MessageResponse> getMessages(Integer conversationId);
    List<ConversationResponse> getConversations();
}
