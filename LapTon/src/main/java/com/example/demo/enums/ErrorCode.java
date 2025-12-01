package com.example.demo.enums;

public enum ErrorCode {
    USER_EXISTED(1001, "User existed"),
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception"),
    PASSWORD_TOO_SHORT(1002, "Password too short"),
    USER_NOT_EXISTED(1003, "User not existed"),
    UNAUTHENTICATED(1004, "Unauthenticated"),
    NOT_EMAIL_FROM_TOKEN(1008,"not get email from token"),
    TOKEN_NOT_CREATED(1005,"token not created"),
    TOKEN_EXPIRED(1008,"token is expired"),
    PASS_FAIL(1006,"Pass fail");

    private final int code;
    private final String message;

    ErrorCode(int code, String message){
        this.code=code;
        this.message=message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
