package com.movieapp.backend.util;

import com.movieapp.backend.domain.RestResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

    // 1. Dành cho các trường hợp chỉ cần trả data, message mặc định
    public static <T> ResponseEntity<RestResponse<T>> success(T data) {
        return success(data, "Success");
    }

    // 2. Dành cho trường hợp muốn custom message (VD: "Lấy danh sách phim thành
    // công")
    public static <T> ResponseEntity<RestResponse<T>> success(T data, String message) {
        RestResponse<T> response = RestResponse.<T>builder()
                .statusCode(HttpStatus.OK.value())
                .message(message)
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    // 3. Tạo mới thành công (Mặc định)
    public static <T> ResponseEntity<RestResponse<T>> created(T data) {
        return created(data, "Created successfully");
    }

    // 4. Tạo mới thành công (Custom message)
    public static <T> ResponseEntity<RestResponse<T>> created(T data, String message) {
        RestResponse<T> response = RestResponse.<T>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message(message)
                .data(data)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}