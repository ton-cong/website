package com.example.demo.service;

import com.example.demo.dto.request.ChangePasswordRequest;
import com.example.demo.dto.request.ForgetPasswordRequest;
import com.example.demo.dto.request.LoginRequestDTO;
import com.example.demo.dto.request.RegisterRequestDTO;
import com.example.demo.dto.UpdateUserDTO;
import com.example.demo.dto.response.AuthResponseDTO;
import com.example.demo.dto.response.UserResponse;

import java.util.List;

public interface AuthService {
    UserResponse registerUser(RegisterRequestDTO request);
    AuthResponseDTO login (LoginRequestDTO request);
    UserResponse getUserById(Integer id);
    List<UserResponse> getAllUsers();
    UpdateUserDTO updateUser(Integer id, UpdateUserDTO request);
    boolean deleteUser(Integer id);
    UserResponse getUserByEmail(String email);
    UserResponse changePassword(String email,ChangePasswordRequest request);
    UserResponse forgetPass(ForgetPasswordRequest request );
}
