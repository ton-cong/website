package com.example.demo.service.impl;

import com.example.demo.dto.response.NotificationResponse;
import com.example.demo.entity.Notification;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    private Integer getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @Override
    public void createAndSendNotification(Integer userId, String type, String content) {
        Notification notification = Notification.builder()
                .userId(userId)
                .type(type)
                .content(content)
                .isRead(false)
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();
                
        notificationRepository.insert(notification);
        
        NotificationResponse response = mapToResponse(notification);
        
        // Push to WebSocket specific to the user
        messagingTemplate.convertAndSend("/topic/notifications/" + userId, response);
    }

    @Override
    public List<NotificationResponse> getMyNotifications() {
        Integer userId = getCurrentUserId();
        return notificationRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void markAsRead(Integer notificationId) {
        notificationRepository.markAsRead(notificationId);
    }

    @Override
    public void markAllAsRead() {
        Integer userId = getCurrentUserId();
        notificationRepository.markAllAsRead(userId);
    }

    @Override
    public int getUnreadCount() {
        Integer userId = getCurrentUserId();
        return notificationRepository.countUnreadByUserId(userId);
    }

    private NotificationResponse mapToResponse(Notification n) {
        return NotificationResponse.builder()
                .id(n.getId())
                .userId(n.getUserId())
                .type(n.getType())
                .content(n.getContent())
                .isRead(n.getIsRead())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
