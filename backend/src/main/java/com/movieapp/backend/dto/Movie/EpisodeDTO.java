package com.movieapp.backend.dto.Movie;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EpisodeDTO {
    private Long id;
    private String name;
    private String slug;
    private String videoUrl;
    private Integer episodeOrder;

    private Long movieId;
}