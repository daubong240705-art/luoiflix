package com.movieapp.backend.controller;

import com.movieapp.backend.dto.file.UploadFileResponse;
import com.movieapp.backend.service.FileStorageService;
import com.movieapp.backend.util.annotation.ApiMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FileController {

    private final FileStorageService fileStorageService;

    @PostMapping(value = "/files", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ApiMessage("Upload file thanh cong")
    public UploadFileResponse upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(name = "folder", defaultValue = "common") String folder) {
        return fileStorageService.storeImage(file, folder);
    }
}
