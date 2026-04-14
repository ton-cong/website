package com.example.demo.repository;

import com.example.demo.entity.Notification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NotificationRepository {
    void insert(Notification notification);
    List<Notification> findByUserId(@Param("userId") Integer userId);
    void markAsRead(@Param("id") Integer id);
    void markAllAsRead(@Param("userId") Integer userId);
    int countUnreadByUserId(@Param("userId") Integer userId);
}
