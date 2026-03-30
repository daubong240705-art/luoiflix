"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { useFavoriteMovies } from "@/app/hooks/favorites/useFavoriteMovies";

export default function MyFavoritesPage() {
    const { favoriteMovies, isAuthenticated, isLoading, removeFavorite } = useFavoriteMovies();
    const [keyword, setKeyword] = useState("");
    const [filterGenre, setFilterGenre] = useState("all");

    const availableGenres = useMemo(() => {
        const genres = new Map<string, string>();

        favoriteMovies.forEach((movie) => {
            movie.categories.forEach((category) => {
                genres.set(category.slug, category.name);
            });
        });

        return Array.from(genres.entries()).map(([slug, name]) => ({ slug, name }));
    }, [favoriteMovies]);

    const filteredMovies = useMemo(() => {
        const normalizedKeyword = keyword.trim().toLowerCase();

        return favoriteMovies.filter((movie) => {
            const matchKeyword =
                !normalizedKeyword ||
                movie.title.toLowerCase().includes(normalizedKeyword) ||
                movie.description.toLowerCase().includes(normalizedKeyword);

            const matchGenre =
                filterGenre === "all" ||
                movie.categories.some((category) => category.slug === filterGenre);

            return matchKeyword && matchGenre;
        });
    }, [favoriteMovies, filterGenre, keyword]);

    return (
        <div className="min-h-screen bg-gray-900 pb-20">
            <div className="relative overflow-hidden border-b border-gray-800 bg-linear-to-r from-red-900 to-black py-16 md:py-24">
                <div className="absolute right-0 top-0 -mr-20 -mt-20 opacity-10">
                    <Heart className="h-96 w-96 fill-white text-white" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <div className="mb-4 inline-flex items-center justify-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-sm">
                        <Heart className="h-6 w-6 fill-red-500 text-red-500" />
                        <span className="text-sm font-medium uppercase tracking-wide text-gray-300">
                            Bộ sưu tập cá nhân
                        </span>
                    </div>
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                        Tủ Phim Của Tôi
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-400">
                        Nơi lưu giữ {favoriteMovies.length} bộ phim tuyệt vời mà bạn yêu thích.
                    </p>
                </div>
            </div>

            <div className="container relative z-20 mx-auto -mt-8 px-4">
                <div className="mb-8 rounded-xl border border-gray-700 bg-gray-800/80 p-4 shadow-xl backdrop-blur-md">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="group relative flex-1">
                            <input
                                type="text"
                                placeholder="Tìm kiếm trong tủ phim..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-900 py-3 pl-12 pr-10 text-white transition-all focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-red-500" />
                        </div>

                        <div className="w-full md:w-64">
                            <select
                                value={filterGenre}
                                onChange={(e) => setFilterGenre(e.target.value)}
                                className="w-full appearance-none rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                                style={{ backgroundImage: "none" }}
                            >
                                <option value="all">Tất cả thể loại</option>
                                {availableGenres.map((genre) => (
                                    <option key={genre.slug} value={genre.slug}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {filteredMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-lg shadow-black/20"
                            >
                                <Link href={`/movie/${movie.slug}`} className="block">
                                    <div className="relative aspect-2/3 overflow-hidden">
                                        <Image
                                            src={movie.posterUrl}
                                            alt={movie.title}
                                            fill
                                            unoptimized
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <p className="line-clamp-2 text-sm text-gray-200">
                                                {movie.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                <div className="space-y-3 p-4">
                                    <Link href={`/movie/${movie.slug}`} className="block">
                                        <h2 className="line-clamp-1 text-lg font-semibold text-white transition-colors group-hover:text-red-500">
                                            {movie.title}
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-400">{movie.publishYear}</p>
                                    </Link>

                                    <div className="flex flex-wrap gap-2">
                                        {movie.categories.slice(0, 2).map((category) => (
                                            <span
                                                key={category.id}
                                                className="rounded-full border border-gray-700 bg-gray-900 px-2.5 py-1 text-xs text-gray-300"
                                            >
                                                {category.name}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            const result = await removeFavorite(movie.id);
                                            if (!result.success) {
                                                toast.error(result.message ?? "Không thể xoá phim yêu thích.");
                                                return;
                                            }
                                            toast.success(`Đã xoá "${movie.title}" khỏi yêu thích`);
                                        }}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Xoá khỏi yêu thích
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isLoading ? (
                    <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-800/40 px-6 py-16 text-center">
                        <h2 className="text-2xl font-bold text-white">Đang tải danh sách yêu thích...</h2>
                    </div>
                ) : !isAuthenticated ? (
                    <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-800/40 px-6 py-16 text-center">
                        <Heart className="mx-auto mb-4 h-12 w-12 text-gray-500" />
                        <h2 className="text-2xl font-bold text-white">Bạn cần đăng nhập</h2>
                        <p className="mx-auto mt-3 max-w-xl text-gray-400">
                            Hãy đăng nhập để xem và quản lý danh sách phim yêu thích của bạn.
                        </p>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-800/40 px-6 py-16 text-center">
                        <Heart className="mx-auto mb-4 h-12 w-12 text-gray-500" />
                        <h2 className="text-2xl font-bold text-white">
                            {favoriteMovies.length === 0 ? "Chưa có phim yêu thích" : "Không tìm thấy phim phù hợp"}
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-gray-400">
                            {favoriteMovies.length === 0
                                ? "Hãy thêm phim từ trang chi tiết hoặc trên danh sách phim để chúng xuất hiện tại đây."
                                : "Thử đổi từ khoá tìm kiếm hoặc bộ lọc thể loại để xem lại danh sách yêu thích của bạn."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
