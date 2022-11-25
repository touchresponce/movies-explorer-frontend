import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  isLoading,
  filtredMovies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
}) {
  const { pathname } = useLocation();

  return (
    <section className={`movies ${isLoading ? "movies-loader" : ""}`}>
      {isLoading ? (
        <Preloader />
      ) : (
        filtredMovies?.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            id={movie.id || movie._id}
            movie={movie}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
          />
        ))
      )}
    </section>
  );
}
