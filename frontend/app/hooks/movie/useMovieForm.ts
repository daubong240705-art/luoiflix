"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { assertApiSuccess, handleFormError, useDeleteWithRefresh } from "../_shared/mutation.utils";
import { movieApi } from "../../admin/service/api/movie.api";
import { MoviePayload, MovieSubmitPayload, movieSchema } from "@/app/types/form.type";
import { fileApi } from "@/app/services/file.service";


export function useMovieForm(
    mode: "add" | "edit",
    initialData?: Movie
) {
    const form = useForm<MoviePayload>({
        resolver: zodResolver(movieSchema),
        values: mode === "edit" && initialData
            ? {
                title: initialData.title,
                slug: initialData.slug,
                description: initialData.description,
                type: initialData.type,
                status: initialData.status,
                posterUrl: initialData.posterUrl ?? "",
                thumbUrl: initialData.thumbUrl ?? "",
                publishYear: initialData.publishYear,
                categoryIds: initialData.categories?.map(c => c.id) ?? [],
            }
            : {
                title: "",
                slug: "",
                description: "",
                type: "SINGLE",
                status: "ONGOING",
                posterUrl: "",
                thumbUrl: "",
                publishYear: new Date().getFullYear(),
                categoryIds: [],
            },
    });


    return form;
}

export const useMovieMutation = (
    mode: "add" | "edit",
    form: UseFormReturn<MoviePayload>,
    movieId?: number,
    onClose?: () => void
) => {
    const router = useRouter();

    return useMutation<IBackendRes<Movie>, IBackendRes<null>, MovieSubmitPayload>({
        mutationFn: async (data: MovieSubmitPayload) => {
            const { posterFile, thumbFile, ...rest } = data;
            let posterUrl = rest.posterUrl;
            let thumbUrl = rest.thumbUrl;

            if (posterFile) {
                const uploadPosterResponse = assertApiSuccess(
                    await fileApi.uploadImage(posterFile, "movies/posters")
                );
                posterUrl = uploadPosterResponse.data?.fileUrl ?? posterUrl;
            }

            if (thumbFile) {
                const uploadThumbResponse = assertApiSuccess(
                    await fileApi.uploadImage(thumbFile, "movies/thumbs")
                );
                thumbUrl = uploadThumbResponse.data?.fileUrl ?? thumbUrl;
            }

            const payload: MoviePayload = {
                ...rest,
                posterUrl,
                thumbUrl,
            };

            const response = await (mode === "add"
                ? movieApi.createMovie(payload)
                : movieApi.updateMovie(movieId!, payload));
            return assertApiSuccess(response);
        },

        onError: (err) => {
            handleFormError(err, form.setError);
        }
    });
};

export const useDeleteMovie = () => {
    const mutation = useDeleteWithRefresh(movieApi.deleteMovie, "Xoá thành công");

    return {
        deleteMovie: mutation.mutate,
        isDeleting: mutation.isPending,
    };
};
