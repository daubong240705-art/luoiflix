package com.movieapp.backend.util.error;

import com.movieapp.backend.domain.RestResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({
            BadCredentialsException.class,
            UsernameNotFoundException.class,
            InternalAuthenticationServiceException.class
    })
    public ResponseEntity<RestResponse<Object>> handleAuthenticationException(Exception ex) {
        String errorMessage = "Ten dang nhap hoac mat khau khong chinh xac";
        return buildResponse(HttpStatus.UNAUTHORIZED, errorMessage);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse<Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        return buildResponse(HttpStatus.BAD_REQUEST, errors);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<RestResponse<Object>> handleNotFound(
            ResourceNotFoundException ex) {

        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<RestResponse<Object>> handleBadRequest(
            BadRequestException ex) {

        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<RestResponse<Object>> handleCustomValidation(CustomValidationException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getErrors());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<RestResponse<Object>> handleAccessDenied(AccessDeniedException ex) {
        return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<RestResponse<Object>> handleDuplicate(
            DataIntegrityViolationException ex) {

        String message = "Duplicate data";

        Throwable root = ex.getRootCause();
        if (root != null && root.getMessage() != null) {

            String error = root.getMessage();

            if (error.contains("uk_user_username")) {
                message = "Username already exists";
            } else if (error.contains("uk_user_email")) {
                message = "Email already exists";
            } else if (error.contains("uk_movie_slug")) {
                message = "Movie slug already exists";
            }
        }

        return buildResponse(HttpStatus.BAD_REQUEST, message);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<RestResponse<Object>> handleAll(Exception ex) {
        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal server error");
    }

    private ResponseEntity<RestResponse<Object>> buildResponse(
            HttpStatus status,
            Object error) {

        RestResponse<Object> res = RestResponse.<Object>builder()
                .statusCode(status.value())
                .message(status.getReasonPhrase())
                .error(error)
                .build();

        return ResponseEntity.status(status).body(res);
    }
}