package com.movieapp.backend.dto.Movie;

import lombok.Builder;
import lombok.Data;
import java.util.List;

import com.movieapp.backend.dto.Category.CategoryDTO;

@Data
@Builder
public class MovieDTO {
    private Long id;
    private String title;
    private String slug;
    private String description;
    private String type;
    private String status;
    private String posterUrl;
    private String thumbUrl;
    private Integer publishYear;
    private Long viewCount;

    private List<CategoryDTO> categories;
}