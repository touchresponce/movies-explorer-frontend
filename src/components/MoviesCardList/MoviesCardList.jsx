import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({
  isLoading,
  filtredMovies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
}) {
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
