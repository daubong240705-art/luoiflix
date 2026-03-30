package com.movieapp.backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ResLoginDTO {
    private String accessToken;
    private UserLogin user;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserLogin {
        private Long id;

        private String username;

        private String email;

        private String fullName;

        private String avatarUrl;

        private String role;
    }

}
