package com.movieapp.backend.service;

import com.movieapp.backend.domain.Category;
import com.movieapp.backend.domain.Movie;
import com.movieapp.backend.dto.Meta;
import com.movieapp.backend.dto.Movie.MovieDTO;
import com.movieapp.backend.dto.Movie.MovieRequest;
import com.movieapp.backend.dto.ResultPaginationDTO;
import com.movieapp.backend.repository.CategoryRepository;
import com.movieapp.backend.repository.MovieRepository;
import com.movieapp.backend.service.mapper.MovieMapper;
import com.movieapp.backend.util.error.BadRequestException;
import com.movieapp.backend.util.error.CustomValidationException;
import com.movieapp.backend.util.error.ResourceNotFoundException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final CategoryRepository categoryRepository;
    private final MovieMapper movieMapper;
    private final FileStorageService fileStorageService;

    public ResultPaginationDTO getAllMovies(Specification<Movie> spec, Pageable pageable) {
        Page<Movie> pageUser = movieRepository.findAll(spec, pageable);

        ResultPaginationDTO rs = new ResultPaginationDTO();
        Meta mt = new Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(pageUser.getTotalPages());
        mt.setTotal(pageUser.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(pageUser.map(movieMapper::toDTO).getContent());

        return rs;
    }

    public List<MovieDTO> getTop5ViewCountMovie() {
        return movieRepository
                .findTop5ByOrderByViewCountDesc()
                .stream()
                .map(movieMapper::toDTO)
                .toList();
    }

    public MovieDTO getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phim id = " + id));

        return movieMapper.toDTO(movie);
    }

    public MovieDTO getMovieBySlug(String slug) {
        Movie movie = movieRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phim slug = " + slug));

        return movieMapper.toDTO(movie);
    }

    public MovieDTO increaseMovieView(String slug) {
        Movie movie = movieRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phim slug = " + slug));

        long currentViewCount = movie.getViewCount() == null ? 0L : movie.getViewCount();
        movie.setViewCount(currentViewCount + 1);

        return movieMapper.toDTO(movieRepository.save(movie));
    }

    public MovieDTO createMovie(MovieRequest request) {
        Map<String, String> errors = new HashMap<>();
        if (movieRepository.existsBySlug(request.getSlug())) {
            errors.put("slug", "Slug da ton tai");
        }

        if (!errors.isEmpty()) {
            throw new CustomValidationException(errors);
        }

        Movie movie = movieMapper.toEntity(request);
        movie.setViewCount(0L);

        setCategories(movie, request);

        return movieMapper.toDTO(movieRepository.save(movie));
    }

    public MovieDTO updateMovie(Long id, MovieRequest request) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phim id = " + id));

        if (!movie.getSlug().equals(request.getSlug())
                && movieRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Slug da ton tai");
        }

        String oldPosterUrl = movie.getPosterUrl();
        String oldThumbUrl = movie.getThumbUrl();

        movieMapper.updateMovieFromRequest(request, movie);
        setCategories(movie, request);

        Movie updatedMovie = movieRepository.save(movie);
        deleteOldManagedFileIfReplaced(oldPosterUrl, updatedMovie.getPosterUrl());
        deleteOldManagedFileIfReplaced(oldThumbUrl, updatedMovie.getThumbUrl());

        return movieMapper.toDTO(updatedMovie);
    }

    public void deleteMovie(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phim id = " + id));

        movieRepository.delete(movie);
    }

    private void setCategories(Movie movie, MovieRequest request) {
        if (request.getCategoryIds() == null || request.getCategoryIds().isEmpty()) {
            movie.setCategories(new HashSet<>());
            return;
        }

        List<Category> categories = categoryRepository.findAllById(request.getCategoryIds());

        if (categories.size() != request.getCategoryIds().size()) {
            throw new BadRequestException("Some categories not found");
        }

        movie.setCategories(new HashSet<>(categories));
    }

    private void deleteOldManagedFileIfReplaced(String oldFileUrl, String newFileUrl) {
        if (!StringUtils.hasText(oldFileUrl) || oldFileUrl.equals(newFileUrl)) {
            return;
        }

        fileStorageService.deleteManagedFile(oldFileUrl);
    }
}
