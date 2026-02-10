package com.example.demo.exception;

import com.example.demo.dto.ApiResponse;
import com.example.demo.enums.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice /* annotation xử lý ngoại lệ*/
public class GlobalExceptionHandler {
    
    @ExceptionHandler(AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException exception){
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = new ApiResponse<>();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse> handleRuntimeException(RuntimeException e) {
        log.error(" RuntimeException: {}", e.getMessage(), e);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(1001); // Generic error code or custom
        apiResponse.setMessage(e.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationException(MethodArgumentNotValidException e) {
        log.error(" Validation error: {}", e.getMessage());
        ApiResponse apiResponse = new ApiResponse();
        
        StringBuilder message = new StringBuilder("Validation failed: ");
        e.getBindingResult().getFieldErrors().forEach(error -> {
            message.append(error.getField()).append(" ").append(error.getDefaultMessage()).append("; ");
        });
        
        apiResponse.setCode(1002);
        apiResponse.setMessage(message.toString());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse> handleHttpMessageNotReadable(HttpMessageNotReadableException e) {
        log.error(" Message not readable: {}", e.getMessage());
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(1003);
        apiResponse.setMessage("Invalid request format: " + e.getMostSpecificCause().getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse> handleMaxSizeException(MaxUploadSizeExceededException e) {
        log.error(" File too large: {}", e.getMessage());
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(1004);
        apiResponse.setMessage("File quá lớn. Kích thước tối đa cho phép là 10MB.");
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(apiResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGenericException(Exception e) {
        log.error(" Unexpected error: {}", e.getMessage(), e);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(9999);
        apiResponse.setMessage("Đã xảy ra lỗi hệ thống: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }
}
