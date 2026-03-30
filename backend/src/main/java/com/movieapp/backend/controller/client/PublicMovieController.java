package com.movieapp.backend.controller.client;

import com.movieapp.backend.domain.Movie;
import com.movieapp.backend.dto.ResultPaginationDTO;
import com.movieapp.backend.service.EpisodeService;
import com.movieapp.backend.dto.Movie.EpisodeDTO;
import com.movieapp.backend.dto.Movie.MovieDTO;
import com.movieapp.backend.service.MovieService;
import com.movieapp.backend.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/movies")
@AllArgsConstructor
public class PublicMovieController {

    private final EpisodeService episodeService;
    private final MovieService movieService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiMessage("Lay danh sach phim thanh cong")
    public ResultPaginationDTO getAllMovies(
            @Filter Specification<Movie> spec,
            Pageable pageable) {
        return movieService.getAllMovies(spec, pageable);
    }

    @GetMapping("/top/5")
    @ApiMessage("Lay danh sach phim thanh cong")
    public List<MovieDTO> getTopMovie() {
        return movieService.getTop5ViewCountMovie();
    }

    @GetMapping("/{slug}")
    @ApiMessage("Lay thong tin phim thanh cong")
    public MovieDTO getMovieBySlug(@PathVariable("slug") String slug) {
        return movieService.getMovieBySlug(slug);
    }

    @PostMapping("/{slug}/view")
    @ApiMessage("Tang luot xem phim thanh cong")
    public MovieDTO increaseMovieView(@PathVariable("slug") String slug) {
        return movieService.increaseMovieView(slug);
    }

    @GetMapping("/{movieSlug}/episodes")
    @ApiMessage("Lay danh sach tap phim thanh cong")
    public ResultPaginationDTO getEpisodesByMovie(
            Pageable pageable,
            @PathVariable("movieSlug") String movieSlug) {

        return episodeService.getEpisodesByMovieSlug(movieSlug, pageable);
    }

    @GetMapping("/first/{slug}")
    @ApiMessage("Lay tap thanh cong")
    public EpisodeDTO getFirstEpisode(@PathVariable("slug") String slug) {
        return episodeService.getFirstEpisode(slug);
    }

}
