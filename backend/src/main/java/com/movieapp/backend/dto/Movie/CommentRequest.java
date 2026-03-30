package com.movieapp.backend.dto.Movie;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    @NotNull(message = "movie_id khong duoc de trong")
    private Long movie_id;

    @NotBlank(message = "Noi dung binh luan khong duoc de trong")
    private String content;
}
