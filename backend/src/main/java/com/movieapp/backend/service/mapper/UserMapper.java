package com.movieapp.backend.service.mapper;

import org.springframework.stereotype.Component;

import com.movieapp.backend.domain.User;
import com.movieapp.backend.dto.User.UserDTO;
import com.movieapp.backend.dto.auth.SignupDTO;

@Component
public class UserMapper {
    public UserDTO toDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole().name())
                .build();
    }

    public SignupDTO toSignupDTO(User user) {

        SignupDTO signup = new SignupDTO();

        signup.setUsername(user.getUsername());
        signup.setEmail(user.getEmail());
        signup.setFullName(user.getFullName());

        return signup;
    }
}
