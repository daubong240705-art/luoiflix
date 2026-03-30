package com.movieapp.backend.controller.client;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.backend.domain.Category;
import com.movieapp.backend.dto.ResultPaginationDTO;
import com.movieapp.backend.service.CategoryService;
import com.movieapp.backend.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/public/categories")
@AllArgsConstructor
public class PublicCategoryController {
    private final CategoryService categoryService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiMessage("Lấy danh sách thể loại thành công")
    public ResultPaginationDTO getAllCategories(
            @Filter Specification<Category> spec,
            Pageable pageable) {

        return categoryService.getAllCategories(spec, pageable);
    }
}
