"use client";

import Link from "next/link";
import { ArrowLeft, SearchX, TextSearch } from "lucide-react";

import { type MovieSearchState } from "@/lib/filter/MovieQueryBuilder";
import { useMovieSearch } from "@/app/hooks/search/useMovieSearch";
import { MovieCard } from "../components/main.moviecard";
import SearchFilterPanel from "./search-filter-panel";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type SearchPageClientProps = {
    initialState: MovieSearchState;
    categories: Category[];
};

export default function SearchPageClient({ initialState, categories }: SearchPageClientProps) {
    const {
        state,
        movies,
        currentPage,
        totalPages,
        totalItems,
        isLoading,
        buildHref,
        updateSearchState,
        handlePageChange,
    } = useMovieSearch({ initialState });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedCategoryNames = categories
        .filter((category) => state.category.includes(category.slug))
        .map((category) => category.name);

    const renderPageLink = (page: number) => (
        <PaginationItem key={page}>
            <PaginationLink
                href={buildHref({ ...state, page })}
                isActive={page === currentPage}
                onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                }}
                className={`border-gray-700 ${page === currentPage
                    ? "bg-red-600 text-white hover:bg-red-600"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
            >
                {page}
            </PaginationLink>
        </PaginationItem>
    );

    return (
        <div className="min-h-screen bg-gray-900 pb-20 pt-8">
            <div className="container mx-auto px-4">


                <div className="flex flex-col gap-4 pb-6">
                    <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
                        <TextSearch className="h-7 w-7" />
                        Kết quả tìm kiếm
                    </h1>

                    <p className="text-sm text-gray-400">
                        Tìm thấy <span className="font-semibold text-white">{totalItems}</span> kết quả
                    </p>
                </div>
                <SearchFilterPanel
                    categories={categories}
                    value={state}
                    onApply={updateSearchState}
                />
                {isLoading ? (
                    <div className="py-20 text-center text-gray-400">Đang tải dư liệu...</div>
                ) : movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {movies.map((movie) => (
                                <div key={movie.id} className="animate-in fade-in zoom-in duration-500">
                                    <MovieCard movie={movie} />
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 ? (
                            <Pagination className="mt-10">
                                <PaginationContent>
                                    {currentPage > 1 ? (
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href={buildHref({ ...state, page: currentPage - 1 })}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(currentPage - 1);
                                                }}
                                                className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                                            />
                                        </PaginationItem>
                                    ) : null}

                                    {Array.from({ length: totalPages }, (_, index) => renderPageLink(index + 1))}

                                    {currentPage < totalPages ? (
                                        <PaginationItem>
                                            <PaginationNext
                                                href={buildHref({ ...state, page: currentPage + 1 })}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(currentPage + 1);
                                                }}
                                                className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                                            />
                                        </PaginationItem>
                                    ) : null}
                                </PaginationContent>
                            </Pagination>
                        ) : null}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 rounded-full bg-gray-800 p-6">
                            <SearchX className="h-16 w-16 text-gray-600" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">Khong tim thay ket qua</h3>
                        <p className="mx-auto mb-8 max-w-md text-gray-400">
                            Thu tu khoa khac hoac bo dau tieng Viet de de tim hon.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Ve trang chu
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
