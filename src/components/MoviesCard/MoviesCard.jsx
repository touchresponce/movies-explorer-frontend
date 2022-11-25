import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import formatTime from "../../utils/formatTime";

export default function MoviesCard({
  id,
  movie,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
}) {
  const { pathname } = useLocation();

  const isSave = savedMovies?.some(
    (state) => state.movieId === id || state.id === id
  );

  const movieToDelete = savedMovies?.find((el) => el.movieId === id);

  const imageUrl = movie.image.url
    ? `https://api.nomoreparties.co/${movie.image.url}`
    : movie.thumbnail;

  return (
    <article className='movie'>
      <h3 className='movie__title'>{movie.nameRU}</h3>
      <p className='movie__duration'>{formatTime(movie.duration)}</p>
      {pathname === "/movies" ? (
        <button
          className={`movie__button ${
            isSave ? "movie__button_type_save" : "movie__button_type_unsave"
          }`}
          type='button'
          onClick={() => {
            isSave
              ? handleDeleteMovie(movieToDelete._id, id)
              : handleSaveMovie(movie);
          }}
        />
      ) : (
        <button
          className='movie__button movie__button_type_delete'
          type='button'
          onClick={() => {
            handleDeleteMovie(movie._id, movie.movieId);
          }}
        />
      )}

      <a
        href={movie.trailer || movie.trailerLink}
        target='_blank'
        rel='noreferrer'
      >
        <img className='movie__image' src={imageUrl} alt='кадр из фильма' />
      </a>
    </article>
  );
}
