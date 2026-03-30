package com.movieapp.backend.dto.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadFileResponse {
    private String fileName;
    private String fileUrl;
    private String relativePath;
}
