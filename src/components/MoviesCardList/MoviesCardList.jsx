import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ filtredMovies }) {
  return (
    <section className='movies'>
      {filtredMovies?.map((movie) => (
        <MoviesCard
          key={movie.id}
          title={movie.nameRU}
          duration={movie.duration}
          preview={movie.image.url}
        />
      ))}
    </section>
  );
}
