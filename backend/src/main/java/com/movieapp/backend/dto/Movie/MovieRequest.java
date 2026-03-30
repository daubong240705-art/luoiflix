package com.movieapp.backend.dto.Movie;

import lombok.Data;
import java.util.List;

@Data
public class MovieRequest {
    private String title;
    private String slug;
    private String description;
    private String type;
    private String status;
    private String posterUrl;
    private String thumbUrl;
    private Integer publishYear;

    private List<Long> categoryIds;
}