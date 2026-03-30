import { EpisodePayload, MoviePayload } from "@/app/types/form.type";
import { getBackendBaseUrl } from "@/lib/config/api-url";
import { sendRequest } from "@/lib/api/wrapprer";

const API_URL = getBackendBaseUrl();



export const movieApi = {
    async getAllAdminMovies(): Promise<Movie[]> {
        const res = await sendRequest<IBackendRes<IModelPaginate<Movie>>>({
            url: `${API_URL}/movies`,
            method: "GET",
            useCredentials: true,
            auth: true,
        });

        return res.data?.result ?? [];
    },

    createMovie(data: MoviePayload) {
        return sendRequest<IBackendRes<Movie>>({
            url: `${API_URL}/movies`,
            method: "POST",
            body: data,
            useCredentials: true,
            auth: true,
        });
    },

    updateMovie(id: number, data: MoviePayload) {
        return sendRequest<IBackendRes<Movie>>({
            url: `${API_URL}/movies/${id}`,
            method: "PUT",
            body: data,
            useCredentials: true,
            auth: true,
        });
    },

    deleteMovie(id: number) {
        return sendRequest<IBackendRes<void>>({
            url: `${API_URL}/movies/${id}`,
            method: "DELETE",
            useCredentials: true,
            auth: true,
        });
    },

    async getEpisodeByMovie(movieId: number): Promise<Episode[]> {
        const res = await sendRequest<IBackendRes<Episode[]>>({
            url: `${API_URL}/movies/${movieId}/episodes`,
            method: "GET",
            useCredentials: true,
            auth: true,
        });

        return res.data ?? [];
    },

    createEpisode(data: EpisodePayload) {
        return sendRequest<IBackendRes<Episode>>({
            url: `${API_URL}/episodes`,
            method: "POST",
            body: data,
            useCredentials: true,
            auth: true,
        });
    },

    updateEpisode(id: number, data: EpisodePayload) {
        return sendRequest<IBackendRes<Episode>>({
            url: `${API_URL}/episodes/${id}`,
            method: "PUT",
            body: data,
            useCredentials: true,
            auth: true,
        });
    },

    deleteEpisode(id: number) {
        return sendRequest<IBackendRes<void>>({
            url: `${API_URL}/episodes/${id}`,
            method: "DELETE",
            useCredentials: true,
            auth: true,
        });
    },
};
