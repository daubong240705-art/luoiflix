package com.movieapp.backend.service;

import com.movieapp.backend.domain.Comment;
import com.movieapp.backend.domain.Movie;
import com.movieapp.backend.domain.User;
import com.movieapp.backend.domain.enums.Role;
import com.movieapp.backend.dto.Meta;
import com.movieapp.backend.dto.Movie.CommentDTO;
import com.movieapp.backend.dto.Movie.CommentRequest;
import com.movieapp.backend.dto.ResultPaginationDTO;
import com.movieapp.backend.repository.CommentRepository;
import com.movieapp.backend.repository.MovieRepository;
import com.movieapp.backend.repository.UserRepository;
import com.movieapp.backend.util.error.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    public CommentDTO saveComment(CommentRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        User user = userRepository.findByUsername(currentUsername);
        if (user == null) {
            throw new ResourceNotFoundException("Khong tim thay nguoi dung dang nhap");
        }
        Movie movie = movieRepository.findById(request.getMovie_id())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Khong tim thay phim voi ID: " + request.getMovie_id()));

        Comment comment = Comment.builder()
                .movie(movie)
                .user(user)
                .content(request.getContent().trim())
                .build();

        return toDTO(commentRepository.save(comment));
    }

    public ResultPaginationDTO getCommentsByMovieId(Long movieId, Pageable pageable) {
        Page<Comment> comments = commentRepository.findByMovieIdOrderByCreatedAtDesc(movieId, pageable);

        ResultPaginationDTO rs = new ResultPaginationDTO();
        Meta mt = new Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(comments.getTotalPages());
        mt.setTotal(comments.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(comments.map(this::toDTO).getContent());

        return rs;
    }

    public void deleteComment(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        User currentUser = userRepository.findByUsername(currentUsername);
        if (currentUser == null) {
            throw new ResourceNotFoundException("Khong tim thay nguoi dung dang nhap");
        }
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay binh luan id = " + id));

        boolean isOwner = comment.getUser().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole() == Role.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new AccessDeniedException("Ban khong co quyen xoa binh luan nay");
        }

        commentRepository.delete(comment);
    }

    private CommentDTO toDTO(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .movie_id(comment.getMovie().getId())
                .user_id(comment.getUser().getId())
                .fullName(comment.getUser().getFullName())
                .content(comment.getContent())
                .avatarUrl(comment.getUser().getAvatarUrl())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
