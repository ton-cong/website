package com.example.demo.filter;

import com.example.demo.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
     final JwtUtil jwtUtil;
     final UserDetailsService userDetailsService;


    private final List<String> PUBLIC_ENDPOINTS = Arrays.asList(
            "/api/auth/",
            "/login",
            "/register",
            "/css/",
            "/js/",
            "/images/",
            "/favicon.ico"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        log.debug("🔍 JWT Filter - Path: {} Method: {}", path, method);


        boolean isPublicAuthEndpoint = path.equals("/api/auth/login") ||
                                       path.equals("/api/auth/register") ||
                                       path.equals("/api/auth/forgetPass");
        
        boolean isPublicGetEndpoint = method.equals("GET") && 
                                      (path.startsWith("/api/products") || 
                                       path.startsWith("/api/category") || 
                                       path.startsWith("/api/reviews/product"));
        
        if (isPublicAuthEndpoint || isPublicGetEndpoint) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        log.debug("🔐 Auth Header: {}", authHeader != null ? authHeader.substring(0, Math.min(30, authHeader.length())) + "..." : "NULL");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);

            log.info("📧 Extracted email from token: {}", email);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                log.info("👤 User authorities: {}", userDetails.getAuthorities());


                if (jwtUtil.validateToken(token, userDetails.getUsername())) {

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.info("Authentication set successfully for: {} with roles: {}", email, userDetails.getAuthorities());
                } else {
                    log.warn("Token validation failed for: {}", email);
                }
            }
        } else {
            log.debug("⚠️ No Bearer token found in request");
        }

        filterChain.doFilter(request, response);
    }


}
