package com.movieapp.backend.controller.client;

import com.movieapp.backend.domain.User;
import com.movieapp.backend.dto.auth.ResLoginDTO;
import com.movieapp.backend.dto.auth.UpdateProfileDTO;
import com.movieapp.backend.service.UserService;
import com.movieapp.backend.util.SecurityUtil;
import com.movieapp.backend.util.annotation.ApiMessage;
import com.movieapp.backend.util.error.BadRequestException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserService userService;
    private final SecurityUtil securityUtil;

    @Value("${movieapp.jwt.access-token}")
    private long accessTokenExpiration;

    @GetMapping
    @ApiMessage("Lay thong tin profile thanh cong")
    public ResLoginDTO.UserLogin getProfile() {
        User user = getCurrentUser();

        return new ResLoginDTO.UserLogin(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getAvatarUrl(),
                user.getRole().name());
    }

    @PutMapping
    @ApiMessage("Cap nhat profile thanh cong")
    public ResponseEntity<ResLoginDTO> updateProfile(@Valid @RequestBody UpdateProfileDTO request) {
        String username = SecurityUtil.getCurrentUserLogin();
        userService.updateCurrentUserProfile(username, request);

        User updatedUser = getCurrentUser();
        ResLoginDTO res = new ResLoginDTO();
        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                updatedUser.getId(),
                updatedUser.getUsername(),
                updatedUser.getEmail(),
                updatedUser.getFullName(),
                updatedUser.getAvatarUrl(),
                updatedUser.getRole().name());
        res.setUser(userLogin);

        String accessToken = securityUtil.createAccessToken(username, res);
        res.setAccessToken(accessToken);

        ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(accessTokenExpiration)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", accessCookie.toString())
                .body(res);
    }

    private User getCurrentUser() {
        String username = SecurityUtil.getCurrentUserLogin();
        User user = userService.hadGetUserByUsername(username);

        if (user == null) {
            throw new BadRequestException("Nguoi dung khong hop le");
        }

        return user;
    }
}
