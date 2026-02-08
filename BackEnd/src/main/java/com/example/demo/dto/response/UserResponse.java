package com.example.demo.dto.response;

import com.example.demo.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private long id;
    private String email;
    private String fullName;
    private String phone;
    private String address;
    private Role role;  // Changed from 'roles' to match User entity
}
