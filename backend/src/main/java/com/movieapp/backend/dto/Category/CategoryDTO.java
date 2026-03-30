package com.movieapp.backend.dto.Category;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryDTO {
    private Long id;
    private String name;
    private String slug;
}