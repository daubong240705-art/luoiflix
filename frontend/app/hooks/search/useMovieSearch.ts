"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMovies } from "@/lib/api/main.api";
import { MovieQueryBuilder, type MovieSearchState } from "@/lib/filter/MovieQueryBuilder";

type UseMovieSearchProps = {
    initialState: MovieSearchState;
};

export function useMovieSearch({ initialState }: UseMovieSearchProps) {
    const router = useRouter();
    const [state] = useState<MovieSearchState>(initialState);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(initialState.page);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const buildHref = (nextState: MovieSearchState) =>
        MovieQueryBuilder.fromState(nextState).withSize(10).buildHref();

    const updateSearchState = (nextState: MovieSearchState) => {
        startTransition(() => {
            router.replace(buildHref(nextState), { scroll: false });
        });
    };

    useEffect(() => {
        let cancelled = false;

        const fetchMovies = async () => {
            setIsLoading(true);

            const query = MovieQueryBuilder.fromState(state).withSize(10).buildApiParams();
            const searchRes = await getMovies(query.filter, query.page, query.size);

            if (cancelled) return;

            const result = searchRes.data?.result ?? [];
            const meta = searchRes.data?.meta;

            setMovies(result);
            setCurrentPage(meta?.current ?? query.page);
            setTotalPages(meta?.pages ?? 1);
            setTotalItems(meta?.total ?? result.length);
            setIsLoading(false);
        };

        void fetchMovies();

        return () => {
            cancelled = true;
        };
    }, [state]);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        updateSearchState({ ...state, page });
    };

    return {
        state,
        movies,
        currentPage,
        totalPages,
        totalItems,
        isLoading,
        buildHref,
        updateSearchState,
        handlePageChange,
    };
}
