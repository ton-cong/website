package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDTO {

    private String email;

    private String fullName;

    private String phone;
    
    private String address;
    
    private String role;  // Accept as String, will convert to enum in service

}
