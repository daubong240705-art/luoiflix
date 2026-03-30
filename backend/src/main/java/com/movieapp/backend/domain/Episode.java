package com.movieapp.backend.domain;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "episodes", uniqueConstraints = {
        @UniqueConstraint(name = "uk_episode_movie_slug", columnNames = { "movie_id", "slug" }),
        @UniqueConstraint(name = "uk_episode_movie_order", columnNames = { "movie_id", "episode_order" })
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // nhiều episode thuộc 1 movie
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String slug;

    @Column(name = "video_url", columnDefinition = "TEXT")
    private String videoUrl;

    @Column(name = "episode_order")
    private Integer episodeOrder;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
