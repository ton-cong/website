package com.example.demo.service.impl;

import com.example.demo.dto.UpdateUserDTO;
import com.example.demo.dto.request.ChangePasswordRequest;
import com.example.demo.dto.request.ForgetPasswordRequest;
import com.example.demo.dto.request.LoginRequestDTO;
import com.example.demo.dto.request.RegisterRequestDTO;
import com.example.demo.dto.response.AuthResponseDTO;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.enums.ErrorCode;
import com.example.demo.enums.Role;
import com.example.demo.exception.AppException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import com.example.demo.service.EmailService;
import com.example.demo.service.RandomPassService;
import com.example.demo.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final RandomPassService randomPassService;

    @Override
    public UserResponse registerUser(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User user = userMapper.toUser(request);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        userRepository.insert(user);
        return userMapper.toUserResponse(user);
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new AppException(ErrorCode.PASS_FAIL);
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return AuthResponseDTO.builder()
                .accessToken(token)
                .user(userMapper.toUserResponse(user))
                .build();
    }

    @Override
    public UserResponse getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<UserResponse> getAllUsers(int page, int size, String sortBy, String sortDir) {
        long total = userRepository.count();
        int offset = page * size;
        List<UserResponse> list = userRepository.findAllPaged(sortBy, sortDir, size, offset)
                .stream()
                .map(userMapper::toUserResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(list, PageRequest.of(page, size), total);
    }

    @Override
    public UserResponse updateUser(Integer id, UpdateUserDTO request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userMapper.toUpdateUserDto(request, user);
        if (request.getRole() != null) {
            user.setRole(Role.valueOf(request.getRole()));
        }
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    @Override
    public boolean deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        userRepository.deleteById(id);
        return true;
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse changePassword(String email, ChangePasswordRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setPasswordHash(passwordEncoder.encode(request.getPass()));
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse forgetPass(ForgetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        String newPass = randomPassService.generateRandomPass();
        user.setPasswordHash(passwordEncoder.encode(newPass));
        userRepository.save(user);
        emailService.sendNewPassword(user.getEmail(), newPass);
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse updateUserByEmail(String email, UpdateUserDTO request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userMapper.toUpdateUserDto(request, user);
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }
}
