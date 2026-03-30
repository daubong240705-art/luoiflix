package com.movieapp.backend.domain;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.movieapp.backend.domain.enums.MovieStatus;
import com.movieapp.backend.domain.enums.MovieType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "movies", uniqueConstraints = {
        @UniqueConstraint(name = "uk_movie_slug", columnNames = "slug")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private MovieType type;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private MovieStatus status;

    @Column(name = "poster_url", length = 500)
    private String posterUrl;

    @Column(name = "thumb_url", length = 500)
    private String thumbUrl;

    @Column(name = "publish_year")
    private Integer publishYear;

    @Column(name = "view_count", nullable = false)
    private Long viewCount = 0L;

    @Column(nullable = false)
    private String slug;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // RELATIONSHIP
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "movie_category", joinColumns = @JoinColumn(name = "movie_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Episode> episodes = new HashSet<>();

    @ManyToMany(mappedBy = "favoriteMovies", fetch = FetchType.LAZY)
    private Set<User> favoritedByUsers = new HashSet<>();
}
