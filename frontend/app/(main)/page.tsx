
import { getMovieBySlug, getMoviesByCategorySlug } from "@/lib/api/main.api";
import HeroBanner from "./components/main.herobanner";
import { MovieSlider } from "./components/main.movieslider";
import HomeAdModal from "./components/home-ad-modal";



export default async function HomePage() {



    const [
        bannerRes,
        cartoonRes,
        animeRes,
        cinemaRes
    ] = await Promise.all([
        getMovieBySlug("tieu-yeu"),
        getMoviesByCategorySlug("hoat-hinh"),
        getMoviesByCategorySlug("anime"),
        getMoviesByCategorySlug("chieu-rap")
    ]);



    const MovieBanner = bannerRes.data ?? null;
    const cartoonMovie = cartoonRes.data?.result ?? [];
    const animeMovie = animeRes.data?.result ?? [];
    const cinemaMovie = cinemaRes.data?.result ?? [];
    // console.log(cartoonMovie);
    return (
        <>
            <HomeAdModal />
            <div className="min-h-screen bg-gray-900">

                {MovieBanner ? <HeroBanner MovieBanner={MovieBanner} /> : null}
                <MovieSlider title="Hoạt hình" movies={cartoonMovie} />
                <MovieSlider title="Anime" movies={animeMovie} />
                <MovieSlider title="Chiếu rạp" movies={cinemaMovie} />
            </div>
        </>

    );
}
