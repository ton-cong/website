package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // configures a message broker that routes messages from the application to the clients
        config.enableSimpleBroker("/topic", "/queue");
        // designates the prefix for messages from clients to the application
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // registers the "/ws" endpoint, enabling SockJS fallback options and allowing connections from specified origins
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // allow all origins
                .withSockJS(); // Enable SockJS fallback options
    }
}
