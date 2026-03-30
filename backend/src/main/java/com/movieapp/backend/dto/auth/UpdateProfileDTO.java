package com.movieapp.backend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateProfileDTO {

    @NotBlank(message = "Ten hien thi khong duoc de trong")
    private String fullName;

    @NotBlank(message = "Avatar khong duoc de trong")
    private String avatarUrl;
}
