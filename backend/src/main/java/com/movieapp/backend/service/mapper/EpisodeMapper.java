package com.movieapp.backend.service.mapper;

import org.springframework.stereotype.Component;

import com.movieapp.backend.domain.Episode;
import com.movieapp.backend.dto.Movie.EpisodeDTO;

@Component
public class EpisodeMapper {

    public EpisodeDTO toDTO(Episode episode) {

        return EpisodeDTO.builder()
                .id(episode.getId())
                .name(episode.getName())
                .slug(episode.getSlug())
                .videoUrl(episode.getVideoUrl())
                .episodeOrder(episode.getEpisodeOrder())
                .movieId(episode.getMovie().getId())
                .build();
    }
}