package com.movieapp.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> uploadImage(MultipartFile file, String folderName) throws IOException {
        Map<String, Object> options = new HashMap<>(ObjectUtils.asMap("resource_type", "image"));
        if (StringUtils.hasText(folderName)) {
            options.put("folder", folderName);
        }

        return cloudinary.uploader().upload(file.getBytes(), options);
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> uploadVideo(MultipartFile file, String folderName) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "video",
                        "folder", folderName));
    }

    public void deleteImage(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
                "resource_type", "image",
                "type", "upload",
                "invalidate", true));
    }
}
