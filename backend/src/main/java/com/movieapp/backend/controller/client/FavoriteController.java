package com.movieapp.backend.controller.client;

import com.movieapp.backend.dto.Movie.MovieDTO;
import com.movieapp.backend.service.FavoriteService;
import com.movieapp.backend.util.annotation.ApiMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiMessage("Lay danh sach phim yeu thich thanh cong")
    public List<MovieDTO> getCurrentUserFavorites() {
        return favoriteService.getCurrentUserFavorites();
    }

    @PostMapping("/{movieId}")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiMessage("Them phim vao yeu thich thanh cong")
    public MovieDTO addFavoriteMovie(@PathVariable("movieId") Long movieId) {
        return favoriteService.addFavoriteMovie(movieId);
    }

    @DeleteMapping("/{movieId}")
    @ResponseStatus(HttpStatus.OK)
    @ApiMessage("Xoa phim khoi yeu thich thanh cong")
    public ResponseEntity<Void> removeFavoriteMovie(@PathVariable("movieId") Long movieId) {
        favoriteService.removeFavoriteMovie(movieId);
        return ResponseEntity.ok().build();
    }
}
