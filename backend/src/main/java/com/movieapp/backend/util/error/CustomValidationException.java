package com.movieapp.backend.util.error;

import java.util.Map;

public class CustomValidationException extends RuntimeException {
    private final Map<String, String> errors;

    public CustomValidationException(Map<String, String> errors) {
        super("Validation failed");
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}