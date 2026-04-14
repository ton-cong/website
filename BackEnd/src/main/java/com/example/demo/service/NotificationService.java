package com.example.demo.service;

import com.example.demo.dto.response.NotificationResponse;
import java.util.List;

public interface NotificationService {
    void createAndSendNotification(Integer userId, String type, String content);
    List<NotificationResponse> getMyNotifications();
    void markAsRead(Integer notificationId);
    void markAllAsRead();
    int getUnreadCount();
}
