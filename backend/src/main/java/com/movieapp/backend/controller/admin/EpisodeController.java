package com.movieapp.backend.controller.admin;

import com.movieapp.backend.domain.Episode;
import com.movieapp.backend.dto.ResultPaginationDTO;
import com.movieapp.backend.dto.Movie.EpisodeDTO;
import com.movieapp.backend.dto.Movie.EpisodeRequest;
import com.movieapp.backend.service.EpisodeService;
import com.movieapp.backend.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/episodes")
@RequiredArgsConstructor
public class EpisodeController {

    private final EpisodeService episodeService;

    @GetMapping
    @ApiMessage("Lấy danh sách tập phim thành công")
    public ResultPaginationDTO getAllEpisodes(
            @Filter Specification<Episode> spec,
            Pageable pageable) {

        return episodeService.getAllEpisodes(spec, pageable);
    }

    @GetMapping("/{id}")
    @ApiMessage("Lấy thông tin tập phim thành công")
    public EpisodeDTO getEpisodeById(@PathVariable("id") Long id) {

        return episodeService.getEpisodeById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiMessage("Tạo tập phim thành công")
    public EpisodeDTO createEpisode(
            @Valid @RequestBody EpisodeRequest request) {

        return episodeService.createEpisode(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ApiMessage("Cập nhật tập phim thành công")
    public EpisodeDTO updateEpisode(
            @PathVariable("id") Long id,
            @Valid @RequestBody EpisodeRequest request) {

        return episodeService.updateEpisode(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ApiMessage("Xóa tập phim thành công")
    public void deleteEpisode(@PathVariable("id") Long id) {

        episodeService.deleteEpisode(id);
    }
}