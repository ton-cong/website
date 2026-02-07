package com.example.demo.service.impl;

import com.example.demo.dto.request.ChangePasswordRequest;
import com.example.demo.dto.request.ForgetPasswordRequest;
import com.example.demo.dto.request.LoginRequestDTO;
import com.example.demo.dto.request.RegisterRequestDTO;
import com.example.demo.dto.UpdateUserDTO;
import com.example.demo.dto.response.AuthResponseDTO;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.enums.ErrorCode;
import com.example.demo.enums.Role;
import com.example.demo.exception.AppException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import com.example.demo.service.RandomPassService;
import com.example.demo.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RandomPassService randomPassService;
    private final JavaMailSender mailSender;
    private static final Logger logger = (Logger) LoggerFactory.getLogger(AuthServiceImpl.class);


    @Override
    public UserResponse registerUser(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User user = userMapper.toUser(request);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        if (userRepository.count() == 0) {
            user.setRole(Role.ADMIN);
        } else {
            user.setRole(Role.USER);
        }
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO request){

        log.info("LOGIN REQUEST: email={}, password={}", request.getEmail(), "******");

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if(userOpt.isEmpty()){
            log.warn("LOGIN FAILED: email {} không tồn tại", request.getEmail());
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }

        User user = userOpt.get();

        if(!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())){
            log.warn("LOGIN FAILED: sai password cho email {}", request.getEmail());
            throw new AppException(ErrorCode.PASS_FAIL);
        }

        String token = jwtUtil.generateToken(request.getEmail());
        log.info("LOGIN SUCCESS: email={} | token={}", request.getEmail(), token);

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return AuthResponseDTO.builder()
                .accessToken(token)
                .user(userResponse)
                .build();
    }

    @Override
    public UserResponse getUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("can't find Id"));
        return userMapper.toUserResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user-> userMapper.toUserResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse updateUser(Integer id, UpdateUserDTO request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // mapper cập nhật field (email, fullName, phone)
        userMapper.toUpdateUserDto(request, user);

        // Xử lý role thủ công vì gửi từ frontend là String
        if (request.getRole() != null && !request.getRole().isEmpty()) {
            try {
                user.setRole(Role.valueOf(request.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid role: " + request.getRole());
            }
        }

        // LƯU lại DB
        userRepository.save(user);

        return userMapper.toUserResponse(user);
    }


    @Override
    public boolean deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found: " + id);
        }
        userRepository.deleteById(id);
        return true;
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse changePassword(String email,ChangePasswordRequest request){
        User user = userRepository.findByEmail(email).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        logger.info("Attempting to change password for email: {}", email);

        user.setPasswordHash(passwordEncoder.encode(request.getPass()));
        userRepository.save(user);

        logger.info("Password changed successfully for email: {}", email);
        return userMapper.toUserResponse(user);

    }

    @Override
    public UserResponse forgetPass(ForgetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));

        String newPass = randomPassService.generateRandomPass();

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(request.getEmail());
        simpleMailMessage.setSubject("Reset Mail");
        simpleMailMessage.setText("New Pass is : " + newPass);
        simpleMailMessage.setFrom("vucongton9@gmail.com");

        mailSender.send(simpleMailMessage);

        user.setPasswordHash(passwordEncoder.encode(newPass));
        userRepository.save(user);

        return userMapper.toUserResponse(user);
    }
}
