import { sendRequest } from "./wrapprer";
import { getBackendBaseUrl } from "../config/api-url";


const api_url = `${getBackendBaseUrl()}/public`;

export const getMovies = (filter?: string, page = 1, size = 10) => {
    return sendRequest<IBackendRes<IModelPaginate<Movie>>>({
        url: `${api_url}/movies`,
        method: "GET",
        queryParams: {
            ...(filter ? { filter } : {}),
            page,
            size
        }
    });
};

export const getMoviesByCategorySlug = (slug: string) => {
    return getMovies(`categories.slug:'${slug}'`, 1, 10);
};

export const getMovieBySlug = (slug: string) => {
    return sendRequest<IBackendRes<Movie>>({
        url: `${api_url}/movies/${slug}`,
        method: "GET"
    });


};

export const increaseMovieView = (slug: string) => {
    return sendRequest<IBackendRes<Movie>>({
        url: `${api_url}/movies/${slug}/view`,
        method: "POST"
    });
};

export const getMovieEpisode = (slug: string) => {
    return sendRequest<IBackendRes<IModelPaginate<Episode>>>({
        url: `${api_url}/movies/${slug}/episodes`,
        method: "GET",
    })
};

export const getFirstEpisode = (slug: string) => {
    return sendRequest<IBackendRes<Episode>>({
        url: `${api_url}/movies/first/${slug}`,
        method: "GET",
    })
}

export const getTop5Movie = () => {
    return sendRequest<IBackendRes<Movie[]>>({
        url: `${api_url}/movies/top/5`,
        method: "GET",
    })
}

export const getCategories = () => {
    return sendRequest<IBackendRes<IModelPaginate<Category>>>({
        url: `${api_url}/categories`,
        method: "GET"
    })
}

export const getCommentsByMovieId = (movieId: number, page = 1, size = 5) => {
    return sendRequest<IBackendRes<IModelPaginate<MovieComment>>>({
        url: `${getBackendBaseUrl()}/comments/movie/${movieId}`,
        method: "GET",
        queryParams: { page, size },
        useCredentials: true
    });
};

export const createComment = (movie_id: number, content: string) => {
    return sendRequest<IBackendRes<MovieComment>>({
        url: `${getBackendBaseUrl()}/comments`,
        method: "POST",
        body: { movie_id, content },
        useCredentials: true
    });
};

export const deleteComment = (id: number) => {
    return sendRequest<IBackendRes<null>>({
        url: `${getBackendBaseUrl()}/comments/${id}`,
        method: "DELETE",
        useCredentials: true
    });
};

export const getAccount = () => {
    return sendRequest<IBackendRes<User>>({
        url: `${getBackendBaseUrl()}/auth/account`,
        method: "GET",
        useCredentials: true
    });
};

export const getFavoriteMovies = () => {
    return sendRequest<IBackendRes<Movie[]>>({
        url: `${getBackendBaseUrl()}/favorites`,
        method: "GET",
        useCredentials: true,
        auth: true,
        redirectOnAuthFail: false
    });
};

export const addFavoriteMovie = (movieId: number) => {
    return sendRequest<IBackendRes<Movie>>({
        url: `${getBackendBaseUrl()}/favorites/${movieId}`,
        method: "POST",
        useCredentials: true,
        auth: true,
        redirectOnAuthFail: false
    });
};

export const removeFavoriteMovie = (movieId: number) => {
    return sendRequest<IBackendRes<null>>({
        url: `${getBackendBaseUrl()}/favorites/${movieId}`,
        method: "DELETE",
        useCredentials: true,
        auth: true,
        redirectOnAuthFail: false
    });
};
