import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({ isLoading, filtredMovies }) {
  return (
    <section className={`movies ${isLoading ? "movies-loader" : ""}`}>
      {isLoading ? (
        <Preloader />
      ) : (
        filtredMovies?.map((movie) => (
          <MoviesCard
            key={movie.id}
            title={movie.nameRU}
            duration={movie.duration}
            preview={movie.image.url}
          />
        ))
      )}
    </section>
  );
}
