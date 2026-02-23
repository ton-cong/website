package com.example.demo.entity;

import com.example.demo.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private Integer id;
    private String email;
    private String passwordHash;
    private String fullName;
    private String phone;
    private String address;
    private Role role;
    private Timestamp createdAt;
}
