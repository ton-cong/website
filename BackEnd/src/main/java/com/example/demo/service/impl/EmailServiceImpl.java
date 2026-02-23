package com.example.demo.service.impl;

import com.example.demo.entity.Order;
import com.example.demo.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Override
    @Async
    public void sendOrderConfirmation(Order order) {
        log.info("Starting to send order confirmation email for Order ID: {}", order.getId());
        try {

            Thread.sleep(5000); 
            log.info("Email sent successfully for Order ID: {}", order.getId());
        } catch (InterruptedException e) {
            log.error("Failed to send email", e);
            Thread.currentThread().interrupt();
        }
    }

    @Override
    @Async
    public void sendNewPassword(String email, String newPassword) {
        log.info("Sending new password to email: {}", email);
        try {
            Thread.sleep(2000);
            log.info("New password email sent successfully to: {}", email);
        } catch (InterruptedException e) {
            log.error("Failed to send new password email", e);
            Thread.currentThread().interrupt();
        }
    }
}
