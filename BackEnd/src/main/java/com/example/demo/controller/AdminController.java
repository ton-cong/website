package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.UpdateUserDTO;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Admin user management APIs")
public class AdminController {
    final AuthService authService;

    @GetMapping("/allUser")
    @Operation(summary = "Get all users")
    public ApiResponse<List<UserResponse>> getAllUser(){
        ApiResponse<List<UserResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.getAllUsers());
        return apiResponse;
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete a user by ID")
    public ApiResponse<Boolean> deleteUser(@PathVariable Integer id){
        ApiResponse<Boolean> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.deleteUser(id));
        return apiResponse;
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Get user by email")
    public ApiResponse<UserResponse> getUserByEmail(@PathVariable String email){
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.getUserByEmail(email));
        return apiResponse;
    }

    @GetMapping("/id/{id}")
    @Operation(summary = "Get user by ID")
    public ApiResponse<UserResponse> getUserById(@PathVariable Integer id){
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.getUserById(id));
        return apiResponse;
    }
    @PostMapping("/update/{id}")
    @Operation(summary = "Update user by ID")
    public ApiResponse<UserResponse> updateUser(@PathVariable Integer id, @Valid @RequestBody UpdateUserDTO updateUserDTO) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.updateUser(id, updateUserDTO));
        return apiResponse;
    }
}
