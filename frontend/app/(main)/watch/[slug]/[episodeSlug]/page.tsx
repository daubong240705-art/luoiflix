import Comments from "@/app/(main)/components/Comment";
import { Top5Movies } from "@/app/(main)/components/TopMovie";
import { getMovieEpisode, increaseMovieView } from "@/lib/api/main.api";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import VideoPlayer from "@/app/(main)/components/video.player";

type Props = {
    params: Promise<{ slug: string; episodeSlug: string }>;
};

export default async function MovieDetailPage({ params }: Props) {
    const { slug: movieSlug, episodeSlug } = await params;

    const movieRes = await increaseMovieView(movieSlug);
    const episodesRes = await getMovieEpisode(movieSlug);

    const movie = movieRes.data!;
    const episodes = episodesRes.data?.result ?? [];
    const currentEpisode = episodes.find((ep) => ep.slug === episodeSlug);

    return (
        <div className="min-h-screen bg-gray-900 pb-20">
            <div className="container mx-auto px-4 py-8">
                <Link
                    href={`/movie/${movie.slug}`}
                    className="group mb-6 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                >
                    <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    <span>Quay lại chi tiết phim</span>
                </Link>

                <div className="mx-auto w-full max-w-8xl space-y-8">
                    <div className="grid grid-cols-3 gap-8">
                        <div className="space-y-6 lg:col-span-2">
                            <div className="mx-auto max-w-5xl">
                                <div className="overflow-hidden rounded-xl border border-gray-800 bg-black shadow-2xl">
                                    <div className="relative aspect-video">
                                        {currentEpisode?.videoUrl ? (
                                            <VideoPlayer src={currentEpisode.videoUrl} />
                                        ) : (
                                            <div className="text-gray-400">Tập phim chưa có video</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                                <h1 className="mb-2 flex items-center gap-3 text-2xl font-bold text-white">
                                    <span className="text-red-500">{currentEpisode?.name}</span>
                                </h1>
                                <p className="mb-4 text-lg text-gray-400">
                                    Phim: <span className="font-semibold text-white">{movie.title}</span>
                                </p>
                                <p className="text-sm leading-relaxed text-gray-500">{movie.description}</p>
                            </div>

                            <Comments movieId={movie.id} />
                        </div>

                        <div className="space-y-5 lg:col-span-1">
                            <Top5Movies />
                            <div className="sticky top-6 rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                                <h2 className="mb-4 border-l-4 border-red-600 pl-3 text-lg font-bold text-white">
                                    Danh sách tập
                                </h2>
                                <div className="custom-scrollbar grid max-h-100 grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-5 lg:grid-cols-3">
                                    {episodes.map((ep) => (
                                        <Link
                                            key={ep.id}
                                            href={`/watch/${movie.slug}/${ep.slug}`}
                                            scroll={false}
                                            className="group rounded-lg border border-gray-700 bg-gray-800 py-3 text-center font-semibold text-white transition-all hover:border-red-500 hover:bg-red-600"
                                        >
                                            <span>{ep.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}