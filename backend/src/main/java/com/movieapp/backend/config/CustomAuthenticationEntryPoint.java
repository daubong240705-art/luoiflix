package com.movieapp.backend.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import tools.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.movieapp.backend.domain.RestResponse;

import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint, AccessDeniedHandler {

    private final ObjectMapper objectMapper;

    public CustomAuthenticationEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.UNAUTHORIZED.value());
        res.setError(authException.getMessage());
        res.setMessage("Token khong hop le, da het han hoac ban chua dang nhap.");

        response.getWriter().write(objectMapper.writeValueAsString(res));
        response.flushBuffer();
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException)
            throws IOException, ServletException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpStatus.FORBIDDEN.value());

        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.FORBIDDEN.value());
        res.setError(accessDeniedException.getMessage());
        res.setMessage("Ban khong co quyen (Role) de truy cap vao tai nguyen nay.");

        response.getWriter().write(objectMapper.writeValueAsString(res));
        response.flushBuffer();
    }
}
