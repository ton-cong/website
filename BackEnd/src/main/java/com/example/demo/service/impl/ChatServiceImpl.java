package com.example.demo.service.impl;

import com.example.demo.dto.request.MessageRequest;
import com.example.demo.dto.response.ConversationResponse;
import com.example.demo.dto.response.MessageResponse;
import com.example.demo.entity.ChatMessage;
import com.example.demo.entity.Conversation;
import com.example.demo.entity.User;
import com.example.demo.mapper.ChatMapper;
import com.example.demo.repository.ConversationRepository;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ChatService;
import com.example.demo.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private final NotificationService notificationService;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    @Transactional
    public MessageResponse sendMessage(MessageRequest request) {
        User currentUser = getCurrentUser();
        
        Conversation conversation = null;
        if (request.getConversationId() != null) {
            conversation = conversationRepository.findById(request.getConversationId())
                    .orElse(null);
            
            if (conversation != null && com.example.demo.enums.Role.USER == currentUser.getRole()) {
                if (!conversation.getUserId().equals(currentUser.getId())) {
                    // Stale cache ID belonging to another user. Gracefully ignore.
                    conversation = null;
                }
            }
        }

        if (conversation == null) {
            // If user role, check if they already have one, else create one
            if (com.example.demo.enums.Role.USER == currentUser.getRole()) {
                conversation = conversationRepository.findByUserId(currentUser.getId())
                        .orElseGet(() -> {
                            Conversation newConv = Conversation.builder()
                                    .userId(currentUser.getId())
                                    // adminId can be assigned later when an admin replies
                                    .build();
                            conversationRepository.insert(newConv);
                            return newConv;
                        });
            } else {
                throw new RuntimeException("Conversation not found. Admin cannot create a new conversation without specifying the target.");
            }
        }

        ChatMessage message = ChatMessage.builder()
                .senderId(currentUser.getId())
                .conversationId(conversation.getId())
                .content(request.getContent())
                .messageType(request.getMessageType() != null ? request.getMessageType() : "text")
                .build();

        messageRepository.insert(message);

        // Update last message in conversation
        conversation.setLastMessage(message.getContent());
        conversation.setLastMessageAt(new Timestamp(System.currentTimeMillis()));
        if (com.example.demo.enums.Role.ADMIN == currentUser.getRole()) {
            conversation.setAdminId(currentUser.getId());
        }
        conversationRepository.updateLastMessage(conversation);

        // Refresh user for mapped response
        message.setSender(currentUser);

        // Trigger Notification
        if (com.example.demo.enums.Role.ADMIN == currentUser.getRole()) {
            String content = "Bạn có tin nhắn mới từ Cửa hàng";
            notificationService.createAndSendNotification(conversation.getUserId(), "message", content);
        } else {
            // Notify all admins (for a scalable app, query by role in DB, here we filter findAll)
            String content = "Tin nhắn mới từ khách hàng " + currentUser.getFullName();
            userRepository.findAll().stream()
                .filter(u -> com.example.demo.enums.Role.ADMIN == u.getRole())
                .forEach(admin -> 
                    notificationService.createAndSendNotification(admin.getId(), "message", content)
                );
        }

        return chatMapper.toMessageResponse(message);
    }

    @Override
    public List<MessageResponse> getMessages(Integer conversationId) {
        User currentUser = getCurrentUser();
        
        if (com.example.demo.enums.Role.USER == currentUser.getRole()) {
            Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
            
            if (conversation == null || !conversation.getUserId().equals(currentUser.getId())) {
                return Collections.emptyList();
            }
        }
        
        return messageRepository.findByConversationId(conversationId).stream()
                .map(chatMapper::toMessageResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ConversationResponse> getConversations() {
        User currentUser = getCurrentUser();
        if (com.example.demo.enums.Role.ADMIN == currentUser.getRole()) {
            return conversationRepository.findAll().stream()
                    .map(chatMapper::toConversationResponse)
                    .collect(Collectors.toList());
        } else {
            return conversationRepository.findByUserId(currentUser.getId())
                    .map(chatMapper::toConversationResponse)
                    .map(Collections::singletonList)
                    .orElse(Collections.emptyList());
        }
    }
}
