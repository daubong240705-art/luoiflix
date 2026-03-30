package com.movieapp.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignupDTO {

    @NotBlank(message = "username không được để trống")
    private String username;

    @Email(message = "email không hợp lệ")
    @NotBlank(message = "email không được để trống")
    private String email;

    @NotBlank(message = "password không được để trống")
    @Size(min = 6, message = "password phải ít nhất 6 ký tự")
    private String password;

    @NotBlank(message = "fullName không được để trống")
    private String fullName;
}