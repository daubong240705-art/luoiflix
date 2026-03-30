package com.movieapp.backend.dto.Movie;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EpisodeRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String slug;

    private String videoUrl;

    @NotNull
    private Integer episodeOrder;

    @NotNull
    private Long movieId;
}