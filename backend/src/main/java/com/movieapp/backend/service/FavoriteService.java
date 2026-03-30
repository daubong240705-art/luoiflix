package com.movieapp.backend.service;

import com.movieapp.backend.domain.Movie;
import com.movieapp.backend.domain.User;
import com.movieapp.backend.dto.Movie.MovieDTO;
import com.movieapp.backend.repository.MovieRepository;
import com.movieapp.backend.repository.UserRepository;
import com.movieapp.backend.service.mapper.MovieMapper;
import com.movieapp.backend.util.SecurityUtil;
import com.movieapp.backend.util.error.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class  FavoriteService {

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;

    @Transactional
    public List<MovieDTO> getCurrentUserFavorites() {
        return getCurrentUser()
                .getFavoriteMovies()
                .stream()
                .sorted(Comparator.comparing(Movie::getId).reversed())
                .map(movieMapper::toDTO)
                .toList();
    }

    @Transactional
    public MovieDTO addFavoriteMovie(Long movieId) {
        User currentUser = getCurrentUser();
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phim id = " + movieId));

        Set<Movie> favoriteMovies = currentUser.getFavoriteMovies();
        favoriteMovies.add(movie);
        userRepository.save(currentUser);

        return movieMapper.toDTO(movie);
    }

    @Transactional
    public void removeFavoriteMovie(Long movieId) {
        User currentUser = getCurrentUser();
        boolean removed = currentUser.getFavoriteMovies().removeIf(movie -> movie.getId().equals(movieId));

        if (!removed) {
            throw new ResourceNotFoundException("Phim nay khong co trong danh sach yeu thich");
        }

        userRepository.save(currentUser);
    }

    private User getCurrentUser() {
        String username = SecurityUtil.getCurrentUserLogin();
        if (username == null || username.isBlank()) {
            throw new ResourceNotFoundException("Khong tim thay nguoi dung dang nhap");
        }

        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("Khong tim thay nguoi dung dang nhap");
        }

        return user;
    }
}
