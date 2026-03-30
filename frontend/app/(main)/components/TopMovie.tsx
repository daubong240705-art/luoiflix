
import { getTop5Movie } from '@/lib/api/main.api';
import Image from 'next/image';

import Link from 'next/link';




export async function Top5Movies() {
    const moviesRes = await getTop5Movie();
    const topMovies = moviesRes.data!;


    return (
        <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                Top 5 Phim xem nhiều
            </h2>
            <div className="space-y-3">
                {topMovies.map((movie, index) => (
                    <Link
                        key={movie.id}
                        href={`/movie/${movie.slug}`}
                        // <Link

                        className="flex gap-3 group hover:bg-gray-700 rounded-lg p-2 transition-all"
                    >
                        {/* Rank Badge */}
                        <div className="relative shrink-0">
                            <div className="absolute -top-1 -left-1 z-10 bg-linear-to-br from-yellow-400 to-orange-500 text-black font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                                {index + 1}
                            </div>
                            {/* Poster */}
                            <div className="relative w-20 h-28 rounded-md overflow-hidden">

                                <Image
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    unoptimized
                                    fill
                                    sizes='120'
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {/* Play Overlay */}

                            </div>
                        </div>

                        {/* Movie Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-red-500 transition-colors">
                                {movie.title}
                            </h3>
                            <p className="text-gray-400 text-xs mt-1">{movie.title}</p>

                            {/* Rating & Year */}
                            <span className="text-gray-500 text-xs">{movie.publishYear}</span>


                            {/* Genres */}
                            <div className="flex gap-1 mt-2 flex-wrap">
                                {movie.categories.slice(0, 2).map((g, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded"
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Button */}
            {/* <Link
                to="/"
                className="mt-4 w-full py-2 bg-gray-700 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                Xem tất cả phim
            </Link> */}
        </div>
    );
}
