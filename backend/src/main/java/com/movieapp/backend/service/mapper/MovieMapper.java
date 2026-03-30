package com.movieapp.backend.service.mapper;

import com.movieapp.backend.domain.Movie;
import com.movieapp.backend.dto.Movie.MovieDTO;
import com.movieapp.backend.dto.Movie.MovieRequest;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    MovieDTO toDTO(Movie movie);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "viewCount", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "episodes", ignore = true)
    @Mapping(target = "favoritedByUsers", ignore = true)
    Movie toEntity(MovieRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "viewCount", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "episodes", ignore = true)
    @Mapping(target = "favoritedByUsers", ignore = true)
    void updateMovieFromRequest(MovieRequest request, @MappingTarget Movie movie);
}
