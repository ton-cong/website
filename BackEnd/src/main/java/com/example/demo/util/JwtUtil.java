package com.example.demo.util;

import com.example.demo.entity.User;
import com.example.demo.enums.ErrorCode;
import com.example.demo.exception.AppException;
import com.example.demo.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.nimbusds.jwt.SignedJWT;

import java.util.Date;


@Component
@RequiredArgsConstructor
public class JwtUtil {
    private final UserRepository userRepository;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration-ms}")
    private int EXPIRATION_MS;

    public String generateToken(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()  -> new RuntimeException("fail"));
        String roles = user.getRole().name();
        try {
            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    .subject(email)
                    .issueTime(new Date())
                    .expirationTime(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                    .claim("scope",roles)
                    .build();
            JWSSigner signer = new MACSigner(SECRET_KEY.getBytes());
            SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS512), claims);
            signedJWT.sign(signer);
            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.TOKEN_NOT_CREATED);
        }
    }

    public String extractEmail(String token) {
        try {
            SignedJWT signed = SignedJWT.parse(token);
            return signed.getJWTClaimsSet().getSubject();
        } catch (Exception e) {
            throw new AppException(ErrorCode.NOT_EMAIL_FROM_TOKEN);
        }
    }

    public boolean validateToken(String token, String email) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            MACVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());
            if (!signedJWT.verify(verifier)) return false;

            return extractEmail(token).equals(email) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            SignedJWT signed = SignedJWT.parse(token);
            Date expiration = signed.getJWTClaimsSet().getExpirationTime();
            return new Date().after(expiration); // true nếu token hết hạn
        } catch (Exception e) {
            throw new AppException(ErrorCode.TOKEN_EXPIRED);
        }
    }
}

