import { getMovieBySlug, getMovieEpisode } from "@/lib/api/main.api";
import { Calendar, MessageCircle, Play } from "lucide-react";

import Link from "next/link";
import Comments from "../../components/Comment";
import { Top5Movies } from "../../components/TopMovie";
import Image from "next/image";
import { FavoriteToggle } from "../../components/favorite-toggle";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function MovieDetailPage({ params }: Props) {
    const { slug: movieSlug } = await params;

    const [movieRes, episodesRes] = await Promise.all([
        getMovieBySlug(movieSlug),
        getMovieEpisode(movieSlug),
    ]);

    const movie = movieRes.data!;
    const episodes = episodesRes.data?.result ?? [];
    const firstep = episodes.at(0) ?? null;

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="relative h-[80vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${movie.thumbUrl})` }}
                >
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/90 to-transparent" />
                </div>
            </div>

            <div className="relative z-10 mx-auto -mt-70 px-40 pb-20">
                <div className="grid grid-cols-4">
                    <div className="rounded-4xl bg-gray-900 p-7 lg:col-span-1">
                        <div className="space-y-5">
                            <div className="relative aspect-2/3 w-32 overflow-hidden">
                                <Image
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    unoptimized
                                    className="rounded-lg object-cover"
                                    sizes="128px"
                                    fill
                                    quality={75}
                                />
                            </div>

                            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 rounded-md border border-gray-700 bg-gray-800/50 px-3 py-1 text-gray-300">
                                    <Calendar className="h-4 w-4" />
                                    <span>{movie.publishYear}</span>
                                </div>

                                <div
                                    className={`flex items-center rounded-md px-3 py-1 text-sm font-bold ${movie.status === "ONGOING"
                                        ? "border border-green-600/30 bg-green-600/20 text-green-400"
                                        : "border border-blue-600/30 bg-blue-600/20 text-blue-400"
                                        }`}
                                >
                                    {movie.status === "ONGOING" ? "Đang phát" : "Hoàn thành"}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex flex-wrap gap-2">
                                    {movie.categories.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-gray-700"
                                        >
                                            {cat.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-xl font-bold text-white">Nội dung phim</h3>
                                <p className="text-lg leading-relaxed text-gray-500">{movie.description}</p>
                            </div>

                            <Top5Movies />
                        </div>
                    </div>

                    <div className="space-y-10 rounded-4xl bg-gray-900 p-7 pt-10 lg:col-span-3">
                        <div className="flex flex-wrap items-center gap-3">
                            {firstep ? (
                                <Link
                                    href={`/watch/${movie.slug}/${firstep.slug}`}
                                    className="group relative flex items-center gap-3 rounded-full bg-linear-to-r from-green-400 to-green-500 px-8 py-3 font-bold text-black shadow-[0_0_20px_rgba(0,0,0,0.6)] shadow-green-500/50 transition-all hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]"
                                >
                                    <Play className="h-5 w-5 fill-current" />
                                    <span>Xem Ngay</span>
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="cursor-not-allowed rounded-full bg-gray-700 px-8 py-3 font-bold text-gray-400"
                                >
                                    <span>Chưa có tập</span>
                                </button>
                            )}

                            <FavoriteToggle
                                movie={movie}
                                className="flex-col items-center px-6 py-3 font-semibold text-gray-300 hover:bg-gray-700/20"
                                iconClassName="h-5 w-5"
                            />

                            <a
                                href="#comments"
                                className="flex-col flex items-center rounded-lg px-6 py-3 font-semibold text-gray-300 transition-all hover:bg-gray-700/20"
                            >
                                <MessageCircle className="h-5 w-5" />
                                <span className="hidden sm:inline pt-2">Bình luận</span>
                            </a>
                        </div>

                        <div className="pb-[30vh]">
                            <h3 className="mb-4 border-l-4 border-red-600 pl-3 text-xl font-bold text-white">
                                Danh sách tập
                            </h3>
                            <div className="grid grid-cols-8 gap-3 p-5">
                                {episodes.map((ep) => (
                                    <Link
                                        key={ep.id}
                                        href={`/watch/${movie.slug}/${ep.slug}`}
                                        className="group rounded-lg border border-gray-700 bg-gray-800 py-3 text-center font-semibold text-white transition-all hover:border-red-500 hover:bg-red-600"
                                    >
                                        <span className="block text-md text-white">{ep.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div id="comments">
                            <Comments movieId={movie.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}