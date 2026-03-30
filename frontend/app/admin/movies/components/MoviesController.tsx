"use client";

import { useMemo, useState } from "react";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDeleteMovie } from "@/app/hooks/movie/useMovieForm";
import AdminTablePagination from "../../components/admin-table-pagination";
import AdminTableToolbar from "../../components/admin-table-toolbar";
import PageHeader from "../../components/admin.header";
import MovieDialog from "./MovieDialog";
import MoviesTable from "./MovieTable";

type MovieDialogState =
    | { type: "add" }
    | { type: "edit"; movie: Movie }
    | null;

export default function MoviesController({ movies }: { movies: Movie[] }) {
    const [dialog, setDialog] = useState<MovieDialogState>(null);
    const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const { deleteMovie } = useDeleteMovie();
    const pageSize = 8;

    const filteredMovies = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return movies.filter((movie) => {
            const matchesSearch = !keyword
                || movie.title.toLowerCase().includes(keyword)
                || movie.slug.toLowerCase().includes(keyword);
            const matchesType = typeFilter === "ALL" || movie.type === typeFilter;
            const matchesStatus = statusFilter === "ALL" || movie.status === statusFilter;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [movies, search, statusFilter, typeFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredMovies.length / pageSize));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedMovies = filteredMovies.slice(
        (safeCurrentPage - 1) * pageSize,
        safeCurrentPage * pageSize
    );

    return (
        <>
            <PageHeader
                title="phim"
                count={filteredMovies.length}
                onAdd={() => setDialog({ type: "add" })}
            />

            <AdminTableToolbar
                searchValue={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
                searchPlaceholder="Tìm theo tên phim hoạc slug..."
                totalItems={movies.length}
                filteredItems={filteredMovies.length}
            >
                <Select
                    value={typeFilter}
                    onValueChange={(value) => {
                        setTypeFilter(value);
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-full border-gray-700 bg-gray-900 text-white lg:w-45">
                        <SelectValue placeholder="Loai phim" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-700 bg-gray-900 text-gray-100">
                        <SelectItem value="ALL">Tất cả loại</SelectItem>
                        <SelectItem value="SINGLE">Phim lẻ</SelectItem>
                        <SelectItem value="SERIES">Phim bộ</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                        setStatusFilter(value);
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-full border-gray-700 bg-gray-900 text-white lg:w-45">
                        <SelectValue placeholder="Trang thai" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-700 bg-gray-900 text-gray-100">
                        <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                        <SelectItem value="ONGOING">Đang phát</SelectItem>
                        <SelectItem value="COMPLETED">Hoàn thành</SelectItem>
                    </SelectContent>
                </Select>
            </AdminTableToolbar>

            <MoviesTable
                movies={paginatedMovies}
                onEdit={(movie) => setDialog({ type: "edit", movie })}
                onDelete={(movie) => setMovieToDelete(movie)}
            />
            <AdminTablePagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <MovieDialog
                open={dialog !== null}
                onOpenChange={() => setDialog(null)}
                mode={dialog?.type === "edit" ? "edit" : "add"}
                initialData={dialog?.type === "edit" ? dialog.movie : undefined}
            />

            <ConfirmDialog
                Open={!!movieToDelete}
                onClose={() => setMovieToDelete(null)}
                onConfirm={() => {
                    if (!movieToDelete) return;
                    deleteMovie(movieToDelete.id, {
                        onSuccess: () => setMovieToDelete(null),
                    });
                }}
                title="Xoa phim?"
                message="Hanh dong nay khong the hoan tac."
            />
        </>
    );
}
