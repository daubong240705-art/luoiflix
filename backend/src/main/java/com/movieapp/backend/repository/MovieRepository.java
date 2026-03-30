package com.movieapp.backend.repository;

import com.movieapp.backend.domain.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>, JpaSpecificationExecutor<Movie> {
       Optional<Movie> findBySlug(String slug);

       boolean existsBySlug(String slug);

       List<Movie> findTop5ByOrderByViewCountDesc();

       @Query("SELECT COALESCE(SUM(m.viewCount), 0) FROM Movie m")
       Long sumAllViewCount();
}
