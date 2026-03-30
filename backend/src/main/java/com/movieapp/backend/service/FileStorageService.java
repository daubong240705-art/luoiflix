package com.movieapp.backend.service;

import com.movieapp.backend.dto.file.UploadFileResponse;
import com.movieapp.backend.util.error.BadRequestException;
import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private static final List<String> ALLOWED_IMAGE_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif");

    private final CloudinaryService cloudinaryService;

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    public UploadFileResponse storeImage(MultipartFile file, String folder) {
        validateImage(file);
        String safeFolder = sanitizeFolder(folder);

        try {
            Map<String, Object> uploadResult = cloudinaryService.uploadImage(file, safeFolder);

            String publicId = getRequiredString(uploadResult, "public_id");
            String fileUrl = getRequiredString(uploadResult, "secure_url");
            String fileName = buildFileName(
                    publicId,
                    getOptionalString(uploadResult, "original_filename"),
                    getOptionalString(uploadResult, "format"));

            return new UploadFileResponse(fileName, fileUrl, publicId);
        } catch (IOException ex) {
            throw new BadRequestException("Khong the luu file upload");
        }
    }

    public void deleteManagedFile(String fileUrl) {
        String publicId = extractCloudinaryPublicId(fileUrl);
        if (!StringUtils.hasText(publicId)) {
            return;
        }

        try {
            cloudinaryService.deleteImage(publicId);
        } catch (IOException ignored) {
            // Ignore delete failures to avoid blocking successful entity updates.
        }
    }

    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Vui long chon file can upload");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType.toLowerCase(Locale.ROOT))) {
            throw new BadRequestException("Chi ho tro upload file anh jpeg, png, webp hoac gif");
        }
    }

    private String sanitizeFolder(String folder) {
        if (!StringUtils.hasText(folder)) {
            return "";
        }

        String normalized = folder.trim().replace("\\", "/");

        if (normalized.startsWith("/") || normalized.contains("..")) {
            throw new BadRequestException("Thu muc upload khong hop le");
        }

        for (String segment : normalized.split("/")) {
            if (!segment.matches("[a-zA-Z0-9_-]+")) {
                throw new BadRequestException("Thu muc upload khong hop le");
            }
        }

        return normalized;
    }

    private String getRequiredString(Map<String, Object> values, String key) {
        Object value = values.get(key);
        if (value == null || !StringUtils.hasText(value.toString())) {
            throw new BadRequestException("Phan hoi upload khong hop le");
        }

        return value.toString();
    }

    private String getOptionalString(Map<String, Object> values, String key) {
        Object value = values.get(key);
        return value == null ? "" : value.toString();
    }

    private String buildFileName(String publicId, String originalFileName, String format) {
        if (StringUtils.hasText(originalFileName) && StringUtils.hasText(format)) {
            return originalFileName + "." + format;
        }

        int lastSlashIndex = publicId.lastIndexOf('/');
        String baseName = lastSlashIndex >= 0
                ? publicId.substring(lastSlashIndex + 1)
                : publicId;

        if (!StringUtils.hasText(format)) {
            return baseName;
        }

        return baseName + "." + format;
    }

    private String extractCloudinaryPublicId(String fileUrl) {
        if (!StringUtils.hasText(fileUrl)) {
            return null;
        }

        String normalized = fileUrl.trim();

        if (!normalized.contains("res.cloudinary.com")) {
            return normalized.startsWith("http://") || normalized.startsWith("https://")
                    ? null
                    : stripExtension(normalized);
        }

        try {
            URI uri = URI.create(normalized);
            String uploadPrefix = "/" + cloudName + "/image/upload/";
            String path = uri.getPath();

            int uploadIndex = path.indexOf(uploadPrefix);
            if (uploadIndex < 0) {
                return null;
            }

            String afterUpload = path.substring(uploadIndex + uploadPrefix.length());
            if (!StringUtils.hasText(afterUpload)) {
                return null;
            }

            String[] segments = afterUpload.split("/");
            int publicIdStartIndex = 0;
            for (int i = segments.length - 1; i >= 0; i--) {
                if (segments[i].matches("v\\d+")) {
                    publicIdStartIndex = i + 1;
                    break;
                }
            }
            if (publicIdStartIndex >= segments.length) {
                return null;
            }

            String publicIdWithExtension = String.join("/",
                    Arrays.copyOfRange(segments, publicIdStartIndex, segments.length));

            return stripExtension(publicIdWithExtension);
        } catch (RuntimeException ex) {
            return null;
        }
    }

    private String stripExtension(String value) {
        int extensionIndex = value.lastIndexOf('.');
        if (extensionIndex <= value.lastIndexOf('/')) {
            return value;
        }

        return value.substring(0, extensionIndex);
    }
}
