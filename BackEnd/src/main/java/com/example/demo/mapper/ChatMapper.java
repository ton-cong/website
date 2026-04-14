package com.example.demo.mapper;

import com.example.demo.dto.response.ConversationResponse;
import com.example.demo.dto.response.MessageResponse;
import com.example.demo.entity.ChatMessage;
import com.example.demo.entity.Conversation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChatMapper {

    @Mapping(target = "userName", source = "user.fullName")
    @Mapping(target = "userEmail", source = "user.email")
    ConversationResponse toConversationResponse(Conversation conversation);

    @Mapping(target = "senderName", source = "sender.fullName")
    @Mapping(target = "senderEmail", source = "sender.email")
    MessageResponse toMessageResponse(ChatMessage message);
}
