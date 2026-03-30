const DEFAULT_PUBLIC_BACKEND_URL = "/api/v1";
const DEFAULT_INTERNAL_BACKEND_URL = "http://backend:8080/api/v1";

export const getBackendBaseUrl = () => {
  if (typeof window === "undefined") {
    return (
      process.env.BACKEND_INTERNAL_URL ??
      process.env.NEXT_PUBLIC_BACKEND_URL ??
      DEFAULT_INTERNAL_BACKEND_URL
    );
  }

  return process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_PUBLIC_BACKEND_URL;
};
