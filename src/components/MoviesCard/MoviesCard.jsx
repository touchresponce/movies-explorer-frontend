import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
  isSave,
  id,
  movie,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  const { pathname } = useLocation();

  // форматирование времени
  function setDuration(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours >= 1 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  const imageUrl = movie.image.url
    ? `https://api.nomoreparties.co/${movie.image.url}`
    : movie.thumbnail;

  return (
    <article className='movie'>
      <h3 className='movie__title'>{movie.nameRU}</h3>
      <p className='movie__duration'>{setDuration(movie.duration)}</p>
      {pathname === "/movies" ? (
        <button
          className={`movie__button ${
            isSave ? "movie__button_type_save" : "movie__button_type_unsave"
          }`}
          type='button'
          onClick={() => handleSaveMovie(movie)}
        />
      ) : (
        <button
          className='movie__button movie__button_type_delete'
          type='button'
          onClick={() => handleDeleteMovie(id)}
        />
      )}

      <a href={movie.trailer} target='_blank' rel='noreferrer'>
        <img className='movie__image' src={imageUrl} alt='кадр из фильма' />
      </a>
    </article>
  );
}
