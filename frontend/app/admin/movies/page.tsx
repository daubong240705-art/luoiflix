import { getAdminMovies } from "@/lib/api/admin.api";

import MoviesController from "./components/MoviesController";

export default async function Page() {

   const moviesRes = await getAdminMovies();
   const movies = moviesRes.data?.result ?? [];

   return <MoviesController movies={movies} />;

}
