package com.movieapp.backend.repository;

import org.springframework.stereotype.Repository;

import com.movieapp.backend.domain.Comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByMovieIdOrderByCreatedAtDesc(Long movieId, Pageable pageable);

    @Modifying
    @Query(value = "DELETE FROM comments WHERE user_id = :userId", nativeQuery = true)
    void deleteByUserId(@Param("userId") Long userId);
}
