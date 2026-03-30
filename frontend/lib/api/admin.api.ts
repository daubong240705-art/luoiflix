import { MoviePayload } from "@/app/types/form.type";
import { adminRequest } from "./adminRequest";
import { getBackendBaseUrl } from "../config/api-url";

const api_url = getBackendBaseUrl();

type AdminRequestOptions = {
    cookieHeader?: string
}


//Movie
export const getAdminMovies = (options?: AdminRequestOptions) => {
    return adminRequest<IBackendRes<IModelPaginate<Movie>>>({
        url: `${api_url}/movies`,
        method: "GET",
        cookieHeader: options?.cookieHeader
    })
}


export const createMovie = (data: MoviePayload) => {
    return adminRequest<IBackendRes<Movie>>({
        url: `${api_url}/movies`,
        method: "POST",
        body: data
    })
}

export const updateMovie = (id: number, data: MoviePayload) => {
    return adminRequest<IBackendRes<Movie>>({
        url: `${api_url}/movies/${id}`,
        method: "PUT",
        body: data
    })
}


export const deleteMovie = (id: number) => {
    return adminRequest<IBackendRes<boolean>>({
        url: `${api_url}/movies/${id}`,
        method: "DELETE",
    })
}

//Category

export const getAdminCategories = () => {
    return adminRequest<IBackendRes<IModelPaginate<Category>>>({
        url: `${api_url}/categories`,
        method: "GET"
    })
}


//User

export const getAdminUsers = () => {
    return adminRequest<IBackendRes<IModelPaginate<User>>>({
        url: `${api_url}/users`,
        method: "GET"
    })
}

export const getDashboardSummary = (options?: AdminRequestOptions) => {
    return adminRequest<IBackendRes<{
        totalMovies: number
        totalUsers: number
        totalViews: number
    }>>({
        url: `${api_url}/dashboard/summary`,
        method: "GET",
        cookieHeader: options?.cookieHeader
    })
}
