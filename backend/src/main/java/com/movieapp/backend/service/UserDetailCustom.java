package com.movieapp.backend.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.movieapp.backend.domain.User;

import lombok.AllArgsConstructor;

@Component("userDetailsService") // Đổi tên Bean thành userDetailsService cho đúng chuẩn Spring
@AllArgsConstructor
public class UserDetailCustom implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // 1. Lấy User từ database
        // (Gợi ý: Tên hàm hadGetUserByUsername nghe hơi lạ, có thể bạn gõ nhầm từ
        // handle hoặc get? Bạn nhớ check lại tên hàm ở UserService nhé)
        User user = userService.hadGetUserByUsername(username);

        // 2. Phải check null, nếu không có user thì ném lỗi ngay
        if (user == null) {
            throw new UsernameNotFoundException("Tài khoản không tồn tại");
        }

        // 3. Trả về đối tượng User của SPRING SECURITY (Gọi full đường dẫn để né trùng
        // tên với Domain User)
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),

                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name())));
    }
}