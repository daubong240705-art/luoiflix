"use client";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCard } from './main.moviecard';



interface MovieSliderProps {
    title: string;
    movies: Movie[];
}
interface ArrowProps {
    onClick?: () => void;
    className?: string;
}

function NextArrow(props: ArrowProps) {
    const { onClick, className } = props;

    if (className?.includes("slick-disabled")) return null;

    return (
        <button
            onClick={onClick}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
            <ChevronRight className="w-6 h-6" />
        </button>
    );
}

function PrevArrow(props: ArrowProps) {
    const { onClick, className } = props;
    if (className?.includes("slick-disabled")) return null;

    return (
        <button
            onClick={onClick}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
            <ChevronLeft className="w-6 h-6" />
        </button>
    );
}

export function MovieSlider({ title, movies }: MovieSliderProps) {
    const settings = {
        dots: false,
        infinite: movies.length > 6,
        speed: 500,
        slidesToShow: 6,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    if (!movies || movies.length === 0) return null;



    return (
        <div className="py-8 px-4 md:px-8">
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-3">
                {title}
            </h2>

            <div className="relative">
                <Slider {...settings}>
                    {movies.map((movie) => (
                        <div key={movie.id} className="px-2 pb-4">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}