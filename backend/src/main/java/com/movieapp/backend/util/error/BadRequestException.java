package com.movieapp.backend.util.error;

public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}