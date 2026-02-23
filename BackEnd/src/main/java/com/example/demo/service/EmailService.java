package com.example.demo.service;

import com.example.demo.entity.Order;

public interface EmailService {
    void sendOrderConfirmation(Order order);
    void sendNewPassword(String email, String newPassword);
}
