package com.movieapp.backend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginDTO {
    @NotBlank(message = "username không được để trống")
    private String username;

    @NotBlank(message = "password không được để trống")
    private String password;
}
