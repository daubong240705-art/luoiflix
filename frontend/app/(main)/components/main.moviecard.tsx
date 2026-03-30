import Image from "next/image";
import Link from "next/link";

import { FavoriteToggle } from "./favorite-toggle";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="group relative">
            <Link href={`/movie/${movie.slug}`} className="block cursor-pointer">
                <div className="relative aspect-2/3 overflow-hidden rounded-lg">
                    <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        fill
                        sizes="100"
                    />

                    <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="line-clamp-2 text-sm text-gray-200">{movie.description}</p>
                        </div>
                    </div>

                    <div className="absolute top-2 left-2 z-20 rounded bg-red-600/90 px-2 py-1 text-xs font-bold text-white">
                        {movie.status === "ONGOING" ? "Đang phát" : "Hoàn thành"}
                    </div>
                </div>

                <div className="mt-3">
                    <h3 className="line-clamp-1 font-semibold text-white transition group-hover:text-red-600">
                        {movie.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{movie.publishYear}</p>
                </div>
            </Link>

            <div
                className="absolute right-2 top-2 z-30"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                }}
            >
                <FavoriteToggle
                    movie={movie}
                    showLabel={false}
                    className="h-10 w-10 rounded-full border border-white/10 bg-black/65 backdrop-blur-sm hover:bg-black/85"
                    iconClassName="h-4 w-4"
                />
            </div>
        </div>
    );
}