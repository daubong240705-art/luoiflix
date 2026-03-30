package com.movieapp.backend.controller.admin;

import com.movieapp.backend.domain.Category;
import com.movieapp.backend.dto.ResultPaginationDTO;
import com.movieapp.backend.dto.Category.CategoryDTO;
import com.movieapp.backend.dto.Category.CategoryRequest;
import com.movieapp.backend.service.CategoryService;
import com.movieapp.backend.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/categories")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // API: danh sách thể loại
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    @ApiMessage("Lấy danh sách thể loại thành công")
    public ResultPaginationDTO getAllCategories(
            @Filter Specification<Category> spec,
            Pageable pageable) {
        return categoryService.getAllCategories(spec, pageable);
    }

    // API: lấy thể loại theo id
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ApiMessage("Lấy thông tin thể loại thành công")
    public CategoryDTO getCategoryById(@PathVariable("id") Long id) {

        return categoryService.getCategoryById(id);
    }

    // API: tạo thể loại
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiMessage("Tạo mới thể loại thành công")
    public CategoryDTO createCategory(
            @Valid @RequestBody CategoryRequest request) {

        return categoryService.createCategory(request);
    }

    // API: cập nhật thể loại
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    @ApiMessage("Cập nhật thể loại thành công")
    public CategoryDTO updateCategory(
            @PathVariable("id") Long id,
            @Valid @RequestBody CategoryRequest request) {

        return categoryService.updateCategory(id, request);
    }

    // API: xoá thể loại
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ApiMessage("Xóa thể loại thành công")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> deleteCategory(@PathVariable("id") Long id) {

        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}