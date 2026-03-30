package com.movieapp.backend.repository;

import com.movieapp.backend.domain.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category> {
    boolean existsByName(String name);

    boolean existsBySlug(String slug);

    @Modifying
    @Query(value = "DELETE FROM movie_category WHERE category_id = :categoryId", nativeQuery = true)
    void deleteMovieCategoryRelations(@Param("categoryId") Long categoryId);
}
