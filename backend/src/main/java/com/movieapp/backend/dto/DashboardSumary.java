package com.movieapp.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSumary {
    private long totalMovies;
    private long totalUsers;
    private long totalViews;
}
