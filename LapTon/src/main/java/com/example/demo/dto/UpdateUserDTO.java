package com.example.demo.dto;

import com.example.demo.enums.Gender;

import java.time.LocalDate;

public class UpdateUserDTO {

    private String email;

    private String fullName;

    private String phone;

    private String avatarUrl;

    private LocalDate dateOfBirth;

    private Gender gender;

}
