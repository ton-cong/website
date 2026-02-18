package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.UpdateUserDTO;
import com.example.demo.dto.request.ChangePasswordRequest;
import com.example.demo.dto.request.ForgetPasswordRequest;
import com.example.demo.dto.request.LoginRequestDTO;
import com.example.demo.dto.request.RegisterRequestDTO;
import com.example.demo.dto.response.AuthResponseDTO;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Authentication", description = "User registration, login, password management, and profile update")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    private ApiResponse<UserResponse> register(@Valid @RequestBody RegisterRequestDTO request) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.registerUser(request));
        return apiResponse;
    }

    @PostMapping("/login")
    @Operation(summary = "Login and get JWT token")
    private ApiResponse<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        ApiResponse<AuthResponseDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.login(request));
        return apiResponse;
    }

    @PostMapping("/logout")
    private ResponseEntity<?> logout(HttpServletRequest request) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        ((HttpServletResponse) request).addCookie(cookie);
        return ResponseEntity.ok("logout success");

    }

    @PostMapping("/changePass")
    @Operation(summary = "Change password (authenticated)")
    public ApiResponse<UserResponse> changePass(@RequestBody ChangePasswordRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.changePassword(email,request));
        return apiResponse;
    }

    @PostMapping("/forgetPass")
    @Operation(summary = "Reset forgotten password via email")
    public ApiResponse<UserResponse> forgetPass(@RequestBody ForgetPasswordRequest request) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.forgetPass(request));
        return apiResponse;
    }

    @PostMapping("/profile/update")
    @Operation(summary = "Update user profile (authenticated)")
    public ApiResponse<UserResponse> updateProfile(@RequestBody UpdateUserDTO request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authService.updateUserByEmail(email, request));
        return apiResponse;
    }
}

