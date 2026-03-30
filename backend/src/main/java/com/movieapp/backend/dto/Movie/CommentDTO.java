package com.movieapp.backend.dto.Movie;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private Long id;
    private Long movie_id;
    private Long user_id;
    private String fullName;
    private String avatarUrl;
    private String content;
    private LocalDateTime createdAt;
}
