package com.movieapp.backend.dto.User;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRequest {

    @NotBlank(message = "Tên đăng nhập không được để trống")
    private String username;

    @NotBlank(message = "Email không được để trống")
    private String email;

    private String fullName;

    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;
    private String avatarUrl;
    private String role;
}
