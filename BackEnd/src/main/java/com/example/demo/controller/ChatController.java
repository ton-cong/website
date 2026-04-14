package com.example.demo.controller;

import com.example.demo.dto.request.MessageRequest;
import com.example.demo.dto.response.ConversationResponse;
import com.example.demo.dto.response.MessageResponse;
import com.example.demo.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor

public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/messages")
    public ResponseEntity<MessageResponse> sendMessageRest(@Valid @RequestBody MessageRequest request) {
        MessageResponse response = chatService.sendMessage(request);
        broadcastMessage(response);
        return ResponseEntity.ok(response);
    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessageWebSocket(@Payload MessageRequest request) {
        MessageResponse response = chatService.sendMessage(request);
        broadcastMessage(response);
    }
    
    private void broadcastMessage(MessageResponse response) {
        // broadcast to the specific conversation topic
        messagingTemplate.convertAndSend("/topic/conversations/" + response.getConversationId(), response);
        // also broadcast to an admin topic to notify admins
        messagingTemplate.convertAndSend("/topic/admin/conversations", response);
    }

    @GetMapping("/messages/{conversationId}")
    public ResponseEntity<List<MessageResponse>> getMessages(@PathVariable Integer conversationId) {
        return ResponseEntity.ok(chatService.getMessages(conversationId));
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationResponse>> getConversations() {
        return ResponseEntity.ok(chatService.getConversations());
    }
}
