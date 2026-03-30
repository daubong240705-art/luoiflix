package com.movieapp.backend.controller.admin;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.backend.dto.DashboardSumary;
import com.movieapp.backend.service.DashboardService;
import com.movieapp.backend.util.annotation.ApiMessage;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/summary")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    @ApiMessage("Lay thong ke dashboard thanh cong")
    public DashboardSumary getDashboardSummary() {
        return dashboardService.getDashboardSummary();
    }
}
