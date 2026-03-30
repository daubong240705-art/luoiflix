import { getBackendBaseUrl } from "@/lib/config/api-url";
import { sendRequest } from "@/lib/api/wrapprer";

const API_URL = getBackendBaseUrl();

export type UploadImageFolder = "avatars" | "movies/posters" | "movies/thumbs";

export type UploadFilePayload = {
  fileName: string;
  fileUrl: string;
  relativePath: string;
};

export const fileApi = {
  uploadImage(file: File, folder: UploadImageFolder) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    return sendRequest<IBackendRes<UploadFilePayload>>({
      url: `${API_URL}/files`,
      method: "POST",
      body: formData,
      useCredentials: true,
      auth: true,
      redirectOnAuthFail: false,
    });
  },
};
