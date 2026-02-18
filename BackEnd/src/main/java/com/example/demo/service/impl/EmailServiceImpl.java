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
            log.info("Email sent successfully to user: {} for Order ID: {}", order.getUser().getEmail(), order.getId());
        } catch (InterruptedException e) {
            log.error("Failed to send email", e);
            Thread.currentThread().interrupt();
        }
    }
}
