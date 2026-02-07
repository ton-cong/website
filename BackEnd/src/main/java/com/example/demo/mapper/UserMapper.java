package com.example.demo.mapper;

import com.example.demo.dto.UpdateUserDTO;
import com.example.demo.dto.request.RegisterRequestDTO;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.enums.Role;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequestDTO request);
    UserResponse toUserResponse(User user );
    void toUpdateUserDto(UpdateUserDTO dto, @MappingTarget User user);
}
