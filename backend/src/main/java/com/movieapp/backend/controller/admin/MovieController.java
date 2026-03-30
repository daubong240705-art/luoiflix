package com.movieapp.backend.controller.admin;

import com.movieapp.backend.domain.Movie;
import com.movieapp.backend.dto.ResultPaginationDTO;
import com.movieapp.backend.service.EpisodeService;
import com.movieapp.backend.dto.Movie.EpisodeDTO;
import com.movieapp.backend.dto.Movie.MovieDTO;
import com.movieapp.backend.dto.Movie.MovieRequest;
import com.movieapp.backend.service.MovieService;
import com.movieapp.backend.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/movies")
@AllArgsConstructor
public class MovieController {

    private final EpisodeService episodeService;

    private final MovieService movieService;

    // API: danh sách phim
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    @ApiMessage("Lấy danh sách phim thành công")
    public ResultPaginationDTO getAllMovies(
            @Filter Specification<Movie> spec,
            Pageable pageable) {
        return movieService.getAllMovies(spec, pageable);
    }

    // API: lấy phim theo id
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ApiMessage("Lấy thông tin phim thành công")
    public MovieDTO getMovieBySlug(@PathVariable("id") Long id) {
        return movieService.getMovieById(id);
    }

    // API: thêm phim
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiMessage("Tạo mới phim thành công")
    public MovieDTO createMovie(
            @Valid @RequestBody MovieRequest request) {
        return movieService.createMovie(request);
    }

    // APT: capaj nhât phim
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    @ApiMessage("Cập nhật phim thành công")
    public MovieDTO updateMovie(
            @PathVariable("id") Long id,
            @Valid @RequestBody MovieRequest request) {
        return movieService.updateMovie(id, request);
    }

    // API xoá phim
    @ApiMessage("Xóa người dùng thành công")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable("id") Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{movieId}/episodes")
    @ApiMessage("Lấy danh sách tập phim thành công")
    public List<EpisodeDTO> getEpisodesByMovie(
            @PathVariable("movieId") Long movieId) {

        return episodeService.getEpisodesByMovieId(movieId);
    }

}