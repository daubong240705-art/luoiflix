import { zodResolver } from "@hookform/resolvers/zod";
import { MutateOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";

import { movieApi } from "../../admin/service/api/movie.api";
import { EpisodePayload, episodeSchema } from "@/app/types/form.type";
import { assertApiSuccess, handleFormError, useDeleteWithRefresh } from "../_shared/mutation.utils";

export function useEpisodeForm(
    mode: "add" | "edit",
    initialData?: Episode
) {
    const form = useForm<EpisodePayload>({
        resolver: zodResolver(episodeSchema),
        values: mode === "edit" && initialData
            ? {
                name: initialData.name,
                slug: initialData.slug,
                videoUrl: initialData.videoUrl,
                episodeOrder: initialData.episodeOrder,
                movieId: initialData.movieId ?? initialData.movie_id ?? 0,
            }
            : {
                name: "",
                slug: "",
                videoUrl: "",
                episodeOrder: 1,
                movieId: initialData?.movieId ?? initialData?.movie_id ?? 0,
            }
    });

    return form;
}

export const useEpisodeMutation = (
    mode: "add" | "edit",
    form: UseFormReturn<EpisodePayload>,
    movieId: number,
    episodeId?: number,
    onClose?: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation<IBackendRes<Episode>, IBackendRes<null>, EpisodePayload>({
        mutationFn: async (data: EpisodePayload) => {
            const currentEpisodeId = episodeId;

            if (mode === "edit" && !currentEpisodeId) {
                throw {
                    statusCode: 400,
                    message: "Khong tim thay id tap phim de cap nhat",
                } as IBackendRes<null>;
            }

            const response = await (mode === "add"
                ? movieApi.createEpisode(data)
                : movieApi.updateEpisode(currentEpisodeId!, data));

            return assertApiSuccess(response);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["episodes", movieId] });
            queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
            onClose?.();
        },
        onError: (err) => {
            handleFormError(err, form.setError);
        },
    });
};

export const useDeleteEpisode = (movieId: number) => {
    const queryClient = useQueryClient();
    const mutation = useDeleteWithRefresh(
        movieApi.deleteEpisode,
        "Xoa tap phim thanh cong"
    );

    const deleteEpisode = (
        episodeId: number,
        options?: MutateOptions<IBackendRes<unknown>, IBackendRes<null>, number, unknown>
    ) => {
        mutation.mutate(episodeId, {
            ...options,
            onSuccess: (data, variables, context, mutationContext) => {
                queryClient.invalidateQueries({ queryKey: ["episodes", movieId] });
                queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
                options?.onSuccess?.(data, variables, context, mutationContext);
            },
        });
    };

    return {
        deleteEpisode,
        isDeleting: mutation.isPending,
    };
};
