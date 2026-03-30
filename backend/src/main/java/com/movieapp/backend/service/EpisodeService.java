package com.movieapp.backend.service;

import com.movieapp.backend.domain.Episode;
import com.movieapp.backend.domain.Movie;
import com.movieapp.backend.dto.Meta;
import com.movieapp.backend.dto.ResultPaginationDTO;
import com.movieapp.backend.dto.Movie.EpisodeDTO;
import com.movieapp.backend.dto.Movie.EpisodeRequest;
import com.movieapp.backend.repository.EpisodeRepository;
import com.movieapp.backend.repository.MovieRepository;
import com.movieapp.backend.service.mapper.EpisodeMapper;
import com.movieapp.backend.util.error.CustomValidationException;
import com.movieapp.backend.util.error.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EpisodeService {

    private final EpisodeRepository episodeRepository;
    private final MovieRepository movieRepository;
    private final EpisodeMapper episodeMapper;

    public ResultPaginationDTO getAllEpisodes(
            Specification<Episode> spec,
            Pageable pageable) {

        Page<Episode> page = episodeRepository.findAll(spec, pageable);

        ResultPaginationDTO rs = new ResultPaginationDTO();
        Meta mt = new Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(page.getTotalPages());
        mt.setTotal(page.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(page.map(episodeMapper::toDTO).getContent());

        return rs;
    }

    public EpisodeDTO getEpisodeById(Long id) {

        Episode episode = episodeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay episode id = " + id));

        return episodeMapper.toDTO(episode);
    }

    public EpisodeDTO createEpisode(EpisodeRequest request) {

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay movie"));

        Map<String, String> errors = new HashMap<>();
        if (episodeRepository.existsByMovieIdAndSlug(movie.getId(), request.getSlug())) {
            errors.put("slug", "Slug tap phim da ton tai trong phim nay");
        }
        if (episodeRepository.existsByMovieIdAndEpisodeOrder(movie.getId(), request.getEpisodeOrder())) {
            errors.put("episodeOrder", "Thu tu tap da ton tai trong phim nay");
        }
        if (!errors.isEmpty()) {
            throw new CustomValidationException(errors);
        }

        Episode episode = Episode.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .videoUrl(request.getVideoUrl())
                .episodeOrder(request.getEpisodeOrder())
                .movie(movie)
                .build();

        return episodeMapper.toDTO(episodeRepository.save(episode));
    }

    public EpisodeDTO updateEpisode(Long id, EpisodeRequest request) {

        Episode episode = episodeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay episode id = " + id));

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay movie"));

        Map<String, String> errors = new HashMap<>();
        if (episodeRepository.existsByMovieIdAndSlugAndIdNot(movie.getId(), request.getSlug(), id)) {
            errors.put("slug", "Slug tap phim da ton tai trong phim nay");
        }
        if (episodeRepository.existsByMovieIdAndEpisodeOrderAndIdNot(movie.getId(), request.getEpisodeOrder(), id)) {
            errors.put("episodeOrder", "Thu tu tap da ton tai trong phim nay");
        }
        if (!errors.isEmpty()) {
            throw new CustomValidationException(errors);
        }

        episode.setName(request.getName());
        episode.setSlug(request.getSlug());
        episode.setVideoUrl(request.getVideoUrl());
        episode.setEpisodeOrder(request.getEpisodeOrder());
        episode.setMovie(movie);

        return episodeMapper.toDTO(episodeRepository.save(episode));
    }

    public void deleteEpisode(Long id) {

        Episode episode = episodeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay episode id = " + id));

        episodeRepository.delete(episode);
    }

    public List<EpisodeDTO> getEpisodesByMovieId(Long movieId) {

        List<Episode> episodes = episodeRepository.findByMovieIdOrderByEpisodeOrderAsc(movieId);

        return episodes.stream()
                .map(episodeMapper::toDTO)
                .toList();
    }

    public ResultPaginationDTO getEpisodesByMovieSlug(String movieSlug,
            Pageable pageable) {

        Page<Episode> page = episodeRepository.findByMovieSlugOrderByEpisodeOrderAsc(movieSlug, pageable);

        ResultPaginationDTO rs = new ResultPaginationDTO();
        Meta mt = new Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(page.getTotalPages());
        mt.setTotal(page.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(page.map(episodeMapper::toDTO).getContent());

        return rs;
    }

    public EpisodeDTO getFirstEpisode(String movieSlug) {

        Episode episode = episodeRepository.findFirstByMovieSlugOrderByEpisodeOrderAsc(movieSlug)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay episode"));

        return episodeMapper.toDTO(episode);
    }
}
