package com.movieapp.backend.repository;

import com.movieapp.backend.domain.Episode;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface EpisodeRepository
        extends JpaRepository<Episode, Long>, JpaSpecificationExecutor<Episode> {

    boolean existsBySlug(String slug);

    boolean existsByMovieIdAndSlug(Long movieId, String slug);

    boolean existsByMovieIdAndSlugAndIdNot(Long movieId, String slug, Long id);

    boolean existsByMovieIdAndEpisodeOrder(Long movieId, Integer episodeOrder);

    boolean existsByMovieIdAndEpisodeOrderAndIdNot(Long movieId, Integer episodeOrder, Long id);

    Optional<Episode> findBySlug(String slug);

    Optional<Episode> findFirstByMovieSlugOrderByEpisodeOrderAsc(String slug);

    List<Episode> findByMovieIdOrderByEpisodeOrderAsc(Long movieId);

    Page<Episode> findByMovieSlugOrderByEpisodeOrderAsc(String movieSlug, Pageable pageable);

}
